import { Container , Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return ( <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
        <h2>
            <Link to="/" className="link-light text-decoration-none">Annchat</Link>
        </h2>
        <span className="text-warning">Logged in as Shivam</span>
        <Nav>
            <Stack direction="horizontal" spacing={3}>
                <Link to="/login" className="nav-link link-light">Login</Link>
                <Link to="/register" className="nav-link link-light">Register</Link>
            </Stack>
        </Nav>
        </Container>
    </Navbar>
    );
};  
 
export default NavBar;