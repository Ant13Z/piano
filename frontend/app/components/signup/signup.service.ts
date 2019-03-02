import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './user.model';
import { ResponseModel } from './response.model';

@Injectable()

export class SignupService {
    apiUrl = 'http://localhost:3000/api/user/';
    constructor(private http: HttpClient) {}

    createUser(user: UserModel): Observable<{resp: ResponseModel}> {
        return this.http.post<{resp: ResponseModel}>(this.apiUrl, user).pipe(tap(
            ({resp}) => {
                if (resp) {
                    return resp;
                } else {
                    // options запрос
                }
            }
        ));
    }

}
