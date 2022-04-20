import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcrypt';
import { User, UserRole } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    role: UserRole,
    varified: boolean,
  ) {
    const usedEmail = await this.usersService.findOneByEmail(email);

    // if (usedEmail) {
    //   throw new BadRequestException('email in used');
    // }

    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      role,
      varified,
    });
    return user;
  }

  async login(user: any) {
    console.log('authservice login >> ', user);
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async loginJWT(email: string, password: string) {
    const user = await this.usersService.findOneByOptions({
      email,
      firstname: 'bob',
    });
    if (!user) throw new NotFoundException('user not found');
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('wrong credentials');
    return user;
  }

  logout(session: any) {
    session.userID = null;
    return 'logout';
  }

  isAuth(user: User) {
    return !!user;
  }

  async generateAuthToken(userID: number) {
    const user = await this.usersService.findOneById(userID);
    const payload = { sub: user.id.toString() };
    const token = this.jwtService.sign(payload, {
      secret: 'secret',
    });
    return token;
  }

  // async validate(email: string, password: string): Promise<any> {
  //   console.log('auth service >> validate');
  //   const user = await this.login(email, password);
  //   console.log('auth service validate >> user', user);
  //   if (!user) return null;
  //   return user;
  // }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('auth service validateUser >> user', user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
