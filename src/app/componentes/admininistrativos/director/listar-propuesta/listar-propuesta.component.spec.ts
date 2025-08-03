import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPropuestaComponent } from './listar-propuesta.component';

describe('ListarPropuestaComponent', () => {
  let component: ListarPropuestaComponent;
  let fixture: ComponentFixture<ListarPropuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPropuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPropuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
