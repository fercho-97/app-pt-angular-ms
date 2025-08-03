import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRevisionesComponent } from './listar-revisiones.component';

describe('ListarRevisionesComponent', () => {
  let component: ListarRevisionesComponent;
  let fixture: ComponentFixture<ListarRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarRevisionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
