import React from 'react';
import { Image } from 'react-bootstrap';
import LoaderGif from '../assets/img/loader.gif'
export const Loader:React.FC = (props)=>{
    return(
        <div className='h-100' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <Image src={LoaderGif}/>
            <p className='light-blue-text' style={{fontSize:'1.3em'}}>Recopilando Datos del Servidor...</p>
        </div>
    )
}