import { Component, Input } from '@angular/core';
import { ResponseSearchModel } from '../responsesearch.model';

@Component({
    selector: 'app-fast-view-component',
    templateUrl: './fast-view.component.html'
})

export class FastViewComponent {

    @Input('data') data: ResponseSearchModel;

    constructor () {}

}
