import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScenariosComponent } from './select-scenarios.component';

describe('SelectScenariosComponent', () => {
  let component: SelectScenariosComponent;
  let fixture: ComponentFixture<SelectScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
