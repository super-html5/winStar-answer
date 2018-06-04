import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
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
  isHaveLoad: boolean = false;

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      console.log(res);
    });
    this.title.setTitle('尊法守规明礼  安全文明出行');
    this.IsPC();
  }


  IsPC(): void {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
      this.createWechatUserInfo();
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
        this.activityInfo();
      })
      .catch(res => {
        alert('当前服务器繁忙，请稍后再试');
      });
  }

  /**
   * 用户当前排名
   */
  getUserActivityRanking(): void {
    this.isHaveLoad = true;
    this.answerActivityService.getUserActivityRanking()
      .then(res => {
        this.isHaveLoad = false;
        this.userRanking = res.result;
        if (this.userRanking.length >= 5) {
          this.userRanking = '未上榜';
          this.isRanking = false;
        }
      })
      .catch(() => {
        this.isHaveLoad = false;
        this.isRanking = false;
      });
  }

  /**
   * 获取活动状态
   */
  activityInfo(): void {
    this.answerActivityService.activityInfo()
      .then(res => {
        this.getUserActivityRanking();
        if (res.result === 'OFF') {
          this.IsPastDate = true;
          this.onOrOff = './assets/img/home-page_02_off.jpg';
        }
      })
      .catch(res => console.log(res));
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
