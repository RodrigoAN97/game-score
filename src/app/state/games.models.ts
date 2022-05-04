export interface IGame {
  player1: string;
  player2: string;
  winner: string;
  id: string;
  date: Date;
}

export class GameStateModel {
  games!: IGame[];
}