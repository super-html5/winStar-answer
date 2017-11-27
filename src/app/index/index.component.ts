import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
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
  onOrOff: string = './assets/img/home-page_02.jpg';

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService,
              private router: Router) {
  }

  ngOnInit() {
    this.title.setTitle('答题');
    this.IsPC();
  }


  IsPC(): void {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
      this.createWechatUserInfo();
      this.getUserActivityRanking();
      this.activityInfo();
      return;
    } else {
      this.router.navigate(['pcHint']);
    }
  }

  /**
   * 创建用户信息
   */
  createWechatUserInfo(): void {
    const _openid = localStorage.getItem('openid');
    const _nickname = localStorage.getItem('nickname');
    this.answerActivityService.createWechatUserInfo(_openid, _nickname)
      .then(res => {

      })
      .catch(res => {
        alert('当前服务器繁忙，请稍后再试');
      });
  }

  /**
   * 用户当前排名
   */
  getUserActivityRanking(): void {
    this.answerActivityService.getUserActivityRanking()
      .then(res => {
        console.log(res);
        this.userRanking = res.result;
        if (this.userRanking.length >= 5) {
          this.userRanking = '未上榜';
          this.isRanking = false;
        }
      })
      .catch(() => {
        this.userRanking = '未上榜';
        this.isRanking = false;
      });
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
          this.onOrOff = './assets/img/home-page_02_off.jpg';
        }
      })
      .catch(res => console.log(res));
  }
}
