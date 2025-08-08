import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from "@codepath/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: config.googleAuth.clientId,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: `http://localhost:8080/api/auth/google/callback`,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos, id, _json } = profile;

    const user = {
      provider: "google",
      providerId: id,
      email: emails[0]?.value,
      fullName: `${name.familyName} ${name.givenName}`.trim(),
      picture: _json.picture || photos[0]?.value,
    };

    done(null, user);
  }
}

