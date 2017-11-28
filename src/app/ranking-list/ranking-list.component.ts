import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AnswerActivityService} from '../service/answerActivity.service';
import {ActivityRanking} from '../entity/answerActivity';
@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {
  rankList: ActivityRanking;

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService) {
  }

  ngOnInit() {
    this.title.setTitle('尊法守规明礼  安全文明出行');
    this.getActivityRanking();
  }

  getActivityRanking(): void {
    this.answerActivityService.getActivityRanking()
      .then(res => {
        this.rankList = res;
      })
      .catch(res => {
        console.log(res);
        alert('当前服务器繁忙，请稍后再试！');
      });
  }
}
