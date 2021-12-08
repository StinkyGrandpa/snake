export enum Pace {
    up = -5,
    down = 5,
    left = -5,
    right = 5,
}

export interface Movment {
    pace: Pace,
    horizontel: boolean,
    vertikal: boolean
}

export enum validInput {
    w = 'w',
    W = 'W',
    a = 'a',
    A = 'A',
    s = 's',
    S = 'S',
    d = 'd',
    D = 'D'
}

export interface Locaiton {
    x: number;
    y: number;
}
export interface Settings {
    snakeLength: number;
    applesPerGame: number;
    growPerApple: number;
    startSpeed: number;

}