import { CustomerDetailDto } from "./customer-detail-dto";

export interface PolicyDto {
    branchCode: string;
  amount: number;
  startDate: string;
  endDate: string;
  policyNumber: string;
  customerDetailDto: CustomerDetailDto;
  status: string;
}
