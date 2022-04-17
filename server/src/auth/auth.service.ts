import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return 'hello';
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
