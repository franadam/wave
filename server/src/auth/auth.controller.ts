import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

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
    const token = await this.authService.generateAuthToken(session);
    session['x-access-token'] = token;
    console.log('register session', session);
    return user;
  }

  @Post('/login')
  async login(
    @Body() body: { email: string; password: string },
    @Session() session: any,
  ) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);
    session.userID = user.id;
    const token = await this.authService.generateAuthToken(session);
    session['x-access-token'] = token;
    console.log('login session', session);
    return user;
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Get('/isAuth')
  isAuth() {
    return this.authService.isAuth();
  }
}
