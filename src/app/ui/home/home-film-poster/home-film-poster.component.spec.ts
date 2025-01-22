import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFilmPosterComponent } from './home-film-poster.component';

describe('HomeFilmPosterComponent', () => {
  let component: HomeFilmPosterComponent;
  let fixture: ComponentFixture<HomeFilmPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFilmPosterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFilmPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
