import { FirebaseService } from './../services/firebase.service';
import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddGame, RemoveGame, GetGames } from './games.actions';
import { GameStateModel } from './games.models';

@State<GameStateModel>({
  name: 'games',
  defaults: {
    games: [],
  },
})

@Injectable()
export class GamesState {
  constructor(private firebaseService: FirebaseService) {}

  @Action(AddGame)
  async AddGame(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: AddGame
  ) {
    await this.firebaseService.addDocument('games', payload);
    const state = getState();
    patchState({ games: [...state.games, payload] });
  }

  @Action(RemoveGame)
  RemoveGame(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: RemoveGame
  ) {
    patchState({
      games: getState().games.filter((game) => game.id !== payload),
    });
  }

  @Action(GetGames)
  async GetGames({ patchState }: StateContext<GameStateModel>) {
    const games = await this.firebaseService.getCollection('games');
    patchState({games});
  }
}
