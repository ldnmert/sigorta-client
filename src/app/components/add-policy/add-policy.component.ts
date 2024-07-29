import { Component } from '@angular/core';
import { PolicyDto } from '../../dtos/policy-dto';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrl: './add-policy.component.css'
})
export class AddPolicyComponent {
  isModalOpen: boolean = false;
  cardNumber: string = '';
  cvv: string = '';
  expiryDate: string = '';
  cardHolder: string = '';
  selectedPolicy: PolicyDto | null = null;

  openPolicyDetailsModal(policy: PolicyDto): void {
    this.selectedPolicy = policy;
    this.isModalOpen = true;
  }
  constructor(private policyService: PolicyService) { }
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
        alert('Poliçe başarıyla eklendi!');
        this.closeModal(); // Close th  e modal after successful submission
      }, error => {
        console.error('Error:', error);
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      });
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }
}
