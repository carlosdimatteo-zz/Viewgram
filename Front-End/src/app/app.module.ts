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
    UserProfilePage
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
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServicesProvider,
    CameraProvider

  ]
})
export class AppModule {}
