export const environment = {
  production: true,
  /**
   * 创建用户信息
   */
  createWechatUserInfo: '/wechat_access/api/v1/activity/noauth/answer/userInfo/createWechatUserInfo',
  /**
   * 实物奖品领取补全用户信息
   */
  updateUserInfo: '/wechat_access/api/v1/activity/noauth/answer/userInfo/updateWechatUserInfo',
  /**
   * 排行榜信息
   */
  getActivityRanking: '/wechat_access/api/v1/activity/noauth/answer/answerRecord/getActivityRanking',
  /**
   * 获取用户排名
   */
  getUserActivityRanking: '/wechat_access/api/v1/activity/noauth/answer/answerRecord/getUserActivityRanking',
  /**
   * 获取奖品信息
   */
  getRewardInfo: '/wechat_access/api/v1/activity/noauth/answer/activity/getRewardInfo',
  /**
   * 获取活动状态
   */
  info: '/wechat_access/api/v1/activity/noauth/answer/activity/info',
  /**
   * 领取奖品
   */
  receive: '/wechat_access/api/v1/activity/noauth/answer/activity/receive',
  /**
   * 获取全部题库
   */
  answerList: '/wechat_access/api/v1/activity/noauth/answer/questions',
  /**
   * 保存答题分数
   */
  questionRecord: '/wechat_access/api/v1/activity/noauth/answer/saveAnswerQuestionRecord',
  /**
   * 保存答题日志
   */
  questionLog: '/wechat_access/api/v1/activity/noauth/answer/saveAnswerQuestionLog'
};
