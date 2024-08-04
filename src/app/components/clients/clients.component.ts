import { ChangeDetectorRef, Component } from '@angular/core';
import { CustomerDetailDto } from '../../dtos/customer-detail-dto';
import { PolicyDto } from '../../dtos/policy-dto';
import { CustomerService } from '../../services/customer.service';
import { PolicyCustomer } from '../../dtos/policy-customer';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  customers: CustomerDetailDto[] = [];
  selectedCustomerPolicies: PolicyCustomer[] = [];
  selectedCustomer: CustomerDetailDto | null = null;
  isModalOpen: boolean = false;
  searchTerm: string = '';

  constructor(private customerService: CustomerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  searchCustomer(): void {
    if (this.searchTerm.trim() === '') {
      this.loadCustomers(); // Eğer arama terimi boşsa, tüm müşterileri yükle
    } else {
      this.customerService.searchCustomerByIdentificationNumber(this.searchTerm).subscribe(data => {
        this.customers = data;
      });
    }
  }

  viewOffers(customer: CustomerDetailDto): void {
    this.selectedCustomer = customer;
    this.customerService.getCustomerPolicies(customer.id).subscribe(data => {
      this.selectedCustomerPolicies = data;
      this.openModal();
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCustomer = null;
    this.selectedCustomerPolicies = [];
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  isMyPolicy(policy: PolicyCustomer): boolean {
    return policy.myPolicy;
  }
}
