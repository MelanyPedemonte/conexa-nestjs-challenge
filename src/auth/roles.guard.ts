import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('No tienes acceso a este endpoint');

    const hasRole = requiredRoles.some((role) => {
      if (role === 'admin') {
        return user.isAdmin;
      } else if (role === 'user') {
        return !user.isAdmin;
      }
      return false;
    });

    if (!hasRole) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este endpoint',
      );
    }

    return true;
  }
}
