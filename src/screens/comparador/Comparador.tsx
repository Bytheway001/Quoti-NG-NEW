import React from "react";
import { Card} from "react-bootstrap";
import { CompareProvider } from "./context";
import { SideBarScreen } from "../../layouts/SidebarScreen";
import { IComparador } from "./types";
import { CompareTable } from "./CompareTable";
import { Sidebar } from "./Sidebar";

const Comparador: React.FC<IComparador> = () => {
 
  return (
    <CompareProvider>
      <SideBarScreen Sidebar={() => <Sidebar />}>
      <Card className='comparador-card'>
          <Card.Header>Comparativo de Beneficios</Card.Header>
            <CompareTable />
        </Card>
     </SideBarScreen>
    </CompareProvider>
  );
};

export default Comparador;
