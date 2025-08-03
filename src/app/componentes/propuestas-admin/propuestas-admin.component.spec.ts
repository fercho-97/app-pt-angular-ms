import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasAdminComponent } from './propuestas-admin.component';

describe('PropuestasAdminComponent', () => {
  let component: PropuestasAdminComponent;
  let fixture: ComponentFixture<PropuestasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropuestasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
