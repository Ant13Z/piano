import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from './response.model';

@Injectable()

export class ForgotService {
    apiUrl = '/api/user/';

    constructor(private http: HttpClient) {}

    forgotUser(login: string): Observable<ResponseModel> {
        return this.http.put<ResponseModel>(this.apiUrl, {login: login});
    }

}
