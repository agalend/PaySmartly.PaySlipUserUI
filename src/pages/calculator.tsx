import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Calculator = () => {
    return (
        <Stack gap={10}>
            <div>
                <Form.Control type="text" placeholder="First Name" style={{ width: "30%" }} />
                <br />
                <Form.Control type="text" placeholder="Second Name" style={{ width: "30%" }} />
                <br />
                <Form.Control type="number" placeholder="Annual Salary" style={{ width: "30%" }} />
                <br />
                <Form.Control type="number" placeholder="Super Rate" style={{ width: "30%" }} />
                <br />
                <Button variant="outline-secondary">Calculate</Button>{' '}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div>
            <Form.Control type="text" placeholder="Name" style={{ width: "30%" }} readOnly/>
                <br />
                <Form.Control type="number" placeholder="Gross Income" style={{ width: "30%" }} readOnly/>
                <br />
                <Form.Control type="number" placeholder="Income Tax" style={{ width: "30%" }} readOnly/>
                <br />
                <Form.Control type="number" placeholder="Net Income" style={{ width: "30%" }} readOnly/>
                <br />
                <Form.Control type="number" placeholder="Super" style={{ width: "30%" }} readOnly/>
            </div>
        </Stack>
    );
};

export default Calculator;