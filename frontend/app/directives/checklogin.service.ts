import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()

export class CheckLoginService {
    apiUrl = '/api/user/';
    constructor(private http: HttpClient) {}

    checkUser(userLogin: string): Observable<string> {
        return this.http.get<string>(this.apiUrl + '?login=' + userLogin);
    }

}
