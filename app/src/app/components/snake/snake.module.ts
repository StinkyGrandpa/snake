import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeComponent } from './snake.component';
import { SnakeSettingsComponent } from './snake-settings/snake-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from './services/snake.service';



@NgModule({
  declarations: [
    SnakeComponent,
    SnakeSettingsComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  providers: [
    SettingsService
  ],
  exports: [
    SnakeComponent,
    SnakeSettingsComponent,
    ReactiveFormsModule,
  ]
})
export class SnakeModule { }
