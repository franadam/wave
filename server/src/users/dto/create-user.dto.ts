import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../roles/users.roles';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(UserRole)
  roles: UserRole;

  @IsBoolean()
  varified: boolean;
}
