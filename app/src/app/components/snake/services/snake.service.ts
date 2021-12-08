import { Injectable } from '@angular/core';
import { Settings } from '../snakeGame/models';

@Injectable({
  providedIn: 'platform'
})
export class SettingsService {

  private globalSettings: Settings = { applesPerGame: 2, growPerApple: 1, snakeLength: 3, startSpeed: 200 }

  constructor() { }

  getSettings(): Settings {
    return this.globalSettings;
  }

  setSettings(newSettings: Settings) {
    this.globalSettings = newSettings;
  }
}
