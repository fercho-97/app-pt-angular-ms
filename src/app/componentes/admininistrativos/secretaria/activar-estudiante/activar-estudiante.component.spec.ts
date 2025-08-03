import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarEstudianteComponent } from './activar-estudiante.component';

describe('ActivarEstudianteComponent', () => {
  let component: ActivarEstudianteComponent;
  let fixture: ComponentFixture<ActivarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivarEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
