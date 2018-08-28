import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ComponentsModule } from '../components/components.module'
import { WorkTimeComponent } from '../components/work-time/work-time'

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Business } from '../providers/business/business';

import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../store/reducers/reducers';
import { GetDateProvider } from '../providers/get-date/get-date';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    FormsModule,
    ComponentsModule,
    BrowserModule,
    StoreModule.forRoot({state:rootReducer}),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Business,
    GetDateProvider
  ],
  exports:[
    WorkTimeComponent
  ]
})
export class AppModule {}
