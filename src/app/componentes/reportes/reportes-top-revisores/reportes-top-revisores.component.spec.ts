import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTopRevisoresComponent } from './reportes-top-revisores.component';

describe('ReportesTopRevisoresComponent', () => {
  let component: ReportesTopRevisoresComponent;
  let fixture: ComponentFixture<ReportesTopRevisoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesTopRevisoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesTopRevisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
