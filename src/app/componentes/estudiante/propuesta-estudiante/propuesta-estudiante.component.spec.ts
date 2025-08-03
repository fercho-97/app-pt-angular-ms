import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestaEstudianteComponent } from './propuesta-estudiante.component';

describe('PropuestaEstudianteComponent', () => {
  let component: PropuestaEstudianteComponent;
  let fixture: ComponentFixture<PropuestaEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropuestaEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
