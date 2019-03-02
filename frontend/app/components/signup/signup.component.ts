import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { UserModel } from './user.model';
import { AppStore } from '../../store/app.store';

@Component({
    selector: 'app-signup-component',
    templateUrl: './signup.component.html',
    providers: [SignupService]
})

export class SignupComponent {
    signupForm: FormGroup;
    constructor (private signupService: SignupService, private router: Router, private store: AppStore) {
        if (store.getIsAuth()) this.router.navigate(['/']);
        this.signupForm = new FormGroup({
            'regLogin': new FormControl('', [
                Validators.required,
                // Validators.email считает "1@1" валидным емейлом
                Validators.pattern('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'),
                Validators.maxLength(255)
            ]),
            'regPass': new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
            ]),
            'regPassRepeat': new FormControl('', [
                Validators.required
            ])
        });
    }

    addUser () {
        this.signupForm.disable();
        // потенциально сравнивать пароли можно на фронте и отдавать только login и pass
        const user = <UserModel>{
            login: this.signupForm.get('regLogin').value,
            pass: this.signupForm.get('regPass').value,
            passConfirm: this.signupForm.get('regPassRepeat').value,
        };
        this.signupService.createUser(user).subscribe(data => {
            this.signupForm.enable();
            this.router.navigate(['/login']);
        });
    }
}
