import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificarPropuestaComponent } from './notificar-propuesta.component';

describe('NotificarPropuestaComponent', () => {
  let component: NotificarPropuestaComponent;
  let fixture: ComponentFixture<NotificarPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificarPropuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
