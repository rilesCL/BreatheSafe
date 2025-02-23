import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirQualityDisplayComponent } from './air-quality-display.component';

describe('AirQualityDisplayComponent', () => {
  let component: AirQualityDisplayComponent;
  let fixture: ComponentFixture<AirQualityDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirQualityDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirQualityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
