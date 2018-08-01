import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import {IonicStorageModule} from '@ionic/storage'
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { UploadPage } from '../pages/upload/upload';
import { SearchPage } from '../pages/search/search';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { CameraProvider } from '../providers/camera/camera';
import { PostPage } from '../pages/post/post';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { Camera } from '../../node_modules/@ionic-native/camera';
import { FileTransfer } from '../../node_modules/@ionic-native/file-transfer';
import { HttpAuthProvider } from '../providers/http-auth/http-auth';
import { HttpPostsProvider } from '../providers/http-posts/http-posts';
import { HttpUserProvider } from '../providers/http-user/http-user';
import { HttpInteractionProvider } from '../providers/http-interaction/http-interaction';
import { ListsPage } from '../pages/lists/lists';
import { FollowersListPage } from '../pages/followers-list/followers-list';
import { FollowingListPage } from '../pages/following-list/following-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    UploadPage,
    SearchPage,
    NotificationsPage,
    ProfilePage,
    EditProfilePage,
    PostPage,
    UserProfilePage,
    ListsPage,
    FollowersListPage,
    FollowingListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    UploadPage,
    SearchPage,
    NotificationsPage,
    ProfilePage,
    EditProfilePage,
    PostPage,
    UserProfilePage,
    ListsPage,
    FollowersListPage,
    FollowingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServicesProvider,
    CameraProvider,
    Camera,
    FileTransfer,
    HttpAuthProvider,
    HttpPostsProvider,
    HttpUserProvider,
    HttpInteractionProvider

  ]
})
export class AppModule {}
