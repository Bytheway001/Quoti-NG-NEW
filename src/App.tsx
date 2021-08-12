import React from "react";
import "./assets/scss/application.scss";
import { BrowserRouter, Switch, Route,} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Test } from "./components/Test";
import BasicLayout from "./layouts/Basic";
import { HomePage } from "./screens/home/screen";
import Comparador from "./screens/comparador/Comparador";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Cotizador } from "./screens/cotizador/cotizador";
import { Directorio } from "./screens/directorio/directorio";
import {LostPasswordForm} from './screens/login/LostPasswordForm';
import {UpdatePasswordForm} from './screens/login/UpdatePasswordForm';
import { LoginForm } from "./screens/login/Form";

const App:React.FC = ()=> {
  return (
    <BrowserRouter>
      <BasicLayout>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/recover_password" component={LostPasswordForm}/>
          <Route path='/newpassword' component={UpdatePasswordForm}/>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/comparador" component={Comparador} />
          <PrivateRoute path="/cotizador" component={Cotizador} />
          <PrivateRoute path="/files" component={Directorio} />
          <PrivateRoute path="/test" component={Test} />
        </Switch>
      </BasicLayout>
    </BrowserRouter>
  );
}


export default App;
