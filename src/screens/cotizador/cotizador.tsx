import React from 'react';
import { Card } from 'react-bootstrap';
import { QuoteProvider } from './context';
import { SideBarScreen } from '../../layouts/SidebarScreen';
import { Sidebar } from './Sidebar';
import { QuoteTable } from './Table';

export const Cotizador:React.FC = ()=>{
    return(
        <QuoteProvider>
            <SideBarScreen Sidebar={Sidebar}>
            <Card className='cotizador-card'>
                <Card.Header>Cotizacion de Planes</Card.Header>
                <QuoteTable/>
            </Card>
            </SideBarScreen>
        </QuoteProvider>
    )
}