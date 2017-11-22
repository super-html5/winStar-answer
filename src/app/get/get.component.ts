import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  @ViewChild('bigBox') bigBox: ElementRef;
  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('我要领奖');
    this.bigBox.nativeElement.style.height = document.body.offsetHeight + 'px';

  }

}
