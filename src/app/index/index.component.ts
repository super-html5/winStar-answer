import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../animationsVariable';
import {AnswerActivityService} from '../service/answerActivity.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [flyIn]
})
export class IndexComponent implements OnInit {
  IsPastDate: boolean = false;
  userRanking: string;
  isRanking: boolean = true;

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService) {
  }

  ngOnInit() {
    this.title.setTitle('加油优惠券');
    this.IsPC();
  }


  IsPC(): void {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
      this.createWechatUserInfo();
      this.getUserActivityRanking();
      this.activityInfo();
      return;
    } else {
      window.location.href = 'pc.html';
    }
  }

  /**
   * 创建用户信息
   */
  createWechatUserInfo(): void {
    this.answerActivityService.createWechatUserInfo('olQf5t6N3ZdQNf9bB5BZ3r__KDz4', '朱燕妮')
      .then(res => {
        console.log(res);
        localStorage.setItem('_openid', res.openid );
      })
      .catch(res => console.log(res));
  }

  /**
   * 用户当前排名
   */
  getUserActivityRanking(): void {
    this.answerActivityService.getUserActivityRanking()
      .then(res => {
        this.userRanking = res.result;
        if (this.userRanking.length >= 5) {
          this.userRanking = '未上榜';
          this.isRanking = false;
        }
      })
      .catch(res => console.log(res));
  }

  /**
   * 获取活动状态
   */
  activityInfo(): void {
    this.answerActivityService.activityInfo()
      .then(res => {
        console.log(res);
        if (res.result === 'OFF') {
          this.IsPastDate = true;
        }
      })
      .catch(res => console.log(res));
  }
}
