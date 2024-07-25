import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PolicyDto } from '../../dtos/policy-dto';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.css'
})
export class PolicyListComponent{
  policies: PolicyDto[] = [];
  searchText: string = '';
  searchedPolicy: PolicyDto | null = null;
  statusFilter: string = 'H'; // Default 'all' (Hepsi)
  sortOption: string = 'recent'; // Default sorting option

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.filterPolicies(); // Load policies with default filter and sort options
  }

  searchPolicies(): void {
    if (this.searchText.trim() === '') {
      this.searchedPolicy = null; // Show all policies if search text is empty
    } else {
      this.policyService.searchPolicies(this.searchText.trim()).subscribe(data => {
        console.log("giriyor aslında")
        // this.searchedPolicy = data.length > 0 ? data[0] : null; 
        // Assuming only one policy is returned
        this.searchedPolicy = data;
        // this.policies = []; ilerleyen zamanlar için gerekli olabilir 
        console.log(this.searchedPolicy?.startDate)
      }, error => {
        console.error('Search error:', error);
        this.searchedPolicy = null;
      });
    }
  }

  filterPolicies(): void {
    this.policyService.filterPolicies(this.statusFilter, this.sortOption).subscribe(data => {
      this.policies = data;
    }, error => {
      console.error('Filter error:', error);
    });
  }

  onStatusChange(status: string): void {
    this.statusFilter = status;
    this.filterPolicies();
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.sortOption = value;
      this.filterPolicies();
    }
  }
  showDetails(policy: PolicyDto): void {
    alert(`Müşteri Detayları:\nAdı: ${policy.customerDetailDto.name}\nSoyadı: ${policy.customerDetailDto.surname}\nID: ${policy.customerDetailDto.identificationNumber}`);
  }

}
