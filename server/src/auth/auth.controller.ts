import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: CreateUserDto) {
    const { email, password, firstname, lastname, role, varified } = body;
    console.log('body', body);
    console.log('first');
    return this.authService.register(
      email,
      password,
      firstname,
      lastname,
      role,
      varified,
    );
  }

  @Post('/login')
  login() {
    return this.authService.login();
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
