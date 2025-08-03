import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPropuestaComponent } from './mostrar-propuesta.component';

describe('MostrarPropuestaComponent', () => {
  let component: MostrarPropuestaComponent;
  let fixture: ComponentFixture<MostrarPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarPropuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
