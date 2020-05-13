import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/request/auth-request';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl + '/auth';
    userIsLogged: boolean;

    constructor(
        private http: HttpClient
    ) { }

    checkAuth() {
        return (this.userIsLogged === true || localStorage.getItem('token') !== null);
    }

    login(body: AuthRequest) {
        return this.http.post<any>(`${this.apiUrl}/token`, body)
            .pipe(map(res => {
                if (res.token) {
                    this.userIsLogged = true;
                    localStorage.setItem('token', res.token);
                    location.href = '/';
                } else {
                    this.userIsLogged = false;
                }
                return res;
            }));
    }

    logout() {
        localStorage.removeItem('token');
        location.href = '/login';
    }
}
