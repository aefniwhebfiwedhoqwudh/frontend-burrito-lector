import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLector } from './dashboard-lector';

describe('DashboardLector', () => {
  let component: DashboardLector;
  let fixture: ComponentFixture<DashboardLector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardLector],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
