import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {flyIn} from '../animationsVariable';
import {Data} from "@angular/router";
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [flyIn]
})
export class IndexComponent implements OnInit {
  IsPastDate: boolean = false;

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('加油优惠券');
    this.IsPC();
    this.IsPast();
  }


  IsPC(): void {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
      return;
    } else {
      // window.location.href = 'pc.html';
    }
  }

  IsPast() {
    const thetime = '2017-12-1';
    const activityDate = new Date(Date.parse(thetime.replace(/-/g, '/')));
    if (activityDate > new Date()) {
      alert('没过期！');
      return;
    } else {
      alert('过期了！');
      this.IsPastDate = true;
    }
  }
}
