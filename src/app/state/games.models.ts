export interface IGame {
  player1: string;
  player2: string;
  winner: string;
  id: string;
  date: any;
}

export class GameStateModel {
  games!: IGame[];
}