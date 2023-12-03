import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import api from "../api/client";
import { Response } from "../api/response";

const History = () => {
    const [validated, setValidated] = useState(false);
    const [request, setRequest] = useState<{ searchItem1: string, searchItem2: string }>({ searchItem1: "", searchItem2: "" });
    const [response, setResponse] = useState<Array<Response>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchCriteria, setSearchCriteria] = useState<string | null>("Name");
    const [currentPage, setCurrentPage] = useState<number>(0);

    const [searchLabel1, setSearchLabel1] = useState<string>("First Name");
    const [searchLabel2, setSearchLabel2] = useState<string>("Last Name");

    const [searchSuggestion1, setSearchSuggestion1] = useState<string>("John");
    const [searchSuggestion2, setSearchSuggestion2] = useState<string>("Peterson");

    const [searchInputType, setSearchInputType] = useState<string>("text");

    const [searchInput1Error, setSearchInput1Error] = useState<string>("Please set first name");
    const [searchInput2Error, setSearchInput2Error] = useState<string>("Please set last name");

    useEffect(() => {
        switch (searchCriteria) {
            case "Name": {
                setSearchLabel1("First Name");
                setSearchLabel2("Last Name");
                setSearchSuggestion1("John");
                setSearchSuggestion2("Peterson");
                setSearchInputType("text");
                setSearchInput1Error("Please set first name");
                setSearchInput2Error("Please set last name");
                break;
            }
            case "Super Rate": {
                setSearchLabel1("From");
                setSearchLabel2("To");
                setSearchSuggestion1("0");
                setSearchSuggestion2("10");
                setSearchInputType("number");
                setSearchInput1Error("Please set a number between 1 and 99");
                setSearchInput2Error("Please set a number between 1 and 99");
                break;
            }
            case "Annual Salary": {
                setSearchLabel1("From");
                setSearchLabel2("To");
                setSearchSuggestion1("0");
                setSearchSuggestion2("250000");
                setSearchInputType("number");
                setSearchInput1Error("Please set a number between 1 and 10000000");
                setSearchInput2Error("Please set a number between 1 and 10000000");
                break;
            }
        };
    }, [searchCriteria]);

    useEffect(() => {
        async function createPaySlip(): Promise<void> {
            switch (searchCriteria) {
                case "Name": {
                    const response = await api.getAllForEmployee(request.searchItem1, request.searchItem2, 10, currentPage * 10);
                    setResponse(response);
                    break;
                }
                case "Super Rate": {
                    const response = await api.getAllForSuperRate(Number(request.searchItem1), Number(request.searchItem2), 10, currentPage * 10);
                    setResponse(response);
                    break;
                }
                case "Annual Salary": {
                    const response = await api.getAllForAnnualSalary(Number(request.searchItem1), Number(request.searchItem2), 10, currentPage * 10);
                    setResponse(response);
                    break;
                }
            }
        }
        if (isLoading) {
            createPaySlip().then(() => setLoading(false));
        }
    }, [isLoading]);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            setLoading(true);
        }

        setValidated(true);
    };


    return (
        <Stack>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Stack direction="horizontal">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <DropdownButton id="months-dropdown" title={searchCriteria} variant="outline-secondary" onSelect={setSearchCriteria}>
                            <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                            <Dropdown.Item eventKey="Super Rate">Super Rate</Dropdown.Item>
                            <Dropdown.Item eventKey="Annual Salary">Annual Salary</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Button
                            type="submit"
                            variant="outline-secondary"
                            style={{ width: "50%" }}
                            disabled={isLoading}>
                            {isLoading ? 'Requesting…' : 'Request Data'}
                        </Button >
                    </Form.Group>
                </Stack>

                <Form.Label />
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>{searchLabel1}</Form.Label>
                    <Form.Control required type={searchInputType} min={0} max={searchCriteria === "Super Rate" ? 99 : 10000000} placeholder={searchSuggestion1} style={{ width: "50%" }} onChange={(e) => {
                        request.searchItem1 = e.target.value;
                        setRequest(request);
                    }} />
                    <Form.Control.Feedback type="invalid">
                        {searchInput1Error}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Label />
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>{searchLabel2}</Form.Label>
                    <Form.Control required type={searchInputType} min={0} max={searchCriteria === "Super Rate" ? 99 : 10000000} placeholder={searchSuggestion2} style={{ width: "50%" }} onChange={(e) => {
                        request.searchItem2 = e.target.value;
                        setRequest(request);
                    }} />
                    <Form.Control.Feedback type="invalid">
                        {searchInput2Error}
                    </Form.Control.Feedback>
                    <Form.Label />
                </Form.Group>
                <Form.Label />
            </Form>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>annual salary</th>
                        <th>super rate</th>
                        <th>gross income</th>
                        <th>income tax</th>
                        <th>net income</th>
                        <th>super</th>
                        <th>pay period from</th>
                        <th>pay period to</th>
                        <th>created at</th>
                    </tr>
                </thead>
                <tbody>
                    {response?.map((data, index) => (
                        <tr>
                            <td>{index + (currentPage * 10)}</td>
                            <td>{data.employee.firstName}</td>
                            <td>{data.employee.lastName}</td>
                            <td>{data.annualSalary}</td>
                            <td>{data.superRate}</td>
                            <td>{data.grossIncome}</td>
                            <td>{data.incomeTax}</td>
                            <td>{data.netIncome}</td>
                            <td>{data.super}</td>
                            <td>{data.payPeriodFrom.toLocaleDateString()}</td>
                            <td>{data.payPeriodTo.toLocaleDateString()}</td>
                            <td>{data.createdAt.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Stack direction="horizontal">
                <Button
                    variant="outline-secondary"
                    style={{ width: "50%" }}
                    disabled={isLoading || (currentPage <= 0)}
                    onClick={!isLoading
                        ? () => {
                            setCurrentPage(currentPage - 1)
                            setLoading(true);
                        }
                        : undefined}>
                    {isLoading ? 'Requesting…' : 'Request Prev Data'}
                </Button >
                <Button
                    variant="outline-secondary"
                    style={{ width: "50%" }}
                    disabled={isLoading || (response.length < 10)}
                    onClick={!isLoading
                        ? () => {
                            setCurrentPage(currentPage + 1)
                            setLoading(true);
                        }
                        : undefined}>
                    {isLoading ? 'Requesting…' : 'Request Next Data'}
                </Button >
            </Stack>
        </Stack>
    );
};

export default History;