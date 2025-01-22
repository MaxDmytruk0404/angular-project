import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderRecomendComponent } from './home-slider-recomend.component';

describe('HomeSliderRecomendComponent', () => {
  let component: HomeSliderRecomendComponent;
  let fixture: ComponentFixture<HomeSliderRecomendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderRecomendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSliderRecomendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
