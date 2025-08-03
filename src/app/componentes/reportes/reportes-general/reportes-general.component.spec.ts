import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesGeneralComponent } from './reportes-general.component';

describe('ReportesGeneralComponent', () => {
  let component: ReportesGeneralComponent;
  let fixture: ComponentFixture<ReportesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
