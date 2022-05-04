import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { addDoc, collection } from 'firebase/firestore';
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

@Injectable()
export class GameState {
  constructor(private firestore: Firestore) {}

  @Selector()
  static getGames(state: GameStateModel) {
    return state.games;
  }

  @Action(AddGame)
  async add(
    { getState, patchState }: StateContext<GameStateModel>,
    { payload }: AddGame
  ) {
    await addDoc(collection(this.firestore, "games"), payload);
    console.log(payload);
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
