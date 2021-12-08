import { Locaiton } from "./models"
import { Movment, Pace as dir } from './models'
import { validInput as VI } from './models'

export class Snake {


    private body: Locaiton[] = []
    private size: number = 5;
    private nextStep: Movment = { pace: 5, horizontel: true, vertikal: false }
    private play: boolean = false;
    private increasePace: boolean = false;
    private score: number = 0;
    private appels: Locaiton[] = []
    private startX: number = 0;
    private startY: number = 0;
    private needToGrow: number = 0;

    constructor(private canvas: HTMLCanvasElement, private drawElement: CanvasRenderingContext2D, startLength: number = 3, appleCount = 2, private growOnEat: number = 1) {
        this.startX = this.Random(5, this.canvas.width - 90) + 20;
        this.startY = this.Random(5, this.canvas.width - 50) + 30;
        let newx = 0;
        for (let i = 0; i < startLength; i++) {
            this.body.push({ x: this.startX + newx, y: this.startY })
            newx += -5
        }
        for (let i = 0; i < ((appleCount > 0) ? appleCount : 1); i++) {
            this.newApple({ x: 0, y: 0 });
        }

    }
    move(input: string) {
        if ((input == VI.W) || (input == VI.w)) {
            this.nextStep.pace = dir.up;
            this.nextStep.horizontel = false;
            this.nextStep.vertikal = true;
        } else if
            ((input == VI.A) || (input == VI.a)) {
            this.nextStep.pace = dir.left;
            this.nextStep.horizontel = true;
            this.nextStep.vertikal = false;
        } else if
            ((input == VI.s) || (input == VI.S)) {
            this.nextStep.pace = dir.down;
            this.nextStep.horizontel = false;
            this.nextStep.vertikal = true;
        } else if
            ((input == VI.d) || (input == VI.D)) {
            this.nextStep.pace = dir.right;
            this.nextStep.horizontel = true;
            this.nextStep.vertikal = false;
        }
        return;
    }

    private draw() {
        //draw Snake body in green
        //console.log('Draw red')
        this.drawElement.fillStyle = 'green'
        this.body.forEach(item => {
            this.drawElement.fillRect(item.x, item.y, this.size, this.size)
            //console.error(item)
        })
        this.drawElement.fillStyle = 'red'

        for (const appel of this.appels) {
            this.drawElement.fillRect(appel.x, appel.y, this.size, this.size)
        }

        //console.log('Draw red')
        return;
    }

    private unDraw() {
        //console.log('unDraw yellow')

        this.body.forEach(item => {
            this.drawElement.clearRect(item.x, item.y, this.size, this.size)
            //console.warn(item)
        })
        //console.log('unDraw yellow')
        for (const appel of this.appels) {
            this.drawElement.clearRect(appel.x, appel.y, this.size, this.size)
        }

        return
    }
    private validMove(locToCheck: Locaiton) {
        let valid = true

        for (let i = 1; i < this.body.length; i++) {
            if ((this.body[i].x == locToCheck.x) && (this.body[i].y == locToCheck.y)) {
                valid = false
            }
        }
        return valid;
    }

    private newApple(appelToReplace: Locaiton) {
        let indexToDelete = this.appels.indexOf(appelToReplace);
        if (indexToDelete >= 0) this.appels.splice(indexToDelete, 1);
        let badPlace: Locaiton[] = this.body.concat(this.appels);
        let inValidLocation = false;
        let newAplleLocaiton!: Locaiton;

        //for (let i = 0; i < this.appels.length; i++) {


        do {
            newAplleLocaiton = { x: this.Random(), y: this.Random() }
            //console.log(newAplleLocaiton);
            inValidLocation = false;

            for (const item of badPlace) {
                if ((item.x == newAplleLocaiton.x) && (item.y == newAplleLocaiton.y)) {
                    inValidLocation = true;
                    break;
                }
            }
        } while (inValidLocation);
        this.appels.push(newAplleLocaiton);
        //}
        this.increasePace = true;
    }

    private update() {

        let newHead: Locaiton = { x: this.body[0].x, y: this.body[0].y };

        if (this.nextStep.horizontel) {
            newHead.x += this.nextStep.pace;
        } else if
            (this.nextStep.vertikal) {
            newHead.y += this.nextStep.pace;
        }

        if (this.checkBorder(newHead)) {
            return true;
        }

        this.body.unshift(newHead);
        if (!this.validMove(newHead)) {
            return true;
        }
        let pop = false;
        for (const appel of this.appels) {
            if ((appel.x != newHead.x) || (appel.y != newHead.y)) {
                pop = true
            } else {
                this.newApple(appel);
                this.score++;
                this.needToGrow += this.growOnEat;
                pop = false;
                break;
            }
        }
        if (pop && (this.needToGrow <= 0)) {
            this.body.pop();
        };
        if (this.needToGrow > 0) {
            this.needToGrow--
        }
        return
    }

    private checkBorder(head: Locaiton) {
        if (
            (head.x >= this.canvas.width) ||
            (head.x < 0) ||
            (head.y >= this.canvas.height) ||
            (head.y < 0)
        ) {
            // console.log(head.y, '=======', this.canvas.width, this.canvas.height)
            return true
        }
        return false;
    }

    public gameLogik() {
        this.increasePace = false;
        this.unDraw()

        if (this.update()) {
            this.draw()
            throw new Error(String(this.score))
        }
        this.draw()

        return this.increasePace

    }


    private Random(num = 5, limit = (this.canvas.width)) {
        const random = Math.random() * limit
        const res = Math.round(random / num) * num
        return res;
    }

}
