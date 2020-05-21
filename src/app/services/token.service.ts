import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  decokeToken() {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
