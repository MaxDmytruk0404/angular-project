import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddListComponent } from './button-add-list.component';

describe('ButtonAddListComponent', () => {
  let component: ButtonAddListComponent;
  let fixture: ComponentFixture<ButtonAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAddListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
