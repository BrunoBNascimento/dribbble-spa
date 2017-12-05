import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap';
import { LoadingModule } from 'ngx-loading';
import { ModalModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { ShotsComponent } from './shots/shots.component';

import { ShotsService } from './shots/shots.service';
import {OauthService} from './oauth.service';

@NgModule({
  declarations: [
    AppComponent,
    ShotsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LoadingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ ShotsService, OauthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
