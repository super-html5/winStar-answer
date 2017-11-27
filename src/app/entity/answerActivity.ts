/**
 * 创建用户信息
 */
export class CreateWechatUserInfo {
  accountId: string;
  activityId: string;
  address: string;
  createTime: number;
  id: string;
  mobile: string;
  name: string;
  openid: string;
  source: number;
  updateTime: number;
}

/**
 * 获取用户排名
 */
export class GetUserActivityRanking {
  result: string;
}

/**
 * 实物奖品领取补全用户信息
 */
export class UpdateUserInfo {
  accountId: string;
  activityId: string;
  address: string;
  createTime: number;
  id: string;
  mobile: string;
  name: string;
  openid: string;
  resParam: number;
  source: number;
  updateTime: number;
}

/**
 * 排行榜信息
 */
export class ActivityRanking {
  activityId: string;
  createTime: number;
  endTime: number;
  highestScore: number;
  id: string;
  isReceived: number;
  seconds: number;
  source: number;
  startTime: number;
  updateTime: number;
  userId: string;
}

/**
 * 获取奖品信息
 */
export class GetRewardInfo {
  isReceived: number; // 领取状态
  ranking: number; // 排行
  reward: string;
}

export class GetWechatUserInfo {
  id: string;
  accountId: string;
  activityId: string;
  openid: string;
  source: number;
  nickName: string;
  name: string;
  mobile: string;
  address: string;
  createTime: number;
  updateTime: number;
}

export class QuestionInfo {
  activityId: string;// 活动ID
  answer: string;// 正确答案
  createTime: number;// 创建时间
  id: number; // id
  image: string; //图片地址
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  optionF: string;
  remark: string; //备注
  title: string; //题目
  updateTime: string; //更新时间
  useStatus: string; //是否启用 0启用 1不启用
}
