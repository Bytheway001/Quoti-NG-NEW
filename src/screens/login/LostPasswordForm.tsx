import React, { useState } from 'react';
import { Row, Col, FormGroup, Alert } from 'react-bootstrap';
import { useUser } from "../../context/User";
import { Logo } from "../../components/Logo";
import { LoginScreen } from './Screen';
import { Field, Form } from 'react-final-form';
import { RoundInput } from '../../components/RoundInput';
import { RoundButton } from '../../components/RoundButton';
import { Link } from 'react-router-dom';
export const LostPasswordForm: React.FC = () => {
    const [done, setDone] = useState("");
    const { errors, user, userActions } = useUser();
    const onFormSubmit = (values: { username: string }) => {
        setDone("");
        userActions.recoverPassword(values).then((r: any) => {
            if (r.status === 200) {
                setDone("success")
            }
        })
            .catch((err: any) => {
                if (err.response.status === 404) {
                    setDone("error")
                }

            })
    }
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
                        <FormGroup>
                            <RoundButton block type="submit">
                                Ingresar
                            </RoundButton>
                            {done && <Alert className='mt-2' variant='info'> {done === 'success' ? "Hemos enviado un correo a la cuenta seleccionada, por favor verifique su correo y haga click en el enlace para actualizar su contraseña" : "Usuario no encontrado"}
                            </Alert>}
                        </FormGroup>
                        <Link className="d-block text-center" to="/login">
                            Volver
                        </Link>
                    </form>
                )}
            ></Form>
        </LoginScreen>
    )
}