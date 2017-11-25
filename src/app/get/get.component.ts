import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AnswerActivityService} from '../service/answerActivity.service';
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

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRewardInfo();
  }

  /**
   * 获取奖品信息
   */
  getRewardInfo(): void {
    this.answerActivityService.getRewardInfo()
      .then(res => {
        console.log(res);
        this.ranking = res.ranking;
        // this.ranking = 120;
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
    if (this.source === 2) {
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
  affirm(address: string, mobile: string, name: string): void {
    if (this.regVerify(address, mobile, name)) {
      this.answerActivityService.updateUserInfo(address, mobile, name)
        .then(res => {
          console.log(res);
          this.showShade = true;
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
      /**
       * 领取奖品
       * @param mobile
       */
      this.answerActivityService.receive(mobile)
        .then(res => {
          console.log(res);
          this.router.navigate(['success']);
        })
        .catch(res => {
          console.log(res);
          if (JSON.parse(res._body) === 'rewardHasBeenReceived.answer.activity.NotRule') {
            alert('奖品已被领取！');
          } else if (JSON.parse(res._body) === 'rewardInfo.answer.activity.NotFound') {
            alert('暂无奖品信息');
          }
        });
    }
  }

}
