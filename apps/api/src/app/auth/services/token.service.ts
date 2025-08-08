import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import * as crypto from 'crypto';
import { config } from '@codepath/config';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  private readonly prefixToken = 'token:';     // token:{userId}:{tokenId}
  private readonly prefixUserSet = 'user_tokens:'; // user_tokens:{userId} -> set of keys
  private readonly prefixBlacklist = 'blacklist:'; // blacklist:{jti}

  private readonly ENC_KEY: Buffer;
  private readonly IV_BYTES = 12;
  private readonly TAG_BYTES = 16;

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {
    const keyBase64 = config.jwt.tokenEncKey
    if (!keyBase64) throw new Error('TOKEN_ENC_KEY env required (base64 32 bytes)');
    const buf = Buffer.from(keyBase64, 'base64');
    if (buf.length !== 32) throw new Error('TOKEN_ENC_KEY must decode to 32 bytes (base64)');
    this.ENC_KEY = buf;
  }

  private encrypt(plain: string): string {
    const iv = crypto.randomBytes(this.IV_BYTES);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.ENC_KEY, iv);
    const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, ciphertext]).toString('base64');
  }

  private decrypt(b64: string): string {
    const raw = Buffer.from(b64, 'base64');
    const iv = raw.slice(0, this.IV_BYTES);
    const tag = raw.slice(this.IV_BYTES, this.IV_BYTES + this.TAG_BYTES);
    const ciphertext = raw.slice(this.IV_BYTES + this.TAG_BYTES);
    const decipher = crypto.createDecipheriv('aes-256-gcm', this.ENC_KEY, iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return dec.toString('utf8');
  }

  private safeEqual(a: Buffer, b: Buffer): boolean {
    try {
      if (a.length !== b.length) return false;
      return crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }

  private tokenKey(userId: string | number, tokenId: string) {
    return `${this.prefixToken}${userId}:${tokenId}`;
  }
  private userSetKey(userId: string | number) {
    return `${this.prefixUserSet}${userId}`;
  }
  private blacklistKey(jti: string) {
    return `${this.prefixBlacklist}${jti}`;
  }

  // Store encrypted token + add key to user's set
  async storeTokenForUser(userId: string | number, tokenId: string, token: string, ttlSec: number): Promise<void> {
    const key = this.tokenKey(userId, tokenId);
    const enc = this.encrypt(token);
    const pipeline = this.redis.pipeline();
    pipeline.set(key, enc, 'EX', ttlSec);
    pipeline.sadd(this.userSetKey(userId), key);
    pipeline.expire(this.userSetKey(userId), Math.max(60, ttlSec));
    await pipeline.exec();
  }

  // Validate token by decrypting stored value and timing-safe comparing
  async validateTokenById(userId: string | number, tokenId: string, tokenToCheck: string): Promise<boolean> {
    const key = this.tokenKey(userId, tokenId);
    const stored = await this.redis.get(key);
    if (!stored) return false;
    let plain: string;
    try {
      plain = this.decrypt(stored);
    } catch (e) {
      this.logger.warn(`Failed decrypt token for ${key}`);
      return false;
    }
    return this.safeEqual(Buffer.from(plain, 'utf8'), Buffer.from(tokenToCheck, 'utf8'));
  }

  async revokeTokenById(userId: string | number, tokenId: string): Promise<void> {
    const key = this.tokenKey(userId, tokenId);
    const pipeline = this.redis.pipeline();
    pipeline.del(key);
    pipeline.srem(this.userSetKey(userId), key);
    await pipeline.exec();
  }

  async rotateRefreshToken(userId: string | number, oldTokenId: string | null, newTokenId: string, newToken: string, ttlSec: number): Promise<void> {
    const pipeline = this.redis.pipeline();
    if (oldTokenId) {
      const oldKey = this.tokenKey(userId, oldTokenId);
      pipeline.del(oldKey);
      pipeline.srem(this.userSetKey(userId), oldKey);
    }
    const newKey = this.tokenKey(userId, newTokenId);
    pipeline.set(newKey, this.encrypt(newToken), 'EX', ttlSec);
    pipeline.sadd(this.userSetKey(userId), newKey);
    pipeline.expire(this.userSetKey(userId), Math.max(60, ttlSec));
    await pipeline.exec();
  }

  async revokeAllTokensForUser(userId: string | number): Promise<void> {
    const setKey = this.userSetKey(userId);
    const members = await this.redis.smembers(setKey);
    if (!members || members.length === 0) {
      await this.redis.del(setKey);
      return;
    }
    const pipeline = this.redis.pipeline();
    for (const k of members) pipeline.del(k);
    pipeline.del(setKey);
    await pipeline.exec();
  }

  async listActiveTokenIds(userId: string | number): Promise<string[]> {
    const setKey = this.userSetKey(userId);
    const members = await this.redis.smembers(setKey);
    return members.map(m => m.split(':').slice(2).join(':'));
  }

  async blacklistJti(jti: string, ttlSec: number): Promise<void> {
    const key = this.blacklistKey(jti);
    await this.redis.set(key, '1', 'EX', ttlSec);
  }

  async isJtiBlacklisted(jti: string): Promise<boolean> {
    const exists = await this.redis.exists(this.blacklistKey(jti));
    return exists === 1;
  }

  async blacklistFromPayload(payload: { jti?: string; exp?: number }) {
    if (!payload?.jti || !payload?.exp) return;
    const ttl = Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
    if (ttl > 0) await this.blacklistJti(payload.jti, ttl);
  }

  async tokenExists(userId: string | number, tokenId: string): Promise<boolean> {
    const key = this.tokenKey(userId, tokenId);
    return (await this.redis.exists(key)) === 1;
  }
}

