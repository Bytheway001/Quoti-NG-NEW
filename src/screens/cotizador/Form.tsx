import React from "react";

import {
  Button,
  Col,
  
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Field, Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { useQuote } from "./context";
import { Mutator } from "final-form";


export const CotizadorForm:React.FC =()=>{
    const { quoteActions } = useQuote();
    
    const handleFormSubmit = (values: any) => {
      quoteActions.getQuote(values);
    };
    
    const setKidAges:Mutator = (args: any[], state: any, tools: any) => {
      let value = args[0];
      let field = state.fields["kids_ages"];
      field.change(new Array(value));
    };
    return(
    <Form onSubmit={handleFormSubmit} mutators={{ ...arrayMutators, setKidAges }}>
      {({ handleSubmit, form, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="country">
            {({ input, meta }) => (
              <FormGroup as={Row}>
                <FormLabel className='label-form' column sm={3} >
                  Pais
                </FormLabel>
                <Col sm={9}>
                  <FormControl as="select" size="sm" {...input}>
                    <option value="">Seleccione...</option>
                    <option value="BO">Bolivia</option>
                    <option value="EC">Ecuador</option>
                    <option value="PY">Paraguay</option>
                  </FormControl>
                </Col>
              </FormGroup>
            )}
          </Field>
    
          <Field name="plan_type">
            {({ input, meta }) => (
              <FormGroup size="sm" as={Row}>
                <FormLabel className='label-form pr-0' column sm={3} >
                  Tipo de Plan
                </FormLabel>
                <Col sm={9}>
                  <FormControl {...input} as="select" size="sm">
                    <option value="">Seleccione...</option>
                    <option value="1">Personal</option>
                    <option value="2">Parejas</option>
                    <option value="3">Familias</option>
                  </FormControl>
                </Col>
              </FormGroup>
            )}
          </Field>
          {values.plan_type > 2 && (
            <Field name="num_kids">
              {({ input, meta }) => (
                <FormGroup size="sm" as={Row}>
                  <FormLabel className='label-form' {...input} column sm={3}>
                    Hijos
                  </FormLabel>
                  <Col sm={9}>
                    <ToggleButtonGroup
                      size="sm"
                      className="w-100"
                      {...input}
                      onChange={form.mutators.setKidAges}
                      type="radio"
                    >
                      <ToggleButton value={1}>1</ToggleButton>
                      <ToggleButton value={2}>2</ToggleButton>
                      <ToggleButton value={3}>3</ToggleButton>
                      <ToggleButton value={4}>4</ToggleButton>
                      <ToggleButton value={5}>5</ToggleButton>
                    </ToggleButtonGroup>
                  </Col>
                </FormGroup>
              )}
            </Field>
          )}
          <FieldArray name="kids_ages">
            {({ fields }) => (
              <FormGroup as={Row}>
                <FormLabel
                  column
                  sm={12}
                  style={{ color: "white" }}
                  className="text-center"
                >
                  Edades
                </FormLabel>
                <Col sm={6}>
                  <Field name="main_age">
                    {({ input, meta }) => (
                      <FormGroup as={Row}>
                        <FormLabel style={{ color: "white" }} column sm={3}>
                          Titular
                        </FormLabel>
                        <Col sm={9}>
                          <FormControl {...input} />
                        </Col>
                      </FormGroup>
                    )}
                  </Field>
                </Col>
                {values.plan_type > 1 && (
                  <Col sm={6} className="mb-3">
                    <Field name="couple_age">
                      {({ input, meta }) => (
                        <FormGroup as={Row}>
                          <FormLabel style={{ color: "white" }} column sm={3}>
                            Pareja
                          </FormLabel>
                          <Col sm={9}>
                            <FormControl {...input} />
                          </Col>
                        </FormGroup>
                      )}
                    </Field>
                  </Col>
                )}
    
                {values.plan_type > 2 && (
                  <>
                    <Col sm={2}>
                      <FormLabel style={{ color: "white" }}>Hijos</FormLabel>
                    </Col>
                    <Col sm={10}>
                      <Row noGutters className="kid-age-form-control">
                        {fields.map((name, key: number) => (
                          <Col sm={2}>
                            <Field name={name}>
                              {({ meta, input }) => (
                                <FormControl size="sm" {...input} />
                              )}
                            </Field>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </>
                )}
              </FormGroup>
            )}
          </FieldArray>
          <FormGroup className="mt-5">
            <Button type="submit" className="btn-block">
              Cotizar
            </Button>
          </FormGroup>
        </form>
      )}
    </Form>
    )
}

