import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompetitionWindowComponent } from './list-competition-window.component';

describe('ListCompetitionWindowComponent', () => {
  let component: ListCompetitionWindowComponent;
  let fixture: ComponentFixture<ListCompetitionWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompetitionWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompetitionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
