import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCarreraComponent } from './usuario-carrera.component';

describe('UsuarioCarreraComponent', () => {
  let component: UsuarioCarreraComponent;
  let fixture: ComponentFixture<UsuarioCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioCarreraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
