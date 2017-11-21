import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingActivitiesComponent } from './sharing-activities.component';

describe('SharingActivitiesComponent', () => {
  let component: SharingActivitiesComponent;
  let fixture: ComponentFixture<SharingActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
