// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    /**
     * 创建用户信息
     */
    createWechatUserInfo: '/wechatApi-ng4/api/v1/activity/noauth/answer/userInfo/createWechatUserInfo',
    /**
     * 实物奖品领取补全用户信息
     */
    updateUserInfo: '/wechatApi-ng4/api/v1/activity/noauth/answer/userInfo/updateWechatUserInfo',
    /**
     * 排行榜信息
     */
    getActivityRanking: '/wechatApi-ng4/api/v1/activity/noauth/answer/answerRecord/getActivityRanking',
    /**
     * 获取用户排名
     */
    getUserActivityRanking: '/wechatApi-ng4/api/v1/activity/noauth/answer/answerRecord/getUserActivityRanking',
    /**
     * 获取奖品信息
     */
    getRewardInfo: '/wechatApi-ng4/api/v1/activity/noauth/answer/activity/getRewardInfo',
    /**
     * 获取活动状态
     */
    info: '/wechatApi-ng4/api/v1/activity/noauth/answer/activity/info',
    /**
     * 领取奖品
     */
    receive: '/wechatApi-ng4/api/v1/activity/noauth/answer/activity/receive',


  }
;
