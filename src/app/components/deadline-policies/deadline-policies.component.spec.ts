import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlinePoliciesComponent } from './deadline-policies.component';

describe('DeadlinePoliciesComponent', () => {
  let component: DeadlinePoliciesComponent;
  let fixture: ComponentFixture<DeadlinePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeadlinePoliciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeadlinePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
