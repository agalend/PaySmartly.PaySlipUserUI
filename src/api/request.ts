import { Identity } from "./identity"

export interface Request {
    employee: Identity;
    annualSalary: number;
    superRate: number;
    payPeriodFrom: Date;
    payPeriodTo: Date;
    roundTo: number;
    months: number;
    requester: Identity;
}

export class PaySlipRequest implements Request {
    constructor(
        public employeeFirstName: string,
        public employeeLastName: string,
        public annualSalary: number,
        public superRate: number,
        public month: number,
        public year: number,
    ) { }

    private static empty: PaySlipRequest;
    public static emptyRequest(): PaySlipRequest {
        return PaySlipRequest.empty ?? (PaySlipRequest.empty = new PaySlipRequest("", "", 0, 0, 0, 0));
    }

    public get employee(): Identity {
        return {
            firstName: this.employeeFirstName,
            lastName: this.employeeLastName,
        };
    }

    public get requester(): Identity {
        return {
            firstName: "Unknown", // should be provided by an auth provider, such as auth0
            lastName: "Unknown", // should be provided by an auth provider, such as auth0
        };
    }

    public get payPeriodFrom(): Date {
        return new Date(this.year, this.month - 1, 1);
    }

    public get payPeriodTo(): Date {
        const monthDays = this.daysInMonth(this.year, this.month);
        return new Date(this.year, this.month - 1, monthDays);
    }

    public get roundTo(): number { return 2; }
    public get months(): number { return 12; }

    private daysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }
}