import { createSelector } from '@ngxs/store';
import { GameStateModel } from './games.models';
import { GamesState } from './games.state';

export abstract class GamesSelector {
	public static GetGames() {
		return createSelector([GamesState], (state: GameStateModel) => state.games);
	}

}
