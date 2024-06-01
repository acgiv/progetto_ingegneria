import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovaComponent } from './approva.component';

describe('ApprovaComponent', () => {
  let component: ApprovaComponent;
  let fixture: ComponentFixture<ApprovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
