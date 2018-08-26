import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshelfComponent } from './bookshelf.component';

describe('BookshelfComponent', () => {
  let component: BookshelfComponent;
  let fixture: ComponentFixture<BookshelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookshelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
