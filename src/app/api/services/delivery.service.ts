import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRequest } from '../models/request/user-request';
import { UserResponse } from '../models/response/user-response';
import { DeliveryRequest } from '../models/request/delivery-request';
import { DeliveryResponse } from '../models/response/delivery-response';

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    private apiUrl = environment.apiUrl + '/api/deliveries';

    constructor(
        private http: HttpClient
    ) { }

    create(body: DeliveryRequest) {
        return this.http.post<any>(`${this.apiUrl}`, body);
    }

    update(id: string, body: DeliveryRequest) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, body);
    }

    completeDelivery(id: string, body: any) {
        return this.http.put<any>(`${this.apiUrl}/completeDelivery/${id}`, body);
    }

    getByDate(params: any): Observable<DeliveryResponse[]> {
        return this.http.get<any>(`${this.apiUrl}/getByDate`, { params: params });
    }

    getByOrder(orderCode: string): Observable<DeliveryResponse> {
        return this.http.get<any>(`${this.apiUrl}/getByOrder/${orderCode}`);
    }

    getById(id: string): Observable<DeliveryResponse> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
}
