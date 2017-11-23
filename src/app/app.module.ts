import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {AddressComponent} from './address/address.component';
import {RankingListComponent} from './ranking-list/ranking-list.component';
import {GetSuccessComponent} from './get-success/get-success.component';
import {GetComponent} from './get/get.component';
import {SharingActivitiesComponent} from './sharing-activities/sharing-activities.component';
import {AnswerListComponent} from './answer-list/answer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AddressComponent,
    RankingListComponent,
    GetSuccessComponent,
    GetComponent,
    SharingActivitiesComponent,
    AnswerListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule.forRoot(),
    AppRoutingModule
  ],
  providers: [Title, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
