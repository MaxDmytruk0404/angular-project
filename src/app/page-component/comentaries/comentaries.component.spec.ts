import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariesComponent } from './comentaries.component';

describe('ComentariesComponent', () => {
  let component: ComentariesComponent;
  let fixture: ComponentFixture<ComentariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
