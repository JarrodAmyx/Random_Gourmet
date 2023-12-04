import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipecardListComponent } from './recipecard-list.component';

describe('RecipecardListComponent', () => {
  let component: RecipecardListComponent;
  let fixture: ComponentFixture<RecipecardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipecardListComponent]
    });
    fixture = TestBed.createComponent(RecipecardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
