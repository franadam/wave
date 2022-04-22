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
import { UserRole } from './entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { CheckPolicies } from './decorators/policies.decorator';
import { PoliciesGuard } from './guards/policies.gard';
import { AppAbility } from '../casl/casl-ability.factory';
import { Article } from '../article/entities/article.entity';
import { Action } from '../interfaces/role.action';
import { ArticleService } from '../article/article.service';

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
