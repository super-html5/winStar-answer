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
import {AnswerListService} from '../../service/answerList.service';

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
  /**
   * 答题开始时间
   */
  _startTime: string;

  /**
   * 答题结束时间
   */
  _endTime: string;

  @ViewChild('bigBox') bigBox: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;
  @Output() onVoted = new EventEmitter<boolean>();

  showShade: boolean = false;

  _alertStr: string;
  _alertBtnStr: string;
  isHaveLoad: boolean = false;

  constructor(private router: Router, private answerListService: AnswerListService) {

  }

  ngOnInit() {
    this._startTime = new Date().getTime().toString();
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
        this._endTime = new Date().getTime().toString();
        this.saveUserRecord(0, 2);
        clearInterval(this._progressBarTimer);
      }
    }, 1000);
  }

  /**
   * 答题
   * @param {string} answer
   */
  chooseOne(answer: string): void {
    if (answer === this._questionInfo.answer) {
      if (this._index === this._questionLength) {
        this._endTime = new Date().getTime().toString();
        this.saveUserRecord(1, 3);
        clearInterval(this._progressBarTimer);
        clearInterval(this._progressBar);
        return;
      }
      this.onVoted.emit(true);
    } else {
      this._endTime = new Date().getTime().toString();
      this.saveUserRecord(0, 1);
      clearInterval(this._progressBarTimer);
      clearInterval(this._progressBar);
      return;
    }
  }

  /**
   * 答题日志
   * @param answerLog
   */
  saveAnswerQuestionLog(answerLog: any): void {
    this.answerListService.saveAnswerQuestionLog(answerLog, this._index.toString())
      .then(res => {
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  }

  /**
   * 保存答题分数
   */
  saveUserRecord(isUp: number, flag: number): void {
    this.isHaveLoad = true;
    let _record = 0;
    if (isUp === 1) {
      _record = this._index + 1;
    } else if (isUp === 0) {
      _record = this._index;
    }
    this.answerListService.saveUserRecord(this._startTime, this._endTime, _record.toString())
      .then(res => {
        this.isHaveLoad = false;
        this.imgAlert(flag);
      }).catch(res => {
      this.isHaveLoad = false;
    })
  }


  /**
   * 弹出框
   * @param {number} flag 1:错误 2：超时 3：全部答对
   * @private
   */
  imgAlert(flag: number): void {
    if (flag === 1) {
      this._alertStr = 'error-img';
      this._alertBtnStr = 'again.png';
    } else if (flag === 2) {
      this._alertStr = 'time-over';
      this._alertBtnStr = 'again.png';
    } else if (flag === 3) {
      this._alertStr = 'allRight-img';
      this._alertBtnStr = 'ok.png'
    }
    this.showShade = true;
  }

  hiddenShade(): void {
    this.router.navigate(['/index']);
  }
}
