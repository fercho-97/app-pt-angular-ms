import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCoordinadorComponent } from './asignar-coordinador.component';

describe('AsignarCoordinadorComponent', () => {
  let component: AsignarCoordinadorComponent;
  let fixture: ComponentFixture<AsignarCoordinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarCoordinadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
