import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss']
})
export class RankingListComponent implements OnInit {
  @ViewChild('bigBox') bigBox: ElementRef;

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('排行榜');
    this.bigBox.nativeElement.style.height = document.body.offsetHeight + 'px';
  }

}
