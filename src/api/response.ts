import { Identity } from "./identity";

export interface Response {
    id: string;
    employee: Identity;
    annualSalary: number;
    superRate: number;
    payPeriodFrom: Date;
    payPeriodTo: Date;
    grossIncome: number;
    incomeTax: number;
    netIncome: number;
    super: number;
    requester: Identity;
    createdAt: Date;
}