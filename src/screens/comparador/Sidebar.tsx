import React, { useEffect } from "react";
import { Button, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Field, Form } from "react-final-form";
import { RoundButton } from "../../components/RoundButton";
import { useCompare } from "./context";
import { typeAheadOption } from "../../types/data";
import { usePDF } from "@react-pdf/renderer";
import { ComparePDF } from "../../pdf/Comparativo";
export const Sidebar: React.FC = () => {
  const { compareActions, planNames,comparativo } = useCompare();
  const document = <ComparePDF comparativo={comparativo}/>
  const [pdf,setPDF]=usePDF({document:document})
  useEffect(() => {
    compareActions.getPlanNames();
  }, [compareActions]);

  useEffect(()=>{
    setPDF()
  },[comparativo, setPDF])

  const options: typeAheadOption[] = planNames.map((name: string) => ({
    label: name,
    value: name,
  }));

  const handleFormSubmit = (values: any) => {
    let v: string[] = [];
    if (values.plan1 && values.plan1.length > 0) {
      v.push(values.plan1[0].value);
    }
    if (values.plan2 && values.plan2.length > 0) {
      v.push(values.plan2[0].value);
    }
    if (values.plan3 && values.plan3.length > 0) {
      v.push(values.plan3[0].value);
    }
    compareActions.getCompare(v)
  
  };

  return (
    <div className="comparador-sidebar">
      <Form onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="plan1">
              {({ input, meta }) => (
                <FormGroup size="sm" as={Row}>
                  <FormLabel column xs={3}>
                    Plan 1
                  </FormLabel>
                  <Col xs={9}>
                    <Typeahead
                      clearButton={true}
                      id="plan1"
                      onChange={input.onChange}
                      options={options}
                      labelKey={(opt) => opt.label}
                      inputProps={{ className: "form-control form-control-sm" }}
                    />
                  </Col>
                </FormGroup>
              )}
            </Field>
            <Field name="plan2">
              {({ input, meta }) => (
                <FormGroup size="sm" as={Row}>
                  <FormLabel column xs={3}>
                    Plan 2
                  </FormLabel>
                  <Col xs={9}>
                    <Typeahead
                      onChange={input.onChange}
                      options={options}
                      clearButton={true}
                      id="plan2"
                      labelKey={(opt) => opt.label}
                      inputProps={{ className: "form-control form-control-sm" }}
                    />
                  </Col>
                </FormGroup>
              )}
            </Field>
            <Field name="plan3">
              {({ input, meta }) => (
                <FormGroup size="sm" as={Row}>
                  <FormLabel column xs={3}>
                    Plan 3
                  </FormLabel>
                  <Col xs={9}>
                    <Typeahead
                      onChange={input.onChange}
                      options={options}
                      clearButton={true}
                      id="plan3"
                      labelKey={(opt) => opt.label}
                      inputProps={{ className: "form-control form-control-sm" }}
                    />
                  </Col>
                </FormGroup>
              )}
            </Field>
            <FormGroup>
              <RoundButton className="btn-block compare-btn " type="submit">
                Comparar
              </RoundButton>
            </FormGroup>
            { 
             comparativo &&  <RoundButton className="btn-block compare-btn " as='a' href={pdf.url||"#"} download='comparativo.pdf' variant='success'>Descargar (PDF)</RoundButton>
              
            }
          </form>
        )}
      </Form>
    </div>
  );
};
