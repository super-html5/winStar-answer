import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sharing-activities',
  templateUrl: './sharing-activities.component.html',
  styleUrls: ['./sharing-activities.component.scss']
})
export class SharingActivitiesComponent implements OnInit {
  @ViewChild('bigBox') bigBox: ElementRef;
  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('活动分享');
    this.bigBox.nativeElement.style.height = document.body.offsetHeight + 'px';

  }

}
