import { IGame } from '../models/game.models';
const ADD_GAME = 'ADD_GAME';
const REMOVE_GAME = 'REMOVE_GAME';
export class AddGame {
  static readonly type = ADD_GAME;
  constructor(public payload: IGame) {}
}

export class RemoveGame {
  static readonly type = REMOVE_GAME;
  constructor(public payload: string) {}
}
