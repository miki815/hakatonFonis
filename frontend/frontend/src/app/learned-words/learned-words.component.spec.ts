import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnedWordsComponent } from './learned-words.component';

describe('LearnedWordsComponent', () => {
  let component: LearnedWordsComponent;
  let fixture: ComponentFixture<LearnedWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnedWordsComponent]
    });
    fixture = TestBed.createComponent(LearnedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
