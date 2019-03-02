import { Injectable } from '@angular/core';

@Injectable()

export class AppStore {
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

    removeAuth() {
        this.isAuth = false;
        localStorage.removeItem('token');
    }
}
