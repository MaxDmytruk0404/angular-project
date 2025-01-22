import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddToSaveComponent } from './button-add-to-save.component';

describe('ButtonAddToSaveComponent', () => {
  let component: ButtonAddToSaveComponent;
  let fixture: ComponentFixture<ButtonAddToSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddToSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddToSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
