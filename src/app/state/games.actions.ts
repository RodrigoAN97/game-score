import { IGame } from "../state/games.models";

export class GetGames {
  static readonly type = 'GET_GAMES';
  constructor() {}
}

export class AddGame {
  static readonly type = 'ADD_GAME';
  constructor(public payload: IGame) {}
}

export class RemoveGame {
  static readonly type = 'REMOVE_GAME';
  constructor(public payload: string) {}
}
