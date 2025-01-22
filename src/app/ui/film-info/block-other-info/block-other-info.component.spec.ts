import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockOtherInfoComponent } from './block-other-info.component';

describe('BlockOtherInfoComponent', () => {
  let component: BlockOtherInfoComponent;
  let fixture: ComponentFixture<BlockOtherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockOtherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
