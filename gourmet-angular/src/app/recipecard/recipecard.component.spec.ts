import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipecardComponent } from './recipecard.component';

describe('RecipecardComponent', () => {
  let component: RecipecardComponent;
  let fixture: ComponentFixture<RecipecardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipecardComponent]
    });
    fixture = TestBed.createComponent(RecipecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
