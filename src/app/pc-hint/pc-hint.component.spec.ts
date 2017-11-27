import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcHintComponent } from './pc-hint.component';

describe('PcHintComponent', () => {
  let component: PcHintComponent;
  let fixture: ComponentFixture<PcHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
