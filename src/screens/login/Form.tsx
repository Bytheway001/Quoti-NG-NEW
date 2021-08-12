import React from "react";
import { FormGroup } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import { RoundButton } from "../../components/RoundButton";
import { RoundInput } from "../../components/RoundInput";
import { IUserLogin, useUser } from "../../context/User";
import { LoginScreen } from "./Screen";


export const LoginForm: React.FC = () => {
  const { userActions } = useUser();
  const onFormSubmit = (values: IUserLogin) => {
    userActions.loginUser(values);
  };

  return (
    <LoginScreen>
      <Form
        onSubmit={onFormSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <FormGroup>
                  <label>Correo Electronico:</label>

                  <RoundInput size="sm" type="email" {...input} />
                </FormGroup>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <FormGroup>
                  <label>Contraseña:</label>
                  <RoundInput size="sm" type="password" {...input} />
                </FormGroup>
              )}
            </Field>

            <FormGroup>
              <RoundButton block type="submit">
                Ingresar
              </RoundButton>
            </FormGroup>
            <Link className="d-block text-center" to="/recover_password">
              Olvido su contraseña?
            </Link>
          </form>
        )}
      ></Form>
    </LoginScreen>
  );
};
