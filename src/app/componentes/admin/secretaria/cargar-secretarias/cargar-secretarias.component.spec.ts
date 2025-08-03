import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarSecretariasComponent } from './cargar-secretarias.component';

describe('CargarSecretariasComponent', () => {
  let component: CargarSecretariasComponent;
  let fixture: ComponentFixture<CargarSecretariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargarSecretariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarSecretariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
