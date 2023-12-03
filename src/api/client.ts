import { Request } from "./request";
import { Response } from "./response";
import axios, { AxiosInstance } from 'axios';

export interface ApiClient {
    create(request: Request): Promise<Response>;
    get(id: string): Promise<Response>;
    delete(pattern: string): Promise<boolean>;

    getAllForEmployee(firstName: string, lastName: string, limit: number, offset: number): Promise<Array<Response>>;
    getAllForAnnualSalary(from: number, to: number, limit: number, offset: number): Promise<Array<Response>>;
    getAllForSuperRate(from: number, to: number, limit: number, offset: number): Promise<Array<Response>>;
}

export class RestApiClient implements ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, requestTimeout: number) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: requestTimeout
        });
    }

    public async create(request: Request): Promise<Response> {
        const url = "calculations/pay-slips";
        const data = this.convertToData(request);
        const response = await this.axiosInstance.post<Response>(url, data);
        return this.convertToResponse(response.data);
    }

    public async get(id: string): Promise<Response> {
        const url = `archive/pay-slips/${id}`;
        const response = await this.axiosInstance.get<Response>(url);
        return this.convertToResponse(response.data);
    }

    public async delete(url: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<void>(url);
        return response.status === 204;
    }

    public async getAllForEmployee(firstName: string, lastName: string, limit: number, offset: number): Promise<Array<Response>> {
        const url = `archive/pay-slips/employee`;
        const response = await this.axiosInstance.get<Array<Response>>(url, {
            params: { firstName, lastName, limit, offset }
        });
        return response.data.map((data) => this.convertToResponse(data));
    }

    public async getAllForAnnualSalary(from: number, to: number, limit: number, offset: number): Promise<Array<Response>> {
        const url = `archive/pay-slips/annual-salary`;
        const response = await this.axiosInstance.get<Array<Response>>(url, {
            params: { from, to, limit, offset }
        });
        return response.data.map((data) => this.convertToResponse(data));
    }

    public async getAllForSuperRate(from: number, to: number, limit: number, offset: number): Promise<Array<Response>> {
        const url = `archive/pay-slips/super-rate`;
        const response = await this.axiosInstance.get<Array<Response>>(url, {
            params: { from, to, limit, offset }
        });
        return response.data.map((data) => this.convertToResponse(data));
    }

    private convertToData(request: Request): any {
        const data: Request = {
            employee: { firstName: request.employee.firstName, lastName: request.employee.lastName },
            annualSalary: request.annualSalary,
            superRate: request.superRate,
            payPeriodFrom: request.payPeriodFrom,
            payPeriodTo: request.payPeriodTo,
            roundTo: request.roundTo,
            months: request.months,
            requester: { firstName: request.requester.firstName, lastName: request.requester.lastName },
        };
        return data;
    }

    private convertToResponse(data: any): Response {
        const response: Response = {
            id: data.id,
            employee: { firstName: data.employee.firstName, lastName: data.employee.lastName },
            annualSalary: Number(data.annualSalary),
            superRate: Number(data.superRate),
            payPeriodFrom: new Date(data.payPeriodFrom),
            payPeriodTo: new Date(data.payPeriodTo),
            grossIncome: Number(data.grossIncome),
            incomeTax: Number(data.incomeTax),
            netIncome: Number(data.netIncome),
            super: Number(data.super),
            createdAt: new Date(data.createdAt),
            requester: { firstName: data.requester.firstName, lastName: data.requester.lastName },
        };
        return response;
    }
}

export default new RestApiClient("http://localhost:9080/api/", 5000); // base url and timeout should become env vars