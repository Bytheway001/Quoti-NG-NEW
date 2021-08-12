import React from 'react';
import { FormControl } from "react-bootstrap"
import { IRoundInput } from "../types/components"

export const RoundInput:React.FC<IRoundInput> = ({...props})=>{
    return(
        <FormControl {...props} className='custom-input text-center'/>
    )
}