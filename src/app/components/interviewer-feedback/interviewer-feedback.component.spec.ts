import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerFeedbackComponent } from './interviewer-feedback.component';

describe('InterviewerFeedbackComponent', () => {
  let component: InterviewerFeedbackComponent;
  let fixture: ComponentFixture<InterviewerFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewerFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
