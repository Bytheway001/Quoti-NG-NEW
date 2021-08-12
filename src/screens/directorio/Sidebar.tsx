import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import { useFiles } from "./context";

export const Sidebar: React.FC = () => {
  const { fileActions,filters } = useFiles();

  useEffect(() => {
    fileActions.getFiles();
  }, [fileActions]);
  return (
    <div className="files-sidebar">
      <Form>
        <FormGroup size="sm" as={Row}>
          <FormLabel column xs={3}>
            Compañia
          </FormLabel>
          <Col xs={9}>
            <FormControl
              as="select"
              onChange={({ target }) =>
                fileActions.applyFilter("company", parseInt(target.value))
              }
            >
              <option value="0">Todos</option>
              <option value="1">Allianz Care</option>
              <option value="2">Vumi Group</option>
              <option value="3">Best Doctors</option>
              <option value="5">Bupa Salud</option>
              <option value="6">BMI Seguros</option>
              <option value="7">Am First</option>
              <option value="8">American Fidelity</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup size="sm" as={Row}>
          <FormLabel column xs={3}>
            Año
          </FormLabel>
          <Col xs={9}>
            <FormControl
              as="select"
              onChange={({ target }) =>
                fileActions.applyFilter("year", parseInt(target.value))
              }
            >
              <option value="0">Todos</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </FormControl>
          </Col>
        </FormGroup>

      </Form>
    </div>
  );
};
