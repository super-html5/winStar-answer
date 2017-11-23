import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';

@Injectable()
export class AnswerListService {

  constructor(private http: Http) {

  }

  private headers = new Headers({'Content-Type': 'application/json'});


}
