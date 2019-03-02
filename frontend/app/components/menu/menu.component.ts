import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppStore } from '../../store/app.store';


@Component({
    selector: 'app-menu-component',
    templateUrl: './menu.component.html'
})

export class MenuComponent {
    isAuth: boolean;

    constructor (private store: AppStore, private router: Router) {
        router.events.subscribe(
            e => {
                if (e instanceof NavigationStart) {
                    this.isAuth = store.getIsAuth();
                }
            }
        );
    }

    logoff () {
        this.isAuth = false;
        this.store.removeAuth();
    }
}
