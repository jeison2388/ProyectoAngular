import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProgrammingComponent } from './form-programming.component';

describe('FormProgrammingComponent', () => {
  let component: FormProgrammingComponent;
  let fixture: ComponentFixture<FormProgrammingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProgrammingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
