import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosAsignarRevisoresComponent } from './metodos-asignar-revisores.component';

describe('MetodosAsignarRevisoresComponent', () => {
  let component: MetodosAsignarRevisoresComponent;
  let fixture: ComponentFixture<MetodosAsignarRevisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetodosAsignarRevisoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosAsignarRevisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
