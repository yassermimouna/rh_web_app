import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreateComponent } from './application-create.component';

describe('ApplicationCreateComponent', () => {
  let component: ApplicationCreateComponent;
  let fixture: ComponentFixture<ApplicationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
