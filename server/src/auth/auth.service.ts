import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: string,
    varified: boolean,
  ) {
    const usedEmail = await this.userService.findOneByEmail(email);

    // if (usedEmail) {
    //   throw new BadRequestException('email in used');
    // }

    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);

    const user = await this.userService.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
      varified,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException('user not found');
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('wrong credentials');
    return user;
  }

  logout() {
    return 'logout';
  }

  isAuth() {
    return 'isAuth';
  }
}
