import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { LocalAuthGuard } from './Guards/local.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password, firstname, lastname, role, varified } = body;
    console.log('body', body);
    const user = await this.authService.register(
      email,
      password,
      firstname,
      lastname,
      role,
      varified,
    );
    session.userID = user.id;
    const token = await this.authService.generateAuthToken(user.id);
    session['x-access-token'] = token;
    console.log('register session', session);
    user.token = token;
    return user;
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('/login')
  // async login(
  //   @Body() body: { email: string; password: string },
  //   @Session() session: any,
  //   @Request() req: any,
  // ) {
  //   const { email, password } = body;
  //   const user = await this.authService.login(email, password);
  //   session.userID = user.id;
  //   const token = await this.authService.generateAuthToken(user.id);
  //   user.token = token;
  //   console.log('req.headers', req.headers);
  //   session['x-access-token'] = token;
  //   console.log('login session', session);
  //   return user;
  // }

  @Get('/logout')
  logout(@Session() session: any) {
    this.authService.logout(session);
  }

  @Get('/isauth')
  async isAuth(@CurrentUser() user: User) {
    const login = await this.authService.isAuth(user);
    return login ? login : 'Please login';
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginG(@Request() req) {
    console.log('loginG', req.headers);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log('profile', req.headers);
    return req.user || Object.keys(req);
  }
}
