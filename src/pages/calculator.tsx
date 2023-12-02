import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import api from "../api/client";
import Response from "../api/response";

const Calculator = () => {
    const [isLoading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [annualSalary, setAnnualSalary] = useState(0);
    const [superRate, setSuperRate] = useState(0);
    const [grossIncome, setGrossIncome] = useState(0);
    const [incomeTax, setIncomeTax] = useState(0);
    const [netIncome, setNetIncome] = useState(0);
    const [calculatedSuper, setCalculatedSuper] = useState(0);

    useEffect(() => {
        async function createPaySlip(): Promise<Response> {
            const response = await api.create({
                employee: { firstName, lastName },
                annualSalary,
                superRate,
                payPeriodFrom: new Date(),
                payPeriodTo: new Date(),
                roundTo: 2,
                months: 12,
                requester: { firstName: "Unknown", lastName: "Unknown" },
            });

            setGrossIncome(response.grossIncome);
            setIncomeTax(response.incomeTax);
            setNetIncome(response.netIncome);
            setCalculatedSuper(response.super);

            return response;
        }

        if (isLoading) {
            createPaySlip().then(() => {
                setLoading(false);
            });
        }
    }, [isLoading]);

    return (
        <Stack gap={10}>
            <div>
                <Form.Control type="text" placeholder="First Name" style={{ width: "30%" }} onChange={(e) => setFirstName(e.target.value)} />
                <br />
                <Form.Control type="text" placeholder="Last Name" style={{ width: "30%" }} onChange={(e) => setLastName(e.target.value)} />
                <br />
                <Form.Control type="number" placeholder="Annual Salary" style={{ width: "30%" }} onChange={(e) => setAnnualSalary(e.target.value as any)} />
                <br />
                <Form.Control type="number" placeholder="Super Rate" style={{ width: "30%" }} onChange={(e) => setSuperRate(e.target.value as any)} />
                <br />
                <Button
                    variant="outline-secondary"
                    disabled={isLoading}
                    onClick={!isLoading ? () => setLoading(true) : undefined}>
                    {isLoading ? 'Calculating…' : 'Calculate'}
                </Button>{' '}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div>
                <Form.Control type="text" value={`${firstName} ${lastName}`} placeholder="Name" style={{ width: "30%" }} readOnly />
                <br />
                <Form.Control type="number" value={grossIncome} placeholder="Gross Income" style={{ width: "30%" }} readOnly />
                <br />
                <Form.Control type="number" value={incomeTax} placeholder="Income Tax" style={{ width: "30%" }} readOnly />
                <br />
                <Form.Control type="number" value={netIncome} placeholder="Net Income" style={{ width: "30%" }} readOnly />
                <br />
                <Form.Control type="number" value={calculatedSuper} placeholder="Super" style={{ width: "30%" }} />
            </div>
        </Stack>
    );
};

export default Calculator;