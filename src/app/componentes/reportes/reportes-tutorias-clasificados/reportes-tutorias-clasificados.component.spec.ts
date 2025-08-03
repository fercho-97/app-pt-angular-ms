import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTutoriasClasificadosComponent } from './reportes-tutorias-clasificados.component';

describe('ReportesTutoriasClasificadosComponent', () => {
  let component: ReportesTutoriasClasificadosComponent;
  let fixture: ComponentFixture<ReportesTutoriasClasificadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesTutoriasClasificadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesTutoriasClasificadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
