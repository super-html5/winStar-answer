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
    this.title.setTitle('排行榜');
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
