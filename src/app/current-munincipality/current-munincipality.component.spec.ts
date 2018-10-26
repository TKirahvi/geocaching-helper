import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMunincipalityComponent } from './current-munincipality.component';

describe('CurrentMunincipalityComponent', () => {
  let component: CurrentMunincipalityComponent;
  let fixture: ComponentFixture<CurrentMunincipalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMunincipalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMunincipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
