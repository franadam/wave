import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { CheckPolicies } from './decorators/policies.decorator';
import { PoliciesGuard } from './guards/policies.guard';
import { AppAbility } from '../casl/casl-ability.factory';
import { Article } from '../article/entities/article.entity';
import { Action } from '../interfaces/role.action';
import { ArticleService } from '../article/article.service';
import { UserRole } from '../roles/users.roles';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';

@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly articleService: ArticleService,
  ) {}

  @Get('/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  testy(@Request() req: Request) {
    return 'admin';
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Article))
  findAllArt(@Request() req: Request) {
    console.log('findAllArt>> req', req.headers);
    return this.articleService.findAll();
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'profile',
    action: 'create',
    possession: 'any',
  })
  @Get('/profile')
  findAllAC(@Request() req: Request, @UserRoles() userRoles: UserRole) {
    console.log('findAllAC>> req', req.headers);
    console.log('userRoles', userRoles);
    return this.articleService.findAll();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
