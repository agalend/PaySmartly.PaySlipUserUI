import { Request } from "./request";
import Response from "./response";
import axios, { AxiosInstance } from 'axios';

export interface ApiClient {
    create(request: Request): Promise<Response>;
    get(id: string): Promise<Response>;
    delete(id: string): Promise<boolean>;

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
        const pattern = "calculations/pay-slips";
        const response = await this.axiosInstance.post<Response>(pattern, request);
        return response.data;
    }

    public async get(id: string): Promise<Response> {
        const pattern = `archive/pay-slips/${id}`;
        const response = await this.axiosInstance.get<Response>(pattern);
        return response.data;
    }
    public async delete(id: string): Promise<boolean> {
        const pattern = `archive/pay-slips/${id}`;
        const response = await this.axiosInstance.delete<void>(pattern);
        return response.status === 204;
    }

    public async getAllForEmployee(firstName: string, lastName: string, limit: number, offset: number): Promise<Array<Response>> {
        const pattern = `archive/pay-slips/employee`;
        const response = await this.axiosInstance.get<Array<Response>>(pattern, {
            params: { firstName, lastName, limit, offset }
        });
        return response.data;
    }

    public async getAllForAnnualSalary(from: number, to: number, limit: number, offset: number): Promise<Array<Response>> {
        const pattern = `archive/pay-slips/annual-salary`;
        const response = await this.axiosInstance.get<Array<Response>>(pattern, {
            params: { from, to, limit, offset }
        });
        return response.data;
    }

    public async getAllForSuperRate(from: number, to: number, limit: number, offset: number): Promise<Array<Response>> {
        const pattern = `archive/pay-slips/super-rate`;
        const response = await this.axiosInstance.get<Array<Response>>(pattern, {
            params: { from, to, limit, offset }
        });
        return response.data;
    }
}

export default new RestApiClient("http://localhost:9080/api/", 5000);