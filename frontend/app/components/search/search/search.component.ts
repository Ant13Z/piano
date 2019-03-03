import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
    selector: 'app-search-component',
    templateUrl: './search.component.html',
    providers: [SearchService]
})

export class SearchComponent {
    searchForm: FormGroup;
    notFound = false;

    constructor (
        private searchService: SearchService,
        private router: Router
    ) {
        this.searchForm = new FormGroup({
            'searchText': new FormControl('', [
                Validators.required,
            ])
        });
    }

    search() {
        this.searchForm.disable();
        this.notFound = false;
        const query = this.searchForm.get('searchText').value;
        this.searchService.stackOverflowSearchQuestions({q: query}).subscribe(
            (data) => {
                this.searchForm.enable();
                localStorage.setItem('search', JSON.stringify(data));
                if (data.items.length > 0) {
                    this.notFound = false;
                    this.router.navigate(['/search/list']);
                } else this.notFound = true;
            }
        );
    }

}
