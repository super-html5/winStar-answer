import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AnswerActivityService} from '../service/answerActivity.service';
import {GetWechatUserInfo} from '../entity/answerActivity';
import {Router} from '@angular/router';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  ranking: number;
  userRanking: number;
  showShade: boolean = false;
  pageReward: string;
  source: number;
  isDisabled: boolean = true;
  isClick: boolean = false;
  inputValue: GetWechatUserInfo;

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService,
              private router: Router) {
  }

  ngOnInit() {
    this.getWechatUserInfo();
    this.getRewardInfo();
  }

  /**
   * 判断是否领取过实物奖
   */
  getWechatUserInfo(): void {
    this.answerActivityService.getWechatUserInfo()
      .then(res => {
        console.log(res);
        this.inputValue = res;
        if (!res.mobile) {
          this.isDisabled = false;
        }
      })
      .catch(res => console.log(res));
  }

  /**
   * 获取奖品信息
   */
  getRewardInfo(): void {
    this.answerActivityService.getRewardInfo()
      .then(res => {
        console.log(res);
        this.ranking = res.ranking;
        // this.ranking = 20;
        this.userRanking = res.ranking;
        if (res.reward = '警察公仔摆件一个') {
          this.pageReward = './assets/img/page-address3.png';
        } else if (res.reward = '双肩包一个') {
          this.source = 2;
          this.pageReward = './assets/img/page-address1.png';
        }
        this.isWin();
      })
      .catch(res => {
        console.log(res);
        if (JSON.parse(res._body).code === 'activityNotOver.answer.activity.NotRule') {
          alert('活动尚未结束，没法获去奖品。');
        }
      });
  }

  /**
   * 根据答题的名次显示中奖页面（分为ranking 50,200,201 三个级别）
   * 及title
   */
  isWin(): void {
    if (this.source === 2) { // 陕西交警
      if (this.ranking <= 200) {
        this.ranking = 50;
        this.title.setTitle('我要领奖');
      } else if (this.ranking > 200) {
        this.ranking = 201;
        this.title.setTitle('未中奖');
        return;
      }
      return;
    } else {
      if (this.ranking <= 50) {
        this.ranking = 50;
        this.title.setTitle('我要领奖');
        return;
      } else if (this.ranking > 50 && this.ranking <= 200) {
        this.ranking = 200;
        this.title.setTitle('我要领奖');
        return;
      } else if (this.ranking > 200) {
        this.ranking = 201;
        this.title.setTitle('未中奖');
        return;
      }
    }

  }

  /**
   * 验证input的值是否正确
   * @param address
   * @param mobile
   * @param name
   * @returns {boolean}
   */
  regVerify(address: string, mobile: string, name: string) {
    if (!name) {
      alert('请输入您的姓名！');
      return false;
    } else if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(mobile))) {
      alert('请输入正确的手机号！');
      return false;
    } else if (!address) {
      alert('请输入您的地址！');
      return false;
    } else {
      return true;
    }
  }


  /**
   * 确认提交地址
   * @param address
   * @param mobile
   * @param name
   */
  affirm(name: string, mobile: string, address: string): void {
    if (this.regVerify(name, mobile, address)) {
      this.answerActivityService.updateUserInfo(name, mobile, address)
        .then(res => {
          console.log(res);
          this.showShade = true;
          this.isDisabled = true;
        })
        .catch();
    }
  }

  /**
   * 隐藏透明层
   */
  hiddenShade(): void {
    this.showShade = false;
  }

  /**
   * 跳转成功页
   * @param mobile
   */
  toLinkSuccess(mobile: string): void {
    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(mobile))) {
      alert('请输入正确的手机号！');
      return;
    } else {
      if (!this.isClick) {
        this.receive(mobile);
      }

    }
  }

  /**
   * 领取奖品
   * @param mobile
   */
  receive(mobile: string): void {
    this.answerActivityService.receive(mobile)
      .then(res => {
        this.isClick = true;
        console.log(res);
        this.router.navigate(['success']);
      })
      .catch(res => {
        this.isClick = true;
        console.log(res);
        if (JSON.parse(res._body).code === 'rewardHasBeenReceived.answer.activity.NotRule') {
          alert('该奖品已被领取！');
        } else if (JSON.parse(res._body).code === 'rewardInfoNotExist.answer.activity') {
          alert('暂无奖品信息');
        } else if (JSON.parse(res._body).code === 'coupons.AuthFail') {
          alert('该手机号已领取过奖品！');
        }
        /*  else if (JSON.parse(res._body).code === 'rewardInfo.answer.activity.NotFound') {
         alert('暂无奖品信息');
         } */
      });
  }
}


