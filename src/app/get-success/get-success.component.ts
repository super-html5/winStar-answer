import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-get-success',
  templateUrl: './get-success.component.html',
  styleUrls: ['./get-success.component.scss']
})
export class GetSuccessComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('领奖成功');
  }

}
