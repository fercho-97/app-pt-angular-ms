import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasDeTutoresComponent } from './propuestas-de-tutores.component';

describe('PropuestasDeTutoresComponent', () => {
  let component: PropuestasDeTutoresComponent;
  let fixture: ComponentFixture<PropuestasDeTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropuestasDeTutoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestasDeTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
