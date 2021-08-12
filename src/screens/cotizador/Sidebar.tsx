import {faBaby,faHeartbeat,faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormGroup } from "react-bootstrap";
import { useQuote } from "./context";
import { CotizadorForm } from "./Form";
import { QuoteModal } from "./QuoteModal";
import { ICompare, IRider } from "./types";

const SidebarItem: React.FC<{ item: any }> = ({ item }) => {
  const { quoteActions } = useQuote();

  return (
    <div className="plan-selected">
      <div className="plan">{`${item.name} - ${item.deductible}`}</div>
      <div className="riders">
        {item.rate.riders.map((r: IRider) => {
          if (r.name === "Costo Administrativo") {
            return null;
          }
          if (r.selected) {
            return (
              <FontAwesomeIcon
                className="mx-1"
                size="lg"
                icon={
                  r.name === "Complicaciones de Maternidad"
                    ? faBaby
                    : faHeartbeat
                }
              />
            );
          } else return null;
        })}

        <FontAwesomeIcon
          className="trash-icon mx-2"
          size="lg"
          style={{ cursor: "pointer" }}
          icon={faTrashAlt}
          onClick={() => quoteActions.removeFromCompare(item)}
        />
      </div>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  let { compare } = useQuote();

  return (
    <div className="cotizador-sidebar">
      <FormGroup>
        <CotizadorForm />
        <div className="plans-selected">
          {compare.map((x: ICompare, key: number) => {
            return <SidebarItem item={x} />;
          })}
        </div>
        {compare.length > 0 && <QuoteModal />}
      </FormGroup>
    </div>
  );
};
