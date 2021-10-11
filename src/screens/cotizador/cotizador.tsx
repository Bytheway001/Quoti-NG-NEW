import React from 'react';
import { Card } from 'react-bootstrap';
import { QuoteProvider, useQuote } from './context';
import { SideBarScreen } from '../../layouts/SidebarScreen';
import { Sidebar } from './Sidebar';
import { QuoteTable } from './Table';
export interface IIndexable {
    [key: string]: string;
}
const CotizadorHOC: React.FC = () => {
    const countries: IIndexable = {

        BO: "Bolivia",
        PY: "Paraguay"
    }
    const types: IIndexable = {

        "1": "Personal",
        "2": "Parejas"
    }
    const { quote } = useQuote();
    return (
        <SideBarScreen Sidebar={Sidebar}>
            <Card className='cotizador-card'>
                <Card.Header className='d-flex flex-row justify-content-between align-items-centere'>
                    Cotizacion de Planes

                    {
                        quote && (
                            <div>
                                <span className='mr-3'>Pais: {countries[quote?.params.country]}</span>
                                <span>Tipo: {types[quote?.params.plan_type]}</span>

                            </div>
                        )

                    }
                </Card.Header>
                <QuoteTable />
            </Card>
        </SideBarScreen>
    )
}
export const Cotizador: React.FC = () => {

    return (
        <QuoteProvider>

            <CotizadorHOC />
        </QuoteProvider>
    )
}