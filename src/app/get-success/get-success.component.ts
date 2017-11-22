import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-get-success',
  templateUrl: './get-success.component.html',
  styleUrls: ['./get-success.component.scss']
})
export class GetSuccessComponent implements OnInit {
  @ViewChild('bigBox') bigBox: ElementRef;

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('领奖成功');
    this.bigBox.nativeElement.style.height = document.body.offsetHeight + 'px';

  }

}
