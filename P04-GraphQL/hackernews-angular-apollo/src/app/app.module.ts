import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GraphQLModule} from './apollo.config';
import { LinkItemComponent } from './link-item/link-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkItemComponent,
  ],
  imports: [
    BrowserModule,
    // connection
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
