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
    this.IsPast();
    this.createWechatUserInfo();
    this.getUserActivityRanking();
  }


  IsPC(): void {
    if (
      /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)
    ) {
      return;
    } else {
      window.location.href = 'pc.html';
    }
  }

  IsPast() {
    const thetime = '2017-12-1';
    const activityDate = new Date(Date.parse(thetime.replace(/-/g, '/')));
    if (activityDate > new Date()) {
      // alert('没过期！');
      return;
    } else {
      // alert('过期了！');
      this.IsPastDate = true;
    }
  }

  createWechatUserInfo(): void {
    this.answerActivityService.createWechatUserInfo('olQf5t6N3ZdQNf9bB5BZ3r__KDz4', 1)
      .then(res => {
        console.log(res);
      })
      .catch(res => console.log(res));
  }

  getUserActivityRanking(): void {
    this.answerActivityService.getUserActivityRanking()
      .then(res => {
        // this.userRanking = res.result;
        console.log(res);
        if (this.userRanking.length >= 5) {
          this.userRanking = '未上榜';
          this.isRanking = false;
        }
      })
      .catch(() => alert('当前服务器繁忙，请稍后再试！'));
  }
}
