import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingListPage } from './following-list';

@NgModule({
  declarations: [
    FollowingListPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowingListPage),
  ],
})
export class FollowingListPageModule {}
