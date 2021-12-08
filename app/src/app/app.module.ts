import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SnakeModule } from './components/snake/snake.module';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    NavbarComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SnakeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
