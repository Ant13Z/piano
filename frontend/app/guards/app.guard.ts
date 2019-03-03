import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../components/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AppGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.auth.getIsAuth()) {
            return of(true);
        } else {
            this.router.navigate(['/']);
            return of(false);
        }
    }

}
