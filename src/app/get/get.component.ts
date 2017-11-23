import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent implements OnInit {
  ranking: number = 21;
  showShade: boolean = false;


  constructor(private title: Title) {
  }

  ngOnInit() {
    this.isWin();
  }

  isWin(): void {
    if (this.ranking <= 50) {
      this.ranking = 50;
      this.title.setTitle('我要领奖');
      return;
    } else if (this.ranking > 50 && this.ranking <= 200) {
      this.ranking = 200;
      this.title.setTitle('我要领奖');
      return;
    } else {
      this.title.setTitle('未中奖');
      return;
    }
  }

  affirm(): void {
    this.showShade = true;
  }

  hiddenShade(): void {
    console.log(11);
    this.showShade = false;
  }
}
