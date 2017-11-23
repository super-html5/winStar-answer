import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../animationsVariable';
import {AnswerListService} from '../service/answerList.service';
import {QuestionInfo} from '../entity/answerActivity';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
  animations: [flyIn]
})
export class AnswerListComponent implements OnInit {

  questionInfoList: QuestionInfo[];
  questionInfo: QuestionInfo;
  _index: number = 0;

  constructor(private title: Title,
              private answerListService: AnswerListService) {
  }

  ngOnInit() {
    this.title.setTitle('答题列表');
    this.getQuestionList()
  }

  /**
   * 获取题库
   */
  getQuestionList(): void {
    this.answerListService.getQuestionList()
      .then(res => {
        this.questionInfoList = res;
        this.questionInfo = this.questionInfoList[0];
      })
      .catch(res => {
        console.log(res);
      })
  }

  chooseQuestion(): void {
    this._index += 1;
    this.questionInfo = this.questionInfoList[this._index];
  }

  onVoted(agreed: boolean) {
    console.log(agreed);
    if (agreed) {
      this.chooseQuestion();
    } else {
      this.chooseQuestion();
    }
  }
}
