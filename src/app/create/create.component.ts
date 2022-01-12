import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddTutorial } from '../actions/tutorial.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(private store: Store) {}

  addTutorial(name: string, url: string) {
    this.store.dispatch(new AddTutorial({ name: name, url: url }));
  }

  ngOnInit(): void {}
}
