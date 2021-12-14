import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderSettingsComponent } from './border-settings.component';

describe('BorderSettingsComponent', () => {
  let component: BorderSettingsComponent;
  let fixture: ComponentFixture<BorderSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
