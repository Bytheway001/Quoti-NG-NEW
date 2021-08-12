import React from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { RoundButton } from '../../components/RoundButton';
import { RoundInput } from '../../components/RoundInput';
import { LoginScreen } from "./Screen";
import { useUser } from "../../context/User";
import queryString from 'query-string';
export const UpdatePasswordForm: React.FC = () => {
    const {userActions } = useUser();
    const validateForm = (values:{password:string,password_confirmation:string})=>{
     
        const errors={}
        if(!values.password){
            // @ts-ignore
            errors.password = 'Campo Obligatorio'
        }
        if(!values.password_confirmation){
             // @ts-ignore
            errors.password_confirmation='Campo Obligatorio'
        }
        if(values.password!==values.password_confirmation){
             // @ts-ignore
            errors.password_confirmation = "Las Claves deben coincidir"
        }
        return errors;
    }
 
    const onFormSubmit = (values:{password:string,password_confirmation:string}) => {
        const params = queryString.parse(window.location.search);
        console.log(params)
        userActions.updatePassword({
            uid:params.uid,
            password:values.password
        })
    }
    return (
        <LoginScreen>
            <Form
                validate={validateForm}
                onSubmit={onFormSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="password">
                            {({ input, meta }) => (
                                <FormGroup>
                                    <label>Nueva Contraseña:</label>
                                    <RoundInput size="sm" type="password" {...input} />
                                    {meta.error && meta.touched && <span style={{color:'red',fontSize:'0.7em'}}>{meta.error}</span>}
                                </FormGroup>
                            )}
                        </Field>
                        <Field name="password_confirmation">
                            {({ input, meta }) => (
                                <FormGroup>
                                    <label>Confirmar Contraseña:</label>
                                    <RoundInput size="sm" type="password" {...input} />
                                    {meta.error && meta.touched && <span style={{color:'red',fontSize:'0.7em'}}>{meta.error}</span>}

                                </FormGroup>
                            )}
                        </Field>
                        <FormGroup>
                            <RoundButton block type="submit">
                                Ingresar
                            </RoundButton>

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