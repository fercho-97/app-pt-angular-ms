import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesProcesosTerminadosComponent } from './reportes-procesos-terminados.component';

describe('ReportesProcesosTerminadosComponent', () => {
  let component: ReportesProcesosTerminadosComponent;
  let fixture: ComponentFixture<ReportesProcesosTerminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesProcesosTerminadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesProcesosTerminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
