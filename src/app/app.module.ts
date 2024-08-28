import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TreeNodeModule } from './tree-node/tree-node.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeNodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
