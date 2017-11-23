import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {QuestionInfo} from '../entity/answerActivity'
import {environment} from '../../environments/environment';

@Injectable()
export class AnswerListService {

  constructor(private http: Http) {

  }

  private headers = new Headers({'Content-Type': 'application/json', 'openid': 'olQf5t6N3ZdQNf9bB5BZ3r__KDz4'});

  getQuestionList(): Promise<QuestionInfo[]> {
    const getQuestionListUrl = `http://127.0.0.1:8080/ls/api/v1/activity/noauth/answer/questions`;
    return this.http.get(getQuestionListUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as QuestionInfo[])
      .catch()
  }

}
