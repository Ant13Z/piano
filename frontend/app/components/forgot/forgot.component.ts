import { Component } from '@angular/core';
import { ForgotService } from './forgot.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-forgot-component',
    templateUrl: './forgot.component.html',
    providers: [ForgotService, AuthService]
})

export class ForgotComponent {
    forgotForm: FormGroup;
    forgotPass: string|boolean = false;

    constructor (private forgotService: ForgotService, private router: Router, private auth: AuthService) {
        if (auth.getIsAuth()) this.router.navigate(['/']);
        this.forgotForm = new FormGroup({
            'forgotLogin': new FormControl('', [
                Validators.required,
                Validators.pattern('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'),
                Validators.maxLength(255)
            ])
        });
    }

    forgotUser () {
        this.forgotForm.disable();
        this.forgotService.forgotUser(this.forgotForm.get('forgotLogin').value).subscribe(data => {
            this.forgotPass = !data.error.length ? data.newPass : false;
            this.forgotForm.enable();
        });
    }
}
