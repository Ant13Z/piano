import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private isAuth: boolean;

    constructor() {
        this.initAuth();
    }

    getIsAuth(): boolean {
        return this.isAuth;
    }

    initAuth() {
        const isAuth = localStorage.getItem('token');
        this.isAuth = isAuth !== null;
    }

    setAuth(token: string) {
        localStorage.setItem('token', token);
        this.initAuth();
    }

    removeAuth() {
        this.isAuth = false;
        localStorage.removeItem('token');
    }
}
