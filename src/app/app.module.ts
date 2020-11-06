import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UiTreeComponent} from './ui-tree/ui-tree.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import { UiTreeItemComponent } from './ui-tree-item/ui-tree-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UiTreeComponent,
    UiTreeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
