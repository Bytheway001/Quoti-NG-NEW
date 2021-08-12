import React from "react";
import { Document, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Page, Row, Col, Cell } from "./grid";
import { formatMoney } from "../utils/formatMoney";
import { totalize } from "../screens/cotizador/QuoteModal";
import { ICompare, IRider } from "../screens/cotizador/types";
import { useCompare } from "../screens/comparador/context";
import { useEffect } from "react";
import { ComparePage } from "./Comparativo";

const darkBlue = "#0747a6";
const lightBlue = "#5b86e5";
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    backgroundColor: "#0747a6",
    color: "white",
  },
});

const Header: React.FC<{
  data: { company: string; coverage: string; name: string };
  blank?: boolean;
}> = ({ data, blank }) => {
  var style = {
    minHeight: 80,
    padding: 8,
    borderWidth: 1,
    borderColor: darkBlue,
    borderRadius: 5,
    margin: 5,
    backgroundColor: darkBlue,
    color: "white",
  };

  return (
    <View style={{ ...style, justifyContent: "center" }}>
      <Text style={{ textAlign: "center", fontSize: 10 }}>{data.company}</Text>
      <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>
        {data.name}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 10, paddingTop: 3 }}>
        Cobertura Maxima
      </Text>
      <Text style={{ textAlign: "center", fontSize: 11, fontWeight: 1000 }}>
        {data.coverage}
      </Text>
    </View>
  );
};

const QuotePDFPage: React.FC<{
  quote: ICompare[];
  rates: string;
  benefits?: boolean;
}> = ({ quote, rates }) => {
  return (
    <Page size="LEGAL" orientation="landscape">
      <Row>
        <Col>
          <Text style={styles.title}>
            COTIZACIÓN DE SEGURO DE SALUD INTERNACIONAL {"\n"}
            
          </Text>
          <Text style={{...styles.title,padding:5,borderWidth:0,fontSize:12}}>
          {rates === 'yearly'?"Tarifas Anuales":"Tarifas Semestrales"}
          </Text>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        {quote.map((plan, key) => {
          return (
            <Col>
              <Header
                data={{
                  coverage: plan.coverage,
                  company: plan.company,
                  name: plan.name,
                }}
              />
            </Col>
          );
        })}
      </Row>
      <Row style={{ backgroundColor: darkBlue }}>
        <Col>
          <Cell style={{ textAlign: "left" }}>Deducible Seleccionado</Cell>
          <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
            Prima Titular
          </Cell>
          {quote[0].rate.couple_price && (
            <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
              Prima Conyugue
            </Cell>
          )}
          {quote[0].rate.kids_price && (
            <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
              Prima Dependientes
            </Cell>
          )}
        </Col>
        {quote.map((plan: ICompare, key: number) => (
          <Col>
            <Cell>{formatMoney(plan.deductible)}</Cell>
            <Cell style={{ backgroundColor: lightBlue }}>
              {formatMoney(plan.rate.main_price[rates])}
            </Cell>
            {quote[0].rate.couple_price && (
              <Cell style={{ backgroundColor: lightBlue }}>
                {formatMoney(
                  plan.rate?.couple_price ? plan.rate.couple_price[rates] : 0
                )}
              </Cell>
            )}
            {quote[0].rate.kids_price && (
              <Cell style={{ backgroundColor: lightBlue }}>
                {formatMoney(plan.rate?.kids_price?.yearly || 0)}
              </Cell>
            )}
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Cell style={{ backgroundColor: darkBlue }}>
            Endosos y Gastos Administrativos
          </Cell>
        </Col>
      </Row>
      <Row>
        <Col>
          <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
            Costo Administrativo
          </Cell>
          <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
            Comp. Maternidad
          </Cell>
          <Cell style={{ textAlign: "left", backgroundColor: lightBlue }}>
            Transplante de Órganos
          </Cell>
        </Col>
        {quote.map((plan: ICompare) => {
          let cadm = plan.rate.riders.find(
            (x: IRider) => x.name === "Costo Administrativo"
          );
          let cmat = plan.rate.riders.find(
            (x: IRider) => x.name === "Complicaciones de Maternidad"
          );
          let tor = plan.rate.riders.find(
            (x: IRider) => x.name === "Transplante de Órganos"
          );
          return (
            <Col>
              <Cell style={{ backgroundColor: lightBlue }}>
                {cadm?.selected
                  ? formatMoney(cadm.price)
                  : cadm?.available
                  ? "No Seleccionado"
                  : "No Disponible"}
              </Cell>
              <Cell style={{ backgroundColor: lightBlue }}>
                {cmat?.selected
                  ? formatMoney(cmat.price)
                  : cmat?.available
                  ? "No Seleccionado"
                  : "No Disponible"}
              </Cell>
              <Cell style={{ backgroundColor: lightBlue }}>
                {tor?.selected
                  ? formatMoney(tor.price)
                  : tor?.available
                  ? "No Seleccionado"
                  : "No Disponible"}
              </Cell>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <Cell style={{ backgroundColor: darkBlue }}>Prima Total Anual</Cell>
        </Col>
      </Row>
      <Row>
        <Col>
          <Cell></Cell>
        </Col>
        {quote.map((plan, key: number) => {
          return (
            <Col>
              <Cell
                style={{
                  color: "yellow",
                  backgroundColor: lightBlue,
                  fontSize: 14,
                }}
              >
                {formatMoney(totalize(plan, rates))}
              </Cell>
            </Col>
          );
        })}
      </Row>
    </Page>
  );
};

export const QuotePDF: React.FC<{
  quote: ICompare[];
  rates: string;
  benefits?: boolean;
}> = ({ quote, rates,benefits }) => {
  const {comparativo,compareActions}=useCompare();
  useEffect(()=>{
    if(benefits){
      let plans = Array.from(new Set(quote.map(p=>p.name)))
      compareActions.getCompare(plans)
    }
  },[benefits, compareActions, quote])
  return (
    <Document>
      <QuotePDFPage rates={rates} quote={quote} />
      {benefits && <ComparePage comparativo={comparativo}/>}
    </Document>
  );
};
