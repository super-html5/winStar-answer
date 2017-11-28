import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sharing-activities',
  templateUrl: './sharing-activities.component.html',
  styleUrls: ['./sharing-activities.component.scss']
})
export class SharingActivitiesComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('尊法守规明礼  安全文明出行');
  }

}
