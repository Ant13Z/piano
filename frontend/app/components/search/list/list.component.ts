import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { ResponseQuestionsModel } from '../response.questions.model';

@Component({
    selector: 'app-search-list-component',
    templateUrl: './list.component.html',
    providers: [SearchService]
})

export class SearchListComponent {
    list: ResponseQuestionsModel;
    dataFastView: ResponseQuestionsModel | boolean = false;

    constructor (public searchService: SearchService, private router: Router) {
        this.list = JSON.parse(localStorage.getItem('search'));
    }

    // можно сделать одним методом
    getAuthorQuestion (userID: number) {
        this.dataFastView = false;
        this.searchService.stackOverflowSearchQuestions({user: userID}).subscribe(
            (data) => {
                this.dataFastView = data;
            }
        );
    }

    getTagQuestion (tag: string) {
        this.dataFastView = false;
        this.searchService.stackOverflowSearchQuestions({tagged: tag}).subscribe(
            (data) => {
                this.dataFastView = data;
            }
        );
    }
}
