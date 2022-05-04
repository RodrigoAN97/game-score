import { FirebaseService } from './../services/firebase.service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { GameStateModel } from './game.models';
import { AddGame, RemoveGame } from './game.actions';

@State<GameStateModel>({
  name: 'games',
  defaults: {
    games: [],
  },
})

@Injectable()
export class GameState {
  constructor(private firebaseService: FirebaseService) {}

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
