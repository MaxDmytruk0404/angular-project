import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSliderBest2024Component } from './home-slider-best-2024.component';

describe('HomeSliderBest2024Component', () => {
  let component: HomeSliderBest2024Component;
  let fixture: ComponentFixture<HomeSliderBest2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSliderBest2024Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSliderBest2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
