import { FirebaseService } from './../services/firebase.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IGame } from './game.models';
import { AddGame, RemoveGame } from './game.actions';

export class GameStateModel {
  games!: IGame[];
}

@State<GameStateModel>({
  name: 'games',
  defaults: {
    games: [],
  },
})

@Injectable()
export class GameState {
  constructor(private firebaseService: FirebaseService) {}

  @Selector()
  static getGames(state: GameStateModel) {
    return state.games;
  }

  @Action(AddGame)
  async add(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: AddGame
  ) {
    await this.firebaseService.addDoc('games', payload);
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
