import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register() {
    return this.authService.register();
  }

  @Post()
  login() {
    return this.authService.login();
  }

  @Post()
  logout() {
    return this.authService.logout();
  }

  @Get()
  isAuth() {
    return this.authService.isAuth();
  }
}
