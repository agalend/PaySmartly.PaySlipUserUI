export class MonthsConverter {
    private monthNames: Array<string>;

    constructor() {
        this.monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    }
    public convert(month: string): string {
        return this.monthNames[Number(month)];
    }
}

export default new MonthsConverter();