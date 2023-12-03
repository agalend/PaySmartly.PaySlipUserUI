import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
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
        <Table>
            <tbody>
                <tr>
                    <th>
                        <Stack gap={10}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="John" style={{ width: "30%" }} onChange={(e) => {
                                request.employeeFirstName = e.target.value;
                                setRequest(request);
                            }} />
                            <br />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Peterson" style={{ width: "30%" }} onChange={(e) => {
                                request.employeeLastName = e.target.value;
                                setRequest(request);
                            }} />
                            <br />
                            <Form.Label>Annual Salary</Form.Label>
                            <Form.Control type="number" placeholder="100000" style={{ width: "30%" }} onChange={(e) => {
                                request.annualSalary = e.target.value as any;
                                setRequest(request);
                            }} />
                            <br />
                            <Form.Label>Super Rate</Form.Label>
                            <Form.Control type="number" placeholder="5" style={{ width: "30%" }} onChange={(e) => {
                                request.superRate = e.target.value as any;
                                setRequest(request);
                            }} />
                        </Stack>
                    </th>
                    <th>
                        <Stack>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={`${response?.employee?.firstName ?? ""} ${response?.employee?.lastName ?? ""}`} style={{ width: "30%" }} readOnly disabled />
                            <br />
                            <Form.Label>Gross Income</Form.Label>
                            <Form.Control type="number" value={response?.grossIncome ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                            <Form.Label>Income Tax</Form.Label>
                            <Form.Control type="number" value={response?.incomeTax ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                            <Form.Label>Net Income</Form.Label>
                            <Form.Control type="number" value={response?.netIncome ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                            <Form.Label>Super</Form.Label>
                            <Form.Control type="number" value={response?.super ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                        </Stack>
                    </th>
                </tr>
                <tr>
                    <br/>
                    <Button
                        variant="outline-secondary"
                        style={{ width: "20%" }}
                        disabled={isLoading}
                        onClick={!isLoading ? () => setLoading(true) : undefined}>
                        {isLoading ? 'Calculating…' : 'Calculate'}
                    </Button>{' '}
                </tr>
            </tbody>
        </Table>
    );
};

export default Calculation;