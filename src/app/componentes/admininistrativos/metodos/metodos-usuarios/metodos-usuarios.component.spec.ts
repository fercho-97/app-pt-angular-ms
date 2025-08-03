import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosUsuariosComponent } from './metodos-usuarios.component';

describe('MetodosUsuariosComponent', () => {
  let component: MetodosUsuariosComponent;
  let fixture: ComponentFixture<MetodosUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetodosUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
