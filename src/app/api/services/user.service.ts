import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../models/request/user-request';
import { UserResponse } from '../models/response/user-response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl + '/api/users';

    constructor(
        private http: HttpClient
    ) { }

    create(body: UserRequest) {
        return this.http.post<any>(`${this.apiUrl}`, body);
    }

    update(id: string, body: UserRequest) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, body);
    }

    getAll(params): Observable<UserResponse[]> {
        return this.http.get<any>(`${this.apiUrl}`, { params });
    }

    getByType(motoboy: string): Observable<UserResponse[]> {
        return this.http.get<any>(`${this.apiUrl}/getByType/${motoboy}`);
    }

    getById(id: string): Observable<UserResponse> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    delete(id: string) {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

}
