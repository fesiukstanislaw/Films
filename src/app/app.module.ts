import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import {RouterTestingModule} from '@angular/router/testing';
import { Routes, RouterModule} from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: PostsComponent},
  { path: 'film', component: PostComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    PaginationComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
