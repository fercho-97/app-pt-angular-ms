import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPropuestaPorAsignarComponent } from './listar-propuesta-por-asignar.component';

describe('ListarPropuestaPorAsignarComponent', () => {
  let component: ListarPropuestaPorAsignarComponent;
  let fixture: ComponentFixture<ListarPropuestaPorAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPropuestaPorAsignarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPropuestaPorAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
