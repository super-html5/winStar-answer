import {Component, OnInit} from '@angular/core';
import {AnswerActivityService} from '../service/answerActivity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {
  isHaveLoad: boolean = false;
  activity1Status: string;
  activity2Status: string;

  constructor(private answerActivityService: AnswerActivityService,
              private router: Router) {
  }

  ngOnInit() {
    document.body.style.background = '#18ABFD';
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
   * 获取活动状态
   */
  activityInfo(): void {
    this.isHaveLoad = true;
    this.answerActivityService.activityInfo()
      .then(res => {
        this.isHaveLoad = false;
        this.activity1Status = res[0].status;
        this.activity2Status = res[1].status;
        console.log(res);
      })
      .catch(res => {
        this.isHaveLoad = false;
        console.log(res);
      });
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
