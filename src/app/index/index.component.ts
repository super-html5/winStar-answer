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
  imgRuleSrc: string = './assets/img/home-page_05.jpg';
  activityId: string;
  isHaveLoad: boolean = false;

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      console.log(res);
      localStorage.setItem('answerIntoActivityId', res.activityId);
      this.activityId = res.activityId;
      if (res.activityId === '8a80cb815fc885e2015fc891dbb20003') {
        this.imgRuleSrc = './assets/img/home-page_05_1.jpg';
      }
      if (res.status === 'REWARDING') {
        this.IsPastDate = true;
        this.onOrOff = './assets/img/home-page_02_off.jpg';
      }
    });
    this.title.setTitle('尊法守规明礼  安全文明出行');
    this.getUserActivityRanking();

  }


  /**
   * 用户当前排名
   */
  getUserActivityRanking(): void {
    this.isHaveLoad = true;
    this.answerActivityService.getUserActivityRanking(this.activityId)
      .then(res => {
        this.isHaveLoad = false;
        this.userRanking = res.result;
        if (this.userRanking.length >= 5 || Number(this.userRanking) === 0) {
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
  /* activityInfo(): void {
   this.answerActivityService.activityInfo()
   .then(res => {
   this.getUserActivityRanking();
   if (res.result === 'OFF') {
   this.IsPastDate = true;
   this.onOrOff = './assets/img/home-page_02_off.jpg';
   }
   })
   .catch(res => console.log(res));
   }*/

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
