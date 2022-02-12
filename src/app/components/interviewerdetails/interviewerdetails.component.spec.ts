import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerdetailsComponent } from './interviewerdetails.component';

describe('InterviewerdetailsComponent', () => {
  let component: InterviewerdetailsComponent;
  let fixture: ComponentFixture<InterviewerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
