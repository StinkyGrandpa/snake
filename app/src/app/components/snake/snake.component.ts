import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Settings } from './snakeGame/models';
import { Snake } from './snakeGame/snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

  private inputFilter: string = 'wasdWASD'
  private canvas!: HTMLCanvasElement;
  private c !: CanvasRenderingContext2D; // canvas context
  private snake !: Snake
  private timeout: number = 200;
  public alive: boolean = true;
  private startSpeed: number = 200;
  public eaten: number = 0;
  public showSettings: boolean = true;
  public settings: Settings = { applesPerGame: 2, growPerApple: 1, snakeLength: 3, startSpeed: 100 };



  public play: boolean = false

  constructor() { }

  ngOnInit() {
    this.canvas = document.querySelector('canvas') as HTMLCanvasElement;
    this.c = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = 200
    this.canvas.height = 200

    this.snake = new Snake(
      this.canvas,
      this.c,
      5,
      20,
      1
    )
  }

  private Random(num = 5, limit = this.canvas.width) {
    const random = Math.random() * limit
    const res = Math.round(random / num) * num
    return res;
  }

  private validInput = ''
  @HostListener('document:keypress', ['$event'])
  inputEvent(event: KeyboardEvent) {
    if (!this.inputFilter.includes(event.key))
      return;
    this.validInput = event.key
    this.snake.move(this.validInput)

  }



  public playGame() {
    this.play = !this.play
    if (this.play)
      this.game()
  }

  async game() {
    if (!this.play) return;
    try {
      if (this.snake.gameLogik()) {
        const x = ++this.eaten
        const y = this.startSpeed - Math.sqrt(x) * 21
        //console.log(y);
        this.timeout = (y > 66) ? y : 66;
      }
    } catch (e: any) {
      this.alive = false;
      return;
    }

    this.snake.move(this.validInput)
    setTimeout(() => {
      this.game()
      //console.log(this.timeout)
    }, this.timeout);


  }

  public newGame(startLength: number = this.settings.snakeLength,
    applesPerGame: number = this.settings.applesPerGame,
    growPerApple: number = this.settings.growPerApple,
    startSpeed: number = this.settings.startSpeed
  ) {
    this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake = new Snake(
      this.canvas,
      this.c,
      startLength,
      applesPerGame,
      growPerApple
    )
    this.validInput = 'd';
    this.eaten = 0;
    this.alive = true;
    this.startSpeed = startSpeed;
    this.timeout = this.startSpeed;
    this.play = true
    this.game()

  }

  toggleSettings() {
    this.play = !this.play
    this.showSettings = !this.showSettings
  }

  closeSettings() {
    this.showSettings = !this.showSettings
    //this.play = true


  }


  getSettings(event: Settings) {
    //console.log(event)
    this.showSettings = !this.showSettings

    this.settings = event;
    this.newGame(
      event.snakeLength,
      event.applesPerGame,
      event.growPerApple,
      event.startSpeed)
  }
}
