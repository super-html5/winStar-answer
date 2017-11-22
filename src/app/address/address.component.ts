import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  showShade: boolean = false;

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('我要领奖');
  }

  affirm(): void {
    this.showShade = true;
  }
  hiddenShade(): void {
    console.log(11);
    this.showShade = false;
  }
}
