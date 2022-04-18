import { BadRequestException, Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
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

  login() {
    return 'login';
  }

  logout() {
    return 'logout';
  }

  isAuth() {
    return 'isAuth';
  }
}
