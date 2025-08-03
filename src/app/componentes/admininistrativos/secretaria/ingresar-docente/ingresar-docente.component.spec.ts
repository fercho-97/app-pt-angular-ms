import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDocenteComponent } from './ingresar-docente.component';

describe('IngresarDocenteComponent', () => {
  let component: IngresarDocenteComponent;
  let fixture: ComponentFixture<IngresarDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresarDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
