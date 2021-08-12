import React from "react";
import { Col, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useUser } from "../../context/User";


export const LoginScreen: React.FC = ({children}) => {
  const { errors,user} = useUser();
 
  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <Row
        noGutters
        className="h-100 login-screen"
        style={{ marginLeft: -15, marginRight: -15 }}
      >
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 4, offset: 4 }}
          className="h-100 d-flex flex-column justify-content-center"
        >
          <div className="form-wrapper">
            <div className="text-center logo-wrap">
              <Logo type="full" />
            </div>
            {errors && (
              <p className="text-center" style={{ color: "red" }}>
                {errors}
              </p>
            )}
            <Col sm={12}>
              {children}
            </Col>
          </div>
        </Col>
      </Row>
    );
  }
};
