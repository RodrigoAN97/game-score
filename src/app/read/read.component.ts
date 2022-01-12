import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Tutorial } from '../models/tutorials.models';
import { RemoveTutorial } from '../actions/tutorial.actions';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  tutorials$!: Observable<Tutorial[]>;
  constructor(private store: Store) {
    this.tutorials$ = this.store.select((state) => state.tutorials.tutorials);
  }

  deleteTutorial(name: string) {
    this.store.dispatch(new RemoveTutorial(name));
  }

  ngOnInit(): void {}
}
