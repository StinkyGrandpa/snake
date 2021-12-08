import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvalidPageComponent } from './components/invalid-page/invalid-page.component';
import { SnakeComponent } from './components/snake/snake.component';

const routes: Routes = [
  { path: 'snake', component: SnakeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: InvalidPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InvalidPageComponent]
