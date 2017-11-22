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
    this.bigBox.nativeElement.style.height = document.body.offsetHeight + 'px';
  }

}
