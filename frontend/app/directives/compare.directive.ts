import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[appCompare]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CompareDirective,
        multi: true
    }]
})

export class CompareDirective implements Validator {

    @Input('appCompare') controlNameToCompare: string;

    validate(control: AbstractControl): ValidationErrors | null {
        // берем элемент с которым сравниваем
        const controlToCompare = control.root.get(this.controlNameToCompare);
        // если элемент отсутствует, значит и сравнивать не с чем
        if (!controlToCompare) {
            return {'compare': true};
        }
        // подписываемся 1 раз при инициализации
        if (
            !control.value.length
            && !controlToCompare.value.length
            && !controlToCompare.touched
            && !control.touched
        ) {
            controlToCompare.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
            });
        }
        // если значения пустые то не проверяем
        if (!control.value.length) {
            return null;
        }
        return controlToCompare.value === control.value ? null : {'compare': true};
    }
}
