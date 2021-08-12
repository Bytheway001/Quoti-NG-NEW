import { usePDF } from "@react-pdf/renderer";
import React, { useState } from "react";

import { Button, ButtonGroup, Modal, Table, Dropdown } from "react-bootstrap";
import { useQuote } from "./context";
import { QuotePDF } from "../../pdf/Cotizacion";
import { formatMoney } from "../../utils/formatMoney";
import { ICompare } from "./types";
import { useEffect } from "react";
import { CompareProvider } from "../comparador/context";

export const totalize = (plan: ICompare, rateType: string) => {
  let total = plan.rate.main_price[rateType];
  if (plan.rate.couple_price) {
    total += plan.rate.couple_price[rateType];
  }
  if (plan.rate.kids_price) {
    total += plan.rate.kids_price[rateType];
  }
  plan.rate.riders.forEach((rider) => {
    if (rider.selected) {
      total += rider.price;
    }
  });
  return total;
};
export const QuoteModal: React.FC = () => {
  const [rateType, setRateType] = useState<string>("yearly");
  const [show, setShow] = useState(false);
  const { compare } = useQuote();
  const [pdfWithBenefits,setPdfWithBenefits]=usePDF({
    document: <CompareProvider><QuotePDF quote={compare} rates={rateType} benefits={true}/></CompareProvider>
  })
  const [pdf, setPDF] = usePDF({
    document: <QuotePDF quote={compare} rates={rateType} />,
  });

  const toggle = (value: boolean) => {
    setPdfWithBenefits()
    setPDF();
    setShow(value);
  };

  useEffect(() => {
    setPdfWithBenefits()
    setPDF();
  }, [rateType, setPDF, setPdfWithBenefits]);

  return (
    <>
      <Button onClick={() => toggle(true)} className="btn-block btn-success">
        Ver Comparativo
      </Button>
      <Modal
        className="quote-modal"
        dialogClassName="modal-90w"
        size="xl"
        show={show}
        onHide={() => toggle(false)}
      >
        <Modal.Header closeButton onHide={() => toggle(false)}>
          Comparativo de Planes
        </Modal.Header>
        <Modal.Body>
          <Table size="sm" variant="bordered">
            <thead>
              <tr>
                <th style={{ width: `${100 / (compare.length + 1)}%` }}>
                  <ButtonGroup className="w-100">
                    <Button
                      variant="primary"
                      className={
                        "bg-blue-dark " +
                        (rateType === "yearly" ? "selected" : "")
                      }
                      onClick={() => setRateType("yearly")}
                    >
                      Anual
                    </Button>
                    <Button
                      variant="primary"
                      className={
                        "bg-blue-dark " +
                        (rateType === "biyearly" ? "selected" : "")
                      }
                      onClick={() => setRateType("biyearly")}
                    >
                      Semestral
                    </Button>
                  </ButtonGroup>
                </th>
                {compare.map((plan) => (
                  <th style={{ width: `${100 / (compare.length + 1)}%` }}>
                    <div className="quote-modal-header">
                      <p> {plan.company}</p>
                      <p> {plan.name}</p>
                      <p>Cobertura Máxima: {plan.coverage}</p>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                <th>
                  <p>
                    Deducible Seleccionado <small>(dentro/fuera de USA):</small>
                  </p>
                </th>
                {compare.map((plan) => (
                  <th>
                    <div className="quote-modal-deductible">
                      <p>
                        {" "}
                        {formatMoney(plan.deductible)} /{" "}
                        {plan.rate && formatMoney(plan.rate.deductible_out)}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Beneficiario 1</th>
                {compare.map((plan) => (
                  <th style={{ width: `${100 / (compare.length + 1)}%` }}>
                    {formatMoney(plan.rate?.main_price[rateType])}
                  </th>
                ))}
              </tr>
              {compare[0].rate.couple_price && (
                <tr>
                  <th>Beneficiario 2 </th>
                  {compare.map((plan) => (
                    <th style={{ width: `${100 / (compare.length + 1)}%` }}>
                      {plan.rate?.couple_price !== null
                        ? formatMoney(plan.rate?.couple_price[rateType])
                        : null}
                    </th>
                  ))}
                </tr>
              )}
              {compare[0].rate.kids_price && (
                <tr>
                  <th>Dependientes</th>
                  {compare.map((plan) => (
                    <th style={{ width: `${100 / (compare.length + 1)}%` }}>
                      {plan.rate?.kids_price !== null
                        ? formatMoney(plan.rate?.kids_price[rateType])
                        : null}
                    </th>
                  ))}
                </tr>
              )}
              <tr className="bg-medium-blue">
                <th></th>
                <th className="text-center" colSpan={999}>
                  ENDOSOS ADICIONALES
                </th>
              </tr>
              <tr>
                <th>Costo Administrativo</th>
                {compare.map((plan) => {
                  let rider = plan.rate.riders.find(
                    (x) => x.name === "Costo Administrativo"
                  );
                  return (
                    <th>
                      {rider?.selected ? formatMoney(rider.price) : "--"}
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th>Complicaciones de Maternidad</th>
                {compare.map((plan) => {
                  let rider = plan.rate.riders.find(
                    (x) => x.name === "Complicaciones de Maternidad"
                  );
                  return (
                    <th>
                      {rider?.selected ? formatMoney(rider.price) : "--"}
                    </th>
                  );
                })}
              </tr>
              <tr>
                <th>Transplante de Organos</th>
                {compare.map((plan) => {
                  let rider = plan.rate.riders.find(
                    (x) => x.name === "Transplante de Órganos"
                  );
                  return (
                    <th>
                      {rider?.selected ? formatMoney(rider.price) : "--"}
                    </th>
                  );
                })}
              </tr>
              <tr className="bg-medium-blue">
                <th></th>
                <th className="text-center" colSpan={999}>
                  PRIMA TOTAL ANUAL
                </th>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                {compare.map((plan) => {
                  return <th>{formatMoney(totalize(plan, rateType))}</th>;
                })}
              </tr>
            </tfoot>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Dropdown>
            <Dropdown.Toggle>Descargar</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={pdf.url||'#'} download='cotizacion.pdf' variant='success'>Solo Tarifas</Dropdown.Item>
              <Dropdown.Item href={pdfWithBenefits.url||'#'} download='cotizacion.pdf' variant='success'> Tarifas + Beneficios</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
            {/* <Button as='a' href={pdf.url||"#"} download='test.pdf' variant='success'>Descargar (PDF)</Button>*/}
            <Button variant="danger" onClick={() => toggle(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
