import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsExampleComponent } from './components-example.component';

describe('ComponentsExampleComponent', () => {
  let component: ComponentsExampleComponent;
  let fixture: ComponentFixture<ComponentsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
