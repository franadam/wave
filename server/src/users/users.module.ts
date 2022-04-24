import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { CaslModule } from '../casl/casl.module';
import { ArticleModule } from '../article/article.module';
import { roles } from '../roles/users.roles';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CaslModule,
    ArticleModule,
    AccessControlModule.forRoles(roles),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
