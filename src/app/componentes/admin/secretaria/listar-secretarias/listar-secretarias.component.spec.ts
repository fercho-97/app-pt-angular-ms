import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSecretariasComponent } from './listar-secretarias.component';

describe('ListarSecretariasComponent', () => {
  let component: ListarSecretariasComponent;
  let fixture: ComponentFixture<ListarSecretariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarSecretariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarSecretariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
