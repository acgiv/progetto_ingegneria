import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaArticoloComponent } from './proposta-articolo.component';

describe('PropostaArticoloComponent', () => {
  let component: PropostaArticoloComponent;
  let fixture: ComponentFixture<PropostaArticoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropostaArticoloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropostaArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
