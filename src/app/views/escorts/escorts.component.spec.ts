import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscortsComponent } from './escorts.component';

describe('EscortsComponent', () => {
  let component: EscortsComponent;
  let fixture: ComponentFixture<EscortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
