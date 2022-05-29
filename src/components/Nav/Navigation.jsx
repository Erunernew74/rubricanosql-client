import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../AuthComponent";

const Navigation = () => {
  const { isAuth, setIsAuth } = useAuth();

  //* Logout
  const removeJwt = async () => {
    const res = await fetch(`http://localhost:8000/auth/logout`, {
      credentials:"include"
    })
    setIsAuth(false)
  }

  if(isAuth) {
    return(
      <div>
        <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to='/rubrica'>
            <Navbar.Brand>RUBRICA</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/rubrica">
                <Nav.Link>Inserimento</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cerca">
                <Nav.Link>Cerca</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profilo">
                <Nav.Link>Profilo</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/logoutSuccess">
                <Nav.Link onClick={removeJwt}>Logout</Nav.Link>
              </LinkContainer>

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    )
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>RUBRICA</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
