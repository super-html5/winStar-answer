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
    this.title.setTitle('尊法守规明礼  安全文明出行');
  }

  banImg(event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  downLoad(): void {
    const u = navigator.userAgent, app = navigator.appVersion;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    // 是安卓浏览器
    if (isAndroid) {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wsd.yjx'; // 跳安卓端下载地址
    }
    // 是iOS浏览器
    if (isIOS) {
      window.location.href = 'https://itunes.apple.com/cn/app/uez/id1124821366?mt=8'; // 跳AppStore下载地址
    }
  }

}
