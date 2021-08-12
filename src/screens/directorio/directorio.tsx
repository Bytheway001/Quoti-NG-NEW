import React from "react";
import { SideBarScreen } from "../../layouts/SidebarScreen";
import { FileProvider } from "./context";
import { Sidebar } from "./Sidebar";
import { IContext } from "./types";
import { Card } from "react-bootstrap";
import { FileTable } from "./fileTable";

export const Directorio: React.FC<IContext> = () => {
  return (
    <FileProvider>
      <SideBarScreen Sidebar={() => <Sidebar />}>
        <Card className="comparador-card">
          <Card.Header>Directorio</Card.Header>
         
          <FileTable/>
        
        </Card>
      </SideBarScreen>
    </FileProvider>
  );
};
