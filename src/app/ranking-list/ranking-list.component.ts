import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('排行榜');
  }

}
