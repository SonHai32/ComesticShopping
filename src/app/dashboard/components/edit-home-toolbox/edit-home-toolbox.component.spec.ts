import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHomeToolboxComponent } from './edit-home-toolbox.component';

describe('EditHomeToolboxComponent', () => {
  let component: EditHomeToolboxComponent;
  let fixture: ComponentFixture<EditHomeToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHomeToolboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
