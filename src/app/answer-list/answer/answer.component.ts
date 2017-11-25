import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {QuestionInfo} from '../../entity/answerActivity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  /**
   * 单个题库实体
   */
  _questionInfo: QuestionInfo;
  /**
   * 倒计时时间初始化
   * @type {number}
   * @private
   */
  _timer: number = 15;
  /**
   * 倒计时条儿定时器
   */
  _progressBar: any;
  /**
   * 倒计时时间定时器
   */
  _progressBarTimer: any;
  /**
   * 题库下标
   */
  _index: number;
  /**
   * 题库总长度
   */
  _questionLength: number;

  @ViewChild('bigBox') bigBox: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @Output() onVoted = new EventEmitter<boolean>();

  showShade: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.onProgressBarInit();
    this.remainingTimer();
  }

  /**
   * 获取单个题库
   * @param {QuestionInfo} questionInfo
   * @constructor
   */
  @Input()
  set QuestionInfo(questionInfo: QuestionInfo) {
    this._questionInfo = questionInfo;
    this._timer = 15;
    this.progressBar.nativeElement.style.width = '100%';
  }

  get QuestionInfo(): QuestionInfo {
    return this._questionInfo;
  }

  /**
   * 获取当前题的下标
   * @param {number} index
   * @constructor
   */
  @Input()
  set Index(index: number) {
    this._index = index;
  }

  get Index(): number {
    return this._index;
  }

  /**
   * 获取题库总长度
   * @param {number} num
   * @constructor
   */
  @Input()
  set QuestionLength(num: number) {
    this._questionLength = num;
  }

  get QuestionLength(): number {
    return this._questionLength;
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

  chooseOne(answer: string): void {
    if (this._index === this._questionLength) {
      // todo 此处需要弹窗提示，已经回答全部题库，结束答题
      return;
    }
    if (answer === this._questionInfo.answer) {
      this.onVoted.emit(true);
    } else {
      clearInterval(this._progressBarTimer);
      clearInterval(this._progressBar);
      this.showShade = true;
      return;
    }
  }

  hiddenShade(): void {
    this.router.navigate(['/index']);
  }
}
