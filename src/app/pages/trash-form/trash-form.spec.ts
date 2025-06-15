import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashForm } from './trash-form';

describe('TrashForm', () => {
  let component: TrashForm;
  let fixture: ComponentFixture<TrashForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrashForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
