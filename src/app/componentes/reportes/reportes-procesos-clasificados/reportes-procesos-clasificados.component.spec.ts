import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesProcesosClasificadosComponent } from './reportes-procesos-clasificados.component';

describe('ReportesProcesosClasificadosComponent', () => {
  let component: ReportesProcesosClasificadosComponent;
  let fixture: ComponentFixture<ReportesProcesosClasificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesProcesosClasificadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesProcesosClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
