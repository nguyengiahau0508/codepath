
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../services/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { ICurrentUser } from '../interfaces/current-user.interface';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
        });
    }

    async validate(payload: JwtPayload): Promise<ICurrentUser> {
        const user = await this.usersService.findOne(+payload.sub);
        const roles = await this.usersService.findAllRolesByUser(+payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            id: user.id,
            email: user.email!,
            roles: roles.map(role => role.code) as RoleEnum[] || [],
        };
    }

}
