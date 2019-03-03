import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-menu-component',
    templateUrl: './menu.component.html',
    providers: [AuthService]
})

export class MenuComponent {
    isAuth: boolean;

    constructor (private router: Router, private auth: AuthService) {
        router.events.subscribe(
            e => {
                if (e instanceof NavigationStart) {
                    auth.initAuth();
                    this.isAuth = auth.getIsAuth();
                }
            }
        );
    }

    logoff () {
        this.isAuth = false;
        this.auth.removeAuth();
    }
}
