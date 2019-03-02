import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppStore } from '../store/app.store';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AppGuard implements CanActivate {

    constructor(private store: AppStore, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.store.getIsAuth()) {
            return of(true);
        } else {
            this.router.navigate(['/']);
            return of(false);
        }
    }

}
