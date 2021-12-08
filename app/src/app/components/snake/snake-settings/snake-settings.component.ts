import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../snakeGame/models';

@Component({
  selector: 'app-snake-settings',
  templateUrl: './snake-settings.component.html',
  styleUrls: ['./snake-settings.component.scss']
})
export class SnakeSettingsComponent implements OnInit {

  @Input() isSettings: Settings = { applesPerGame: 2, growPerApple: 1, snakeLength: 3, startSpeed: 200 };
  @Output() showSettings: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getSettings: EventEmitter<any> = new EventEmitter<any>();

  settingsForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder
  ) {
    //console.log(this.isSettings)
    this.settingsForm = this.formBuilder.group({
      applesPerGame: formBuilder.control(this.isSettings.applesPerGame, [Validators.required, Validators.min(1), Validators.max(9)]),
      snakeLength: formBuilder.control(this.isSettings.snakeLength, [Validators.required, Validators.min(1), Validators.max(9)]),
      growPerApple: formBuilder.control(this.isSettings.growPerApple, [Validators.required, Validators.min(1), Validators.max(9)]),
      startSpeed: formBuilder.control(this.isSettings.startSpeed, [Validators.required, Validators.min(66), Validators.max(999)]),
    })
  }

  ngOnInit(): void {
    //console.log(this.isSettings)

  }

  closeSettings() {
    this.showSettings.emit()
  }

  provideSettings() {
    let data: Settings = {
      applesPerGame: this.settingsForm.value['applesPerGame'],
      snakeLength: this.settingsForm.value['snakeLength'],
      growPerApple: this.settingsForm.value['growPerApple'],
      startSpeed: this.settingsForm.value['startSpeed']
    }
    this.getSettings.emit(data)
  }

}
