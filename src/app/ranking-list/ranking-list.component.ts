import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AnswerActivityService} from '../service/answerActivity.service';
@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {

  constructor(private title: Title,
              private answerActivityService: AnswerActivityService) {
  }

  ngOnInit() {
    this.title.setTitle('排行榜');
    this.getActivityRanking(1);
  }

  getActivityRanking(source: number): void {
    this.answerActivityService.getActivityRanking(source)
      .then(res => console.log(res))
      .catch(res => console.log(res));
  }
}
