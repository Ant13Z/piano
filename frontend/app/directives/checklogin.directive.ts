import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { CheckLoginService } from './checklogin.service';

@Directive({
    selector: '[appCheckLogin]',
    providers: [
        CheckLoginService,
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: CheckLoginDirective,
            multi: true
        }
    ]
})

export class CheckLoginDirective implements Validator {

    constructor (private checkLoginService: CheckLoginService) {}

    @Input('appCheckLoginType') type: string;

    validate(control: AbstractControl):  Promise<ValidationErrors | null> {
        return new Promise(resolve => {
            this.checkLoginService.checkUser(control.value).subscribe((data) => {
                if (this.type === 'uniq') resolve(data ? {'checkLogin': true} : null);
                if (this.type === 'isset') resolve(data ? null : {'checkLogin': true});
            });
        });
    }
}
