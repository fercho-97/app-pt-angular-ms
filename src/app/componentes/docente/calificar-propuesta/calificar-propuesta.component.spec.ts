import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarPropuestaComponent } from './calificar-propuesta.component';

describe('CalificarPropuestaComponent', () => {
  let component: CalificarPropuestaComponent;
  let fixture: ComponentFixture<CalificarPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificarPropuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
