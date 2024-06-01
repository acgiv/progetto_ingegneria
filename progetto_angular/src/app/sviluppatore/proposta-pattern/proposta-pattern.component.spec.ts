import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaPatternComponent } from './proposta-pattern.component';

describe('PropostaPatternComponent', () => {
  let component: PropostaPatternComponent;
  let fixture: ComponentFixture<PropostaPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropostaPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropostaPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
