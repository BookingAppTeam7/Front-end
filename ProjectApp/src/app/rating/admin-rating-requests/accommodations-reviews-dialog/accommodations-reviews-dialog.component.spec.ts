import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsReviewsDialogComponent } from './accommodations-reviews-dialog.component';

describe('AccommodationsReviewsDialogComponent', () => {
  let component: AccommodationsReviewsDialogComponent;
  let fixture: ComponentFixture<AccommodationsReviewsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationsReviewsDialogComponent]
    });
    fixture = TestBed.createComponent(AccommodationsReviewsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
