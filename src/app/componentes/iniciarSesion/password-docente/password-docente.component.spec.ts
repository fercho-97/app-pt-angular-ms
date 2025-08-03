import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordDocenteComponent } from './password-docente.component';

describe('PasswordDocenteComponent', () => {
  let component: PasswordDocenteComponent;
  let fixture: ComponentFixture<PasswordDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordDocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
