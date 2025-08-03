import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoProcesoComponent } from './seguimiento-proceso.component';

describe('SeguimientoProcesoComponent', () => {
  let component: SeguimientoProcesoComponent;
  let fixture: ComponentFixture<SeguimientoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeguimientoProcesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
