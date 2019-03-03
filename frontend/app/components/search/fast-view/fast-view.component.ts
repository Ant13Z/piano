import { Component, Input } from '@angular/core';
import { ResponseQuestionsModel } from '../response.questions.model';

@Component({
    selector: 'app-fast-view-component',
    templateUrl: './fast-view.component.html'
})

export class FastViewComponent {

    @Input('data') list: ResponseQuestionsModel;

    constructor () {}

}
