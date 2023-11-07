import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryComponent } from './pantry.component';

describe('PantryComponent', () => {
  let component: PantryComponent;
  let fixture: ComponentFixture<PantryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantryComponent]
    });
    fixture = TestBed.createComponent(PantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
