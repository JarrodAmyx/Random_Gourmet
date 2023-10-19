import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipecardsComponent } from './recipecards.component';

describe('RecipecardsComponent', () => {
  let component: RecipecardsComponent;
  let fixture: ComponentFixture<RecipecardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipecardsComponent]
    });
    fixture = TestBed.createComponent(RecipecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
