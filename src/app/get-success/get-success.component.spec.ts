import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSuccessComponent } from './get-success.component';

describe('GetSuccessComponent', () => {
  let component: GetSuccessComponent;
  let fixture: ComponentFixture<GetSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
