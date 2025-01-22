import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmBlockComponent } from './film-block.component';

describe('FilmBlockComponent', () => {
  let component: FilmBlockComponent;
  let fixture: ComponentFixture<FilmBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
