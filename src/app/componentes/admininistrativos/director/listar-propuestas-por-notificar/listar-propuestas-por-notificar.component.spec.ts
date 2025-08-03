import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPropuestasPorNotificarComponent } from './listar-propuestas-por-notificar.component';

describe('ListarPropuestasPorNotificarComponent', () => {
  let component: ListarPropuestasPorNotificarComponent;
  let fixture: ComponentFixture<ListarPropuestasPorNotificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPropuestasPorNotificarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPropuestasPorNotificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
