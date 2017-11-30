import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {QuestionInfo} from '../entity/answerActivity'
import {environment} from '../../environments/environment';

@Injectable()
export class AnswerListService {

  constructor(private http: Http) {

  }

  private headers = new Headers({'Content-Type': 'application/json', 'openid': localStorage.getItem('openid')});

  getQuestionList(): Promise<QuestionInfo[]> {
    const getQuestionListUrl = `${environment.answerList}`;
    return this.http.get(getQuestionListUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as QuestionInfo[])
      .catch()
  }

  saveUserRecord(startTime: string, endTime: string, highestScore: string): Promise<any> {
    const saveUserRecordUrl = `${environment.questionRecord}`;
    return this.http.post(saveUserRecordUrl, {
      'startTime': startTime,
      'endTime': endTime,
      'highestScore': highestScore
    }, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch()
  }


  saveAnswerQuestionLog(questionLog: any, highestScore: string): Promise<any> {
    const saveAnswerQuestionLogUrl = `${environment.questionLog}`;
    return this.http.post(saveAnswerQuestionLogUrl, {
      'answerDetails': JSON.stringify(questionLog),
      'highestScore': highestScore
    }, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as any)
      .catch()
  }

  getShare(): Promise<any> {
    const url = location.href.split('#')[0];
    const getShareUrl = `${environment.getShare}?url=${url}`;
    return this.http.get(getShareUrl)
      .toPromise()
      .then(res => res.json() as any)
      .catch();
  }
}
