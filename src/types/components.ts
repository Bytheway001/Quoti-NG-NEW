import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { ButtonProps, FormControlProps } from "react-bootstrap";


export interface IRoundInput extends FormControlProps {
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface IRoundButton extends ButtonProps {
  download?:string,
  form?: string;
  
}

export interface IFeather {
  text: string;
  icon: IconDefinition;
  href: string;
}

export interface INavbar {
  logout: Function;
  email: string;
}

