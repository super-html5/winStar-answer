import {Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {QuestionInfo} from '../../entity/answerActivity';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  _questionInfo: QuestionInfo;
  _timer: number = 15;
  _progressBar: any;
  _progressBarTimer: any;
  _index: number;
  @ViewChild('bigBox') bigBox: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @Output() onVoted = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
    this.bigBoxHeight();
    this.onProgressBarInit();
    this.remainingTimer();
  }

  @Input()
  set QuestionInfo(questionInfo: QuestionInfo) {
    this._questionInfo = questionInfo;
    this._timer = 15;
    this.progressBar.nativeElement.style.width = '100%';
  }

  get QuestionInfo(): QuestionInfo {
    return this._questionInfo;
  }

  @Input()
  set Index(index: number) {
    this._index = index;
  }

  get Index(): number {
    return this._index;
  }

  /**
   * 加载条倒计时
   */
  onProgressBarInit(): void {
    this._progressBar = setInterval(() => {
      this.progressBar.nativeElement.style.width = this.remainingProgressBar();
    }, 150);
  }

  /**
   * 加载条倒计时，内部方法
   * @returns {string}
   */
  remainingProgressBar(): string {
    let _str = this.progressBar.nativeElement.style.width;
    let _num = _str.substring(0, _str.length - 1);
    _num -= 1;
    if (_num === 0) {
      clearInterval(this._progressBar);
    }
    return _num + '%';
  }

  /**
   * 时间倒计时
   */
  remainingTimer(): void {
    this._progressBarTimer = setInterval(() => {
      this._timer -= 1;
      if (this._timer === 0) {
        clearInterval(this._progressBarTimer);
      }
    }, 1000);
  }

  /**
   * 获取页面高度
   */
  bigBoxHeight(): void {
    const a_height = $(window).height();
    const b_height = $('.bigBox').height();
    if (b_height >= a_height) {
      this.bigBox.nativeElement.style.height = (b_height + 50) + 'px';
    } else {
      this.bigBox.nativeElement.style.height = a_height + 'px';
    }
  }

  chooseOne(answer: string): void {
    if (answer === this._questionInfo.answer) {
      this.onVoted.emit(true);
    } else {
      this.onVoted.emit(false);
    }
  }
}
