import React from "react";
import { FormCheck } from "react-bootstrap";
import { formatMoney } from "../../utils/formatMoney";
import { IRider } from "./types";

export const Rider: React.FC<{ rider: IRider,onChange:Function }> = ({ rider,onChange }) => {
  let labels = {
    c: { lg: "Costo Administrativo", sm: "Costo Adm." },
    t: { lg: "Transplante de Órganos", sm: "Transplante" },
    m: { lg: "Comp. de Maternidad", sm: "Maternidad" },
  };
  let tag = null;
  switch (rider.name) {
    case "Costo Administrativo":
      tag = labels.c;
      break;
    case "Complicaciones de Maternidad":
      tag = labels.m;
      break;
    default:
      tag = labels.t;
      break;
  }

  if (rider.available) {
    return (
      <>
        <FormCheck
          className="d-none d-lg-block"
          label={
            tag.lg +
            " ( +" +
            formatMoney(rider.price, { decimalCount: 0 }) +
            " )"
          }
          checked={rider.selected?true:false}
          onChange={({ target }) => onChange(target.checked)}
        />
        <FormCheck
          className="d-block d-lg-none"
          label={tag.sm + " (+" + rider.price + ")"}
          checked={rider.selected?true:false}
          onChange={({target}) => onChange(target.checked)}
        />
      </>
    );
  }
  return null;
};
