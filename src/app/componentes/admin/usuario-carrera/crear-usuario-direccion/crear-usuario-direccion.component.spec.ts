import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioDireccionComponent } from './crear-usuario-direccion.component';

describe('CrearUsuarioDireccionComponent', () => {
  let component: CrearUsuarioDireccionComponent;
  let fixture: ComponentFixture<CrearUsuarioDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearUsuarioDireccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuarioDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
