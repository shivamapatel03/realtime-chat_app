import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";


const Login = () => {
    return  <>
    <Form>
        <Row style={{ height: "100vh", justifyContent: "Center", paddingTop:"10%"}}>
            <Col xs={6}>
            <Stack gap={3}>
                <h3>Login</h3>
                <Form.Control type="email" placeholder="Email"/>
                <Form.Control type="password" placeholder="Password"/>
                <Button variant="primary" type="Submit">Login</Button>

                <Alert variant="danger"><p>An error occurred </p></Alert>

            </Stack>
            </Col>
        </Row>   
    </Form>
    </> ;
}
 
export default Login;