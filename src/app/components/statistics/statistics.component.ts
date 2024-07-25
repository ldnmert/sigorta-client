import { Component } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { PolicyDto } from '../../dtos/policy-dto';
import { Console } from 'console';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  
  statusKRatio: number | undefined;
top3ExpensivePolicies: PolicyDto[] = [];

constructor(private policyService: PolicyService) { }

ngOnInit(): void {
  this.loadStatistics();
}

loadStatistics(): void {
  this.policyService.getStatusKRatio().subscribe({
    next: (ratio) => {
      console.log('Ratio:', ratio);
      this.statusKRatio = ratio;
    },
    error: (error) => {
      console.error('Ratio loading error:', error);
    }
  });

  this.policyService.getTop3ExpensivePolicies().subscribe({
    next: (policies) => {
      this.top3ExpensivePolicies = policies;
    },
    error: (error) => {
      console.error('Top 3 policies loading error:', error);
    }
  });
}
}
