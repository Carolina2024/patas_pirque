import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { OWNER_OR_ADMIN_KEY } from 'src/common/decorators/owner-or-admin.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { Users } from 'src/modules/User/user.entity';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isOwnerOrAdmin = this.reflector.get<boolean>(
      OWNER_OR_ADMIN_KEY,
      context.getHandler(),
    );
    if (!isOwnerOrAdmin) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as Users;

    const idParam = request.params.id;

    return user?.role === Role.ADMIN || user.id == idParam;
  }
}
