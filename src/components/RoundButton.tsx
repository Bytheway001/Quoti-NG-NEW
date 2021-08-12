import React from 'react';
import { Button } from 'react-bootstrap';
import { IRoundButton } from '../types/components';

const ButtonStyle={
   
    borderRadius:50,
    boxShadow:'1px 1px 5px gray'
}

export const RoundButton:React.FC<IRoundButton> = ({children,...props})=>{
    return(
        <Button style={{...ButtonStyle,...props.style}} {...props}>{children}</Button>
    )
}