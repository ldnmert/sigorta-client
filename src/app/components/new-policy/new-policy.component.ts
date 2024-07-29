import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { PolicyService } from '../../services/policy.service';
import { VehicleService } from '../../services/vehicle.service';
import { PolicyDto } from '../../dtos/policy-dto';

@Component({
  selector: 'app-new-policy',
  templateUrl: './new-policy.component.html',
  styleUrls: ['./new-policy.component.css']
})
export class NewPolicyComponent implements OnInit {
  customerForm: FormGroup;
  policyForm: FormGroup;
  vehicleForm: FormGroup;
  customer: any = null;
  showVehicleForm: boolean = false;
  years: string[] = [];
  makes: string[] = [];
  models: string[] = [];
  showDetails: boolean = false;

  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private policyService: PolicyService,
    private vehicleService: VehicleService
  ) {
    this.customerForm = this.fb.group({
      identificationNumber: ['', [Validators.required, Validators.maxLength(11)]],
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      city: [''],
      district: ['']
    });

    this.policyForm = this.fb.group({
      policyType: ['', Validators.required]
    });

    this.vehicleForm = this.fb.group({
      year: ['', Validators.required],
      make: ['', Validators.required],
      model: ['', Validators.required],
      vehicleCode: [''],
      amount: [''],
      plateCityCode: [''],
      plateCode: [''],
      engineNumber: [''],
      chassisNumber: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.vehicleService.getYears().subscribe(
      (data) => {
        this.years = data;
      },
      (error) => {
        console.error('Error fetching years:', error);
      }
    );

    this.vehicleService.getMakes().subscribe(
      (data) => {
        this.makes = data;
      },
      (error) => {
        console.error('Error fetching makes:', error);
      }
    );
  }

  onMakeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const make = selectElement.value;

    this.vehicleService.getModels(make).subscribe(
      (data) => {
        this.models = data;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  fetchCustomerData(event: Event): void {
    const input = event.target as HTMLInputElement;
    const identificationNumber = input.value;

    if (identificationNumber.length === 11) {
      this.customerService.getCustomerByIdentificationNumber(identificationNumber).subscribe(
        (response) => {
          if (response) {
            this.customer = response;
            this.customerForm.patchValue(response);
          } else {
            this.customer = null;
            this.customerForm.reset();
          }
        },
        (error) => {
          console.error('Error fetching customer data:', error);
        }
      );
    }
  }

  proceedToVehicleForm(): void {
    if (this.customerForm.valid && this.policyForm.valid) {
      const customerData = this.customerForm.value;

      if (this.customer) {
        // Mevcut müşteri bilgilerini kullanarak araca geç
        this.showVehicleForm = true;
      } else {
        // Yeni müşteri oluşturma
        this.customerService.createCustomer(customerData).subscribe(
          (response) => {
            this.customer = response;
            this.showVehicleForm = true;
          },
          (error) => {
            console.error('Error creating or fetching customer:', error);
          }
        );
      }
    }
  }

  onFormSubmit(): void {
    const { year, make, model } = this.vehicleForm.value;
    this.vehicleService.getVehicleCode(year, make, model).subscribe(
      (data) => {
        this.vehicleForm.patchValue({
          vehicleCode: data.vehicleCode,
          amount: data.amount
        });
        this.showDetails = true;
      },
      (error) => {
        console.error('Error fetching vehicle details:', error);
      }
    );
  }

  submitOffer(): void {
    const offerData = {
      plateCityCode: this.vehicleForm.get('plateCityCode')?.value ?? '',
      plateCode: this.vehicleForm.get('plateCode')?.value ?? '',
      engineNumber: this.vehicleForm.get('engineNumber')?.value ?? '',
      chassisNumber: this.vehicleForm.get('chassisNumber')?.value ?? ''
    };

    const vehicleCode = this.vehicleForm.get('vehicleCode')?.value ?? '';
    const customerId = this.customer ? this.customer.id : null;

    this.vehicleService.submitOffer(vehicleCode, customerId, offerData).subscribe(
      (response: PolicyDto) => {
        console.log('Offer submitted successfully:', response);
        this.closeModal();
      },
      (error) => {
        console.error('Error submitting offer:', error);
      }
    );
  }

  closeModal(): void {
    this.close.emit();
    this.customerForm.reset();
    this.policyForm.reset();
    this.vehicleForm.reset();
    this.showVehicleForm = false;
  }
}
