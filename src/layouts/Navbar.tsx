import React from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import {INavbar} from '../types/components';

const Bar: React.FC<INavbar> = ({ logout, email }) => (
  <Navbar expand="lg" id="navbar">
    <Navbar.Brand href="/">
      <Logo type="full" size="sm" />
    </Navbar.Brand>
    <Navbar.Text
      className="d-sm-none navbar-title"
      style={{ justifySelf: "center" }}
    >
      A title
    </Navbar.Text>

    <Navbar.Toggle aria-controls="basic-navbar-nav">
      <FontAwesomeIcon icon={faEllipsisV} color="#5b86e5" />
    </Navbar.Toggle>

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-sm-auto mr-sm-2 px-2">
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/comparador">
          Comparador
        </Nav.Link>
        <Nav.Link as={Link} to="/cotizador">
          Cotizador
        </Nav.Link>
        <Nav.Link
          href="https://api.whatsapp.com/send?phone=59178123178&text=Buen%20dia,%20Requiero%20soporte%20con%20el%20Quoti%20App"
          target="_blank"
        >
          Soporte
        </Nav.Link>

        <Nav.Link as={Link} to="/files">
          Directorio
        </Nav.Link>

        <NavDropdown title={email ?? ""} id="nav-dropdown">
          <NavDropdown.Item
            style={{ padding: 5, paddingRight: 20, textAlign: "right" }}
            as={Link}
            to="/stats"
            eventKey="1"
          >
            Mis Cotizaciones
          </NavDropdown.Item>
          <NavDropdown.Item
            style={{ padding: 5, paddingRight: 20, textAlign: "right" }}
            as={Link}
            to="/agent/codes"
            eventKey="2"
          >
            Mis Códigos
          </NavDropdown.Item>
          <NavDropdown.Item
            style={{ padding: 5, paddingRight: 20, textAlign: "right" }}
            as={Link}
            to="/agent/dashboard"
            eventKey="3"
          >
            Mi Cuenta
          </NavDropdown.Item>
          <Button
            block
            className="btn-drop"
            variant="link"
            onClick={() => logout()}
            style={{ padding: 5, paddingRight: 20, textAlign: "right" }}
          >
            Cerrar Sesion
          </Button>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Bar;