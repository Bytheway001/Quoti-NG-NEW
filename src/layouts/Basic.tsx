import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useUser } from "../context/User";
import Bar from "./Navbar";

const BasicLayout: React.FC = ({ children }) => {
  const { user, userActions } = useUser();

  return (
    <Container fluid className="basic-layout px-0">
      <Row noGutters className="navbar-wrapper">
        <Col sm={12}>
          {user && (
            <Bar email={user.email} logout={userActions.logout} />
          )}
        </Col>
      </Row>
      <Row noGutters className="content-wrapper">
        <Col className="h-100" sm={12}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BasicLayout;
