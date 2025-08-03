import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPropuestasComponent } from './metodos-propuestas.component';

describe('MetodosPropuestasComponent', () => {
  let component: MetodosPropuestasComponent;
  let fixture: ComponentFixture<MetodosPropuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetodosPropuestasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetodosPropuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
