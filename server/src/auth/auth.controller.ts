import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { LocalAuthGuard } from './Guards/local.guard';

declare global {
  interface Request extends Express.Request {
    user?: User;
  }
}

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password, firstname, lastname, roles, varified } = body;
    console.log('body', body);
    const user = await this.authService.register(
      email,
      password,
      firstname,
      lastname,
      roles,
      varified,
    );
    session.userID = user.id;
    const token = await this.authService.generateAuthToken(user.id);
    session['x-access-token'] = token;
    console.log('register session', session);
    user.token = token;
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: Request) {
    console.log('login', req.headers);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: Request) {
    console.log('profile', Object.keys(req));
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Request() req: Request) {
    const user = req.user;
    req.user = undefined;
    console.log('logout user', user);
    return this.authService.logout(user);
  }
}
