import { TestBed } from '@angular/core/testing';
import { AchievementPage } from './achievement';
import { IonicModule } from 'ionic-angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockNavController = {
  push: jest.fn()
};

describe('AchievementPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AchievementPage],
      imports: [IonicModule.forRoot(AchievementPage)],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  test('example', () => {
    expect(1 + 2).toBe(3);
  });
});
