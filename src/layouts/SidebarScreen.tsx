import React from "react";
import { Col, Row } from "react-bootstrap";

type SideBarProps = {
  Sidebar: React.FC;
};
export const SideBarScreen: React.FC<SideBarProps> = ({
  Sidebar,
  children,
}) => {
  return (
    <Row noGutters className="sidebarView">
      <Col sm={3} className="sidebar ">
        {<Sidebar />}
      </Col>
      <Col sm={9} className="sidebarView-content">
        {children}
      </Col>
    </Row>
  );
};
