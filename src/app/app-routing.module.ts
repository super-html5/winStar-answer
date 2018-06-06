import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {GetComponent} from './get/get.component';
import {GetSuccessComponent} from './get-success/get-success.component';
import {RankingListComponent} from './ranking-list/ranking-list.component';
import {PcHintComponent} from './pc-hint/pc-hint.component';
import {SharingActivitiesComponent} from './sharing-activities/sharing-activities.component';
import {FirstPageComponent} from './first-page/first-page.component';
const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'first'},
  {path: 'first', component: FirstPageComponent},
  {path: 'index', component: IndexComponent},
  {path: 'answer', component: AnswerListComponent},
  {path: 'get', component: GetComponent},
  {path: 'success', component: GetSuccessComponent},
  {path: 'rankingList', component: RankingListComponent},
  {path: 'sharing', component: SharingActivitiesComponent},
  {path: 'pcHint', component: PcHintComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

