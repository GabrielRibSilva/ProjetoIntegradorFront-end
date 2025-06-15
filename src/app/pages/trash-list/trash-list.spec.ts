import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashList } from './trash-list';

describe('TrashList', () => {
  let component: TrashList;
  let fixture: ComponentFixture<TrashList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
