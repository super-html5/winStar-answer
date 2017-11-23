import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CreateWechatUserInfo, GetUserActivityRanking, UpdateUserInfo, ActivityRanking, GetRewardInfo} from '../entity/answerActivity';
import {environment} from '../../environments/environment';
@Injectable()
export class AnswerActivityService {

  constructor(private http: Http) {

  }

  private headers = new Headers({'Content-Type': 'application/json'});
  private openidHeaders = new Headers({'Content-Type': 'application/json', 'openid': 'olQf5t6N3ZdQNf9bB5BZ3r__KDz4'});

  /**
   * 创建用户信息
   * @param openid
   * @param source
   * @returns {Promise<TResult|TResult2|CreateWechatUserInfo>}
   */
  createWechatUserInfo(openid: string, source: number): Promise<CreateWechatUserInfo> {
    const createUserInfoUrl = environment.createWechatUserInfo;
    return this.http
      .post(createUserInfoUrl, JSON.stringify({'openid': openid, 'source': source}), {headers: this.headers})
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
   * 排行榜信息
   * @returns {Promise<TResult|TResult2|ActivityRanking>}
   */
  getActivityRanking(source: number): Promise<ActivityRanking> {
    const activityRankingUrl = `${environment.getActivityRanking}?source=source`;
    return this.http.get(activityRankingUrl, {headers: this.openidHeaders})
      .toPromise()
      .then(res => res.json() as ActivityRanking)
      .catch();
  }

  /**
   * 用户排行
   * @returns {Promise<TResult|TResult2|GetUserActivityRanking>}
   */
  getUserActivityRanking(): Promise<GetUserActivityRanking> {
    const getUserRankingUrl = environment.getUserActivityRanking;
    return this.http.get(getUserRankingUrl, {headers: this.openidHeaders})
      .toPromise()
      .then(res => res.json() as GetUserActivityRanking)
      .catch();
  }

  /**
   * 获取奖品信息
   * @returns {Promise<TResult|TResult2|GetRewardInfo>}
   */
  getRewardInfo(): Promise<GetRewardInfo> {
    const getRewardInfoUrl = environment.getRewardInfo;
    return this.http.get(getRewardInfoUrl, {headers: this.openidHeaders})
      .toPromise()
      .then(res => res.json() as GetRewardInfo)
      .catch();

  }

  /**
   * 领取奖品
   * @param mobile
   * @returns {Promise<TResult|TResult2|TResult1>}
   */
  receive(mobile: string): Promise<any> {
    const receiveUrl = `${environment.receive}?mobile=mobile`;
    return this.http.post(receiveUrl, {headers: this.openidHeaders})
      .toPromise()
      .then(res => res.json())
      .catch();

  }

  /**
   * 获取活动状态
   * @param result
   * @returns {Promise<TResult|TResult2|TResult1>}
   */
  activityInfo(result: string): Promise<any> {
    const activityInfoUrl = `${environment.info}?result=result`;
    return this.http.get(activityInfoUrl, {headers: this.openidHeaders})
      .toPromise()
      .then(res => res.json())
      .catch();

  }
}
