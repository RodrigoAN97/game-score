import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should have add player false', () => {
    expect(fixture.addPlayer).toEqual(false);
  })
})