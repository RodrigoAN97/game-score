import { IGame } from "../models/game.models";

export class AddTutorial {
  static readonly type = '[TUTORIAL] Add';
  constructor(public payload: IGame) {}
}

export class RemoveTutorial {
  static readonly type = '[TUTORIAL] Remove';
  constructor(public payload: string) {}
}
