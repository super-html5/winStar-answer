import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {RankingListComponent} from './ranking-list/ranking-list.component';
import {GetSuccessComponent} from './get-success/get-success.component';
import {GetComponent} from './get/get.component';
import {SharingActivitiesComponent} from './sharing-activities/sharing-activities.component';
import {AnswerListComponent} from './answer-list/answer-list.component';

import {AnswerActivityService} from './service/answerActivity.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    RankingListComponent,
    GetSuccessComponent,
    GetComponent,
    SharingActivitiesComponent,
    AnswerListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [Title, {provide: LocationStrategy, useClass: HashLocationStrategy}, AnswerActivityService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
