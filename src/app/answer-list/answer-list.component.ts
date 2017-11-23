import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../animationsVariable';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
  animations: [flyIn]
})
export class AnswerListComponent implements OnInit {
  @ViewChild('bigBox') bigBox: ElementRef;

  constructor(private title: Title) {

  }

  ngOnInit() {
    this.title.setTitle('加油优惠券');
    this.bigBoxHeight();
  }

  bigBoxHeight(): void {
    const a_height = $(window).height();
    const b_height = $('.bigBox').height();
    if (b_height >= a_height) {
      this.bigBox.nativeElement.style.height = (b_height + 50) + 'px';
    } else {
      this.bigBox.nativeElement.style.height = a_height + 'px';
    }
  }

}
