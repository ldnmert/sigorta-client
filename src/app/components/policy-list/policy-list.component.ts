import { Component } from '@angular/core';
import { PolicyDto } from '../../dtos/policy-dto';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent {
  policies: PolicyDto[] = [];
  searchText: string = '';
  searchedPolicy: PolicyDto | null = null;
  statusFilter: string = 'H'; // Default 'all' (Hepsi)
  sortOption: string = 'recent'; // Default sorting option
  isModalOpen: boolean = false;
  cardNumber: string = '';
  cvv: string = '';
  expiryDate: string = '';
  cardHolder: string = '';
  selectedPolicy: PolicyDto | null = null;

  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.filterPolicies(); 
  }

  searchPolicies(): void {
    if (this.searchText.trim() === '') {
      this.searchedPolicy = null;
    } else {
      this.policyService.searchPolicies(this.searchText.trim()).subscribe(data => {
        this.searchedPolicy = data;
      }, error => {
        console.error('Search error:', error);
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

  openPolicyDetailsModal(policy: PolicyDto): void {
    this.selectedPolicy = policy;
    this.isModalOpen = true;

  }

  closeModal(): void {
    this.isModalOpen = false;
    this.cardNumber = '';
    this.cvv = '';
    this.expiryDate = '';
    this.cardHolder = '';
  }

  submitPolicyDetails(): void {
    if (this.selectedPolicy && this.cardNumber && this.cvv && this.expiryDate && this.cardHolder) {
      const payload = {
        cardNumber: this.cardNumber,
        cvv: this.cvv,
        expiryDate: this.expiryDate,
        cardHolder: this.cardHolder
      };

      this.policyService.enablePolicy(this.selectedPolicy.policyNumber, payload).subscribe(response => {
        this.closeModal();
      }, error => {
        console.error('Error:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      });
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }
}
