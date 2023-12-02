import { AxiosInstance } from "axios";

export default class ApiClient {
    private getAllPaySlipsForAnnualSalaryUrl = "/archive/pay-slips/annual-salary?from=60000&to=100000&limit=20&offset=0";

    constructor(private instance: AxiosInstance) { }

    public async getAllPaySlipsForAnnualSalary(): Promise<any> {
        const result = await this.instance.get(this.getAllPaySlipsForAnnualSalaryUrl);
        return result;
    }
}