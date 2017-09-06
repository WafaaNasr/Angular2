import { AppErrorHandler } from './common/errors/app-error-handler';
import { ErrorHandler } from '@angular/core';
import { PostService } from './services/post.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    PostService,
    // To Implicitly replace the errorhandlers methods with the custom/Global ErrorHandler
    {provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
