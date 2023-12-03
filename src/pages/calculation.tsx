import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import api from "../api/client";
import { Response } from "../api/response";
import { PaySlipRequest } from '../api/request';

const Calculation = () => {
    const [isLoading, setLoading] = useState(false);
    const [request, setRequest] = useState<PaySlipRequest>(PaySlipRequest.emptyRequest);
    const [response, setResponse] = useState<Response>();

    useEffect(() => {
        async function createPaySlip(): Promise<void> {
            const response = await api.create(request);
            setResponse(response);
        }
        if (isLoading) {
            createPaySlip().then(() => setLoading(false));
        }
    }, [isLoading]);

    return (
        <Stack gap={10}>
            <div>
                <Form.Control type="text" placeholder="John" style={{ width: "30%" }} onChange={(e) => {
                    request.employeeFirstName = e.target.value;
                    setRequest(request);
                }} />
                <br />
                <Form.Control type="text" placeholder="Peterson" style={{ width: "30%" }} onChange={(e) => {
                    request.employeeLastName = e.target.value;
                    setRequest(request);
                }} />
                <br />
                <Form.Control type="number" placeholder="100000" style={{ width: "30%" }} onChange={(e) => {
                    request.annualSalary = e.target.value as any;
                    setRequest(request);
                }} />
                <br />
                <Form.Control type="number" placeholder="5" style={{ width: "30%" }} onChange={(e) => {
                    request.superRate = e.target.value as any;
                    setRequest(request);
                }} />
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
                <Form.Control type="text" value={`${response?.employee?.firstName ?? ""} ${response?.employee?.lastName ?? ""}`} style={{ width: "30%" }} readOnly disabled />
                <br />
                <Form.Control type="number" value={response?.grossIncome ?? 0} style={{ width: "30%" }} readOnly disabled />
                <br />
                <Form.Control type="number" value={response?.incomeTax ?? 0} style={{ width: "30%" }} readOnly disabled />
                <br />
                <Form.Control type="number" value={response?.netIncome ?? 0} style={{ width: "30%" }} readOnly disabled />
                <br />
                <Form.Control type="number" value={response?.super ?? 0} style={{ width: "30%" }} readOnly disabled />
            </div>
        </Stack>
    );
};

export default Calculation;