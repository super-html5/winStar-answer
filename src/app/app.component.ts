import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AnswerListService} from './service/answerList.service';
import {NavigationEnd, Router} from '@angular/router';

declare var wx: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  constructor(private answerListService: AnswerListService,
              private router: Router) {

  }

  title = 'app';

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.share();
      }
    });
  }

  ngAfterViewInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.share();
      }
    });
  }

  public share(): void {
    this.answerListService.getShare()
      .then(data => {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.wxData.appid,
          timestamp: data.wxData.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.wxData.nonceStr, // 必填，生成签名的随机串
          signature: data.wxData.signature, // 必填，签名
          jsApiList: ['checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        const fxTitle = '全省道路交通安全攻坚行动暨安全生产月有奖答题活动开始啦！';
        const fxImgUrl = 'https://mobile.sxwinstar.net/wechat-sxjj/answer/assets/img/answer/391511838393_.pic.jpg';
        const fxDesc = '答题有好礼哦。……';
        const link = 'https://mobile.sxwinstar.net/wechat-sxjj/index.php?type=login&menu=answer';
        wx.ready(function () {
          // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
          wx.checkJsApi({
            jsApiList: [
              'getNetworkType',
              'previewImage'
            ],
            success: function (res) {
            },
            fail: function (res) {
            }
          });


          // 2. 分享接口
          // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口


          wx.onMenuShareAppMessage({
            title: fxTitle,
            desc: fxDesc,
            link: link,
            imgUrl: fxImgUrl,
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
          });
          // alert('已注册获取“发送给朋友”状态事件');

          // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

          wx.onMenuShareTimeline({
            title: fxTitle,
            link: link,
            imgUrl: fxImgUrl,
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
          });


          // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

          wx.onMenuShareQQ({
            title: fxTitle,
            desc: fxDesc,
            link: link,
            imgUrl: fxImgUrl,
            trigger: function (res) {
            },
            complete: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
          });


          // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
          wx.onMenuShareWeibo({
            title: fxTitle,
            desc: fxDesc,
            link: link,
            imgUrl: fxImgUrl,
            trigger: function (res) {
              alert('用户点击分享到微博');
            },
            complete: function (res) {
              alert(JSON.stringify(res));
            },
            success: function (res) {
              alert('已分享');

            },
            cancel: function (res) {
              alert('已取消');
            },
            fail: function (res) {
              alert(JSON.stringify(res));
            }
          });
        });
        wx.error(function (res) {
        });


      })
      .catch(res => {
        console.log(res);
      });
  }
}
