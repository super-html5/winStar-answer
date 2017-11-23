import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CreateWechatUserInfo, GetUserActivityRanking, UpdateUserInfo, ActivityRanking, GetRewardInfo} from './../entity/answerActivity';
import {environment} from './../../environments/environment'
@Injectable()
export class AnswerActivityService {

  constructor(private http: Http) {

  }

  private headers = new Headers({'Content-Type': 'application/json'});

  /**
   * 创建用户信息
   * @param openid
   * @param source
   * @returns {Promise<TResult|TResult2|CreateWechatUserInfo>}
   */
  createWechatUserInfo(openid: string, source: number): Promise<CreateWechatUserInfo> {
    const createUserInfoUrl = environment.createWechatUserInfo;
    return this.http
      .post(createUserInfoUrl, {'openid': openid, 'source': source}, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as CreateWechatUserInfo)
      .catch();
  }

  /**
   * 实物奖品领取补全用户信息
   * @param address
   * @param mobile
   * @param name
   * @param reqParam
   * @param source
   * @returns {Promise<TResult|TResult2|UpdateUserInfo>}
   */
  updateUserInfo(address: string, mobile: string, name: string, reqParam: number, source: number): Promise<UpdateUserInfo> {
    const updateUserInfoUrl = environment.updateUserInfo;
    return this.http.post(updateUserInfoUrl,
      {'address': address, 'mobile': mobile, 'name': name, 'reqParam': reqParam, 'source': source},
      {headers: this.headers}
    )
      .toPromise()
      .then(res => res.json() as UpdateUserInfo)
      .catch();
  }

  /**
   * 用户排行
   * @returns {Promise<TResult|TResult2|GetUserActivityRanking>}
   */
  getUserActivityRanking(): Promise<GetUserActivityRanking> {
    const getUserRankingUrl = environment.getUserActivityRanking;
    return this.http.get(getUserRankingUrl)
      .toPromise()
      .then(res => res.json() as GetUserActivityRanking)
      .catch();
  }

  /**
   * 异常
   * @param error 异常
   */
  private _error(error: any): Promise<any> {
    console.log('this error :', error);
    return Promise.reject(error.message || error);
  }

}
