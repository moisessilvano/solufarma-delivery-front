import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../models/request/user-request';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {
    private apiUrl = environment.apiUrl + '/api/process';

    constructor(
        private http: HttpClient
    ) { }

    importFile(file: any) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<any>(`${this.apiUrl}/importFile`, formData);
    }

}
