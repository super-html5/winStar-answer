import {Component, OnInit} from '@angular/core';
import {flyIn} from '../animationsVariable';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [flyIn]
})
export class IndexComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
