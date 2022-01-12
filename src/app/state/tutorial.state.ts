import { RemoveTutorial } from './../actions/tutorial.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddTutorial } from '../actions/tutorial.actions';
import { IGame } from '../models/game.models';

export class TutorialStateModel {
  tutorials!: IGame[];
}

@State<TutorialStateModel>({
  name: 'tutorials',
  defaults: {
    tutorials: [],
  },
})
export class TutorialState {
  @Selector()
  static getTutorials(state: TutorialStateModel) {
    return state.tutorials;
  }

  @Action(AddTutorial)
  add(
    { getState, patchState }: StateContext<TutorialStateModel>,
    { payload }: AddTutorial
  ) {
    const state = getState();
    patchState({ tutorials: [...state.tutorials, payload] });
  }

  @Action(RemoveTutorial)
  remove(
    { getState, patchState }: StateContext<TutorialStateModel>,
    { payload }: RemoveTutorial
  ) {
    patchState({
      tutorials: getState().tutorials.filter(
        (tutorial) => tutorial.name !== payload
      ),
    });
  }
}
