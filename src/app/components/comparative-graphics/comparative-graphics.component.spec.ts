import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeGraphicsComponent } from './comparative-graphics.component';

describe('ComparativeGraphicsComponent', () => {
  let component: ComparativeGraphicsComponent;
  let fixture: ComponentFixture<ComparativeGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeGraphicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
