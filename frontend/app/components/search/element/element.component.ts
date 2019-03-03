import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SearchService } from '../search.service';
import { ResponseSearchModel } from '../responsesearch.model';

@Component({
    selector: 'app-element-component',
    templateUrl: './element.component.html',
    providers: [SearchService]
})

export class SearchElementComponent {

    elementID: number;
    list: ResponseSearchModel;

    constructor (private activateRoute: ActivatedRoute, private searchService: SearchService) {
        this.elementID = activateRoute.snapshot.params['id'];
        this.searchService.stackOverflowSearchAnswers(this.elementID).subscribe(
            (data) => {
                this.list = data;
            }
        );
    }

}
