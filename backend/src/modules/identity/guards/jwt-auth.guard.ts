import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // verify JWT
    const canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      return false;
    }

    // get roles required
    const rolesRequired = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesRequired || rolesRequired.length === 0) {
      return true;
    }

    // get user roles
    const request = context.switchToHttp().getRequest();
    const user = request.user as { roles?: RoleEnum[] };

    if (!user || !Array.isArray(user.roles)) {
      throw new ForbiddenException('User has no roles');
    }

    const hasRole = rolesRequired.some(role =>
      user.roles!.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
