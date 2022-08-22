import { IGame } from './scores/read/read.component';
import { Pipe, PipeTransform } from '@angular/core';

interface IScore {
  [key:string] : [number, number];
}

@Pipe({
  name: 'score',
  pure: true,
})
export class ScorePipe implements PipeTransform {
  constructor() {}

  transform(games: IGame[] | null) {
    if (!games) return null;

    let scores:IScore = {};
    
    games.forEach(game => {
      const winner = game.players.indexOf(game.winner);
      const match = game.players.toString();
      if(!scores[match]) {
        scores[match] = winner === 0 ? [1, 0] : [0, 1];
      } else {
        const firstPlayerNewScore = winner === 0 ? scores[match][0] + 1 : scores[match][0];
        const secondPlayerNewScore = winner === 1 ? scores[match][1] + 1 : scores[match][1];
        scores[match] = [firstPlayerNewScore, secondPlayerNewScore];
      }
    })

    return scores;
  }
}
