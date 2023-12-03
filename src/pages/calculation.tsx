import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import api from "../api/client";
import { Response } from "../api/response";
import { PaySlipRequest } from "../api/request";
import monthsConverter from "../helpers/monthsConverter";

const Calculation = () => {
    const [month, setMonth] = useState<string | null>((new Date()).getMonth().toString());
    const [isLoading, setLoading] = useState<boolean>(false);
    const [request, setRequest] = useState<PaySlipRequest>(PaySlipRequest.emptyRequest);
    const [response, setResponse] = useState<Response>();

    useEffect(() => {
        request.month = Number(month!) + 1;
        request.year = (new Date()).getFullYear();
        setRequest(request);
    }, [month]);

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
                            <br />
                            <DropdownButton id="months-dropdown" title={monthsConverter.convert(month!)} variant="outline-secondary" onSelect={setMonth}>
                                <Dropdown.Item eventKey="0">January</Dropdown.Item>
                                <Dropdown.Item eventKey="1">February</Dropdown.Item>
                                <Dropdown.Item eventKey="2">March</Dropdown.Item>
                                <Dropdown.Item eventKey="3">April</Dropdown.Item>
                                <Dropdown.Item eventKey="4">May</Dropdown.Item>
                                <Dropdown.Item eventKey="5">June</Dropdown.Item>
                                <Dropdown.Item eventKey="6">July</Dropdown.Item>
                                <Dropdown.Item eventKey="7">August</Dropdown.Item>
                                <Dropdown.Item eventKey="8">September</Dropdown.Item>
                                <Dropdown.Item eventKey="9">October</Dropdown.Item>
                                <Dropdown.Item eventKey="10">November</Dropdown.Item>
                                <Dropdown.Item eventKey="11">December</Dropdown.Item>
                            </DropdownButton>
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
                            <Form.Label>Pay Period From</Form.Label>
                            <Form.Control type="string" value={response?.payPeriodFrom?.toLocaleDateString() ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                            <Form.Label>Pay Period To</Form.Label>
                            <Form.Control type="string" value={response?.payPeriodTo?.toLocaleDateString() ?? ""} style={{ width: "30%" }} readOnly disabled />
                            <br />
                        </Stack>
                    </th>
                </tr>
                <tr>
                    <br />
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