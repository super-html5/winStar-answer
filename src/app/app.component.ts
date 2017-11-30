import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AnswerListService} from './service/answerList.service';
declare var wx: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


  constructor(private answerListService: AnswerListService) {

  }

  ngOnInit() {
    if (!localStorage.getItem('openid')) {
      location.href = 'https://mobile.sxwinstar.net/wechat/index.php?type=login&menu=answer';
    }
    return;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.share();
    }, 500);
  }

  share(): void {
    const url = location.href.split('#')[0];
    this.answerListService.getShare(url)
      .then(data => {
        console.log(data);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.wxData.appid,
          timestamp: data.wxData.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.wxData.nonceStr, // 必填，生成签名的随机串
          signature: data.wxData.signature, // 必填，签名
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        const fxTitle = '尊法守规明礼  安全文明出行';
        const fxImgUrl = 'https://mobile.sxwinstar.net/wechat/answer/assets/img/answer/391511838393_.pic.jpg';
        const fxDesc = '交通安全知识大闯关，前200名均有礼品哦！';
        const link = 'https://mobile.sxwinstar.net/wechat/index.php?type=login&menu=answer';

        wx.ready(function () {
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
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
          });
        });

        wx.error(function (res) {
        });
      })
      .catch();
  }
}
