import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SearchService } from '../search.service';
import { ResponseAnswersModel } from '../response.answers.model';

@Component({
    selector: 'app-answers-component',
    templateUrl: './answers.component.html',
    providers: [SearchService]
})

export class SearchAnswersComponent {

    questionsID: number;
    list: ResponseAnswersModel;

    constructor (private activateRoute: ActivatedRoute, private searchService: SearchService) {
        this.questionsID = activateRoute.snapshot.params['id'];
        this.searchService.stackOverflowSearchAnswers(this.questionsID).subscribe(
            (data) => {
                this.list = data;
            }
        );
    }

}
