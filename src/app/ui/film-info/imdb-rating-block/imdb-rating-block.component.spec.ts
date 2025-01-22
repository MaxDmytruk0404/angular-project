import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMDBRatingBlockComponent } from './imdb-rating-block.component';

describe('IMDBRatingBlockComponent', () => {
  let component: IMDBRatingBlockComponent;
  let fixture: ComponentFixture<IMDBRatingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IMDBRatingBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IMDBRatingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
