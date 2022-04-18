import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, genSalt, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserRole } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: UserRole,
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

  async generateAuthToken(session: any) {
    console.log('generateAuthToken >> session.userID', session.userID);
    const user = await this.userService.findOne(session.userID);
    const userObj = { sub: user.id.toString() };
    const token = sign(userObj, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: '1D',
    });
    return token;
  }
}
