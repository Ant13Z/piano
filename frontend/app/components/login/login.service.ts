import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';
import { ResponseModel } from './response.model';

@Injectable()

export class LoginService {
    apiUrl = 'http://localhost:3000/api/user/auth/';

    constructor(private http: HttpClient) {}

    authUser(user: UserModel): Observable<ResponseModel> {
        return this.http.post<ResponseModel>(this.apiUrl, user);
    }
}

