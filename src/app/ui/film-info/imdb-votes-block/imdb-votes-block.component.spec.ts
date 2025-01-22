import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImdbVotesBlockComponent } from './imdb-votes-block.component';

describe('ImdbVotesBlockComponent', () => {
  let component: ImdbVotesBlockComponent;
  let fixture: ComponentFixture<ImdbVotesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImdbVotesBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImdbVotesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
