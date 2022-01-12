import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddGame, RemoveGame } from '../actions/game.actions';
import { IGame } from '../models/game.models';

export class GameStateModel {
  games!: IGame[];
}

@State<GameStateModel>({
  name: 'games',
  defaults: {
    games: [],
  },
})
export class TutorialState {
  @Selector()
  static getGames(state: GameStateModel) {
    return state.games;
  }

  @Action(AddGame)
  add(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: AddGame
  ) {
    const state = getState();
    patchState({ games: [...state.games, payload] });
  }

  @Action(RemoveGame)
  remove(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: RemoveGame
  ) {
    patchState({
      games: getState().games.filter((game) => game.id !== payload),
    });
  }
}
