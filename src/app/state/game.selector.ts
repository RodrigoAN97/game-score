import { createSelector } from '@ngxs/store';
import { GameStateModel } from './game.models';
import { GameState } from './game.state';

export abstract class FileSystemSelectors {
	public static GetGames() {
		return createSelector([GameState], (state: GameStateModel) => state.games);
	}

}
