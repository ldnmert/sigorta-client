import { Component } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { PolicyDto } from '../../dtos/policy-dto';

@Component({
  selector: 'app-deadline-policies',
  templateUrl: './deadline-policies.component.html',
  styleUrl: './deadline-policies.component.css'
})
export class DeadlinePoliciesComponent {

  expiringPolicies: PolicyDto[] = [];

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.loadExpiringPolicies();
  }

  loadExpiringPolicies(): void {
    this.policyService.getExpiringPolicies().subscribe(data => {
      this.expiringPolicies = data;
    }, error => {
      console.error('Error fetching expiring policies:', error);
    });
  }

  showDetails(policy: PolicyDto): void {
    alert(`Müşteri Detayları:\nAdı: ${policy.customerDetailDto.name}\nSoyadı: ${policy.customerDetailDto.surname}\nID: ${policy.customerDetailDto.identificationNumber}`);
  }


}
