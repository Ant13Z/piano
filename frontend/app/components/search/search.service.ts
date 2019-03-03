import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseQuestionsModel } from './response.questions.model';
import { ResponseAnswersModel } from './response.answers.model';

@Injectable()

export class SearchService {
    apiUrl = 'http://api.stackexchange.com/2.2';
    constructor(private http: HttpClient) {}

    // http://api.stackexchange.com/docs/advanced-search
    // на самом деле здесь тонна варинтов куда временно сложить полученные данные, сделаем самый простой
    // самым верным вариантом, было бы вообще не делать сейчас запрос
    stackOverflowSearchQuestions(queryParam: {}): Observable<ResponseQuestionsModel> {
        let urlMethod = '/search/advanced?order=desc&sort=activity&site=stackoverflow';
        for (const key in queryParam)
            urlMethod += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(queryParam[key]);
        return this.http.get<ResponseQuestionsModel>(this.apiUrl + urlMethod);
    }

    stackOverflowSearchAnswers(id: number): Observable<ResponseAnswersModel> {
        const urlMethod = `/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow`;
        return this.http.get<ResponseAnswersModel>(this.apiUrl + urlMethod);
    }

}
