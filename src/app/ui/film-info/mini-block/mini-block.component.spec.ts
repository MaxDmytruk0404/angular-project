import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniBlockComponent } from './mini-block.component';

describe('MiniBlockComponent', () => {
  let component: MiniBlockComponent;
  let fixture: ComponentFixture<MiniBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiniBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
