import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfoComponent } from './list-info.component';

describe('ListInfoComponent', () => {
  let component: ListInfoComponent;
  let fixture: ComponentFixture<ListInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
