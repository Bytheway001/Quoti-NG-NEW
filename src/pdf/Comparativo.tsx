import React from "react";
import { Document, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Page, Row, Col, Cell } from "./grid";

import { ICompare } from "../screens/comparador/types";

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

export const ComparePage: React.FC<{ comparativo: ICompare | null }> = ({
  comparativo,
}) => {
  return (
    <Page size="LEGAL" orientation="landscape">
      <Row fixed>
        <Col>
          <Text style={styles.title}>COMPARATIVO DE BENEFICIOS</Text>
        </Col>
      </Row>
      <Row fixed>
        <Col
          style={{
            backgroundColor: darkBlue,
            padding: 5,

            borderColor: "gray",
          }}
        >
          <Text style={{ fontSize: 12, color: "white" }}>PLAN</Text>
        </Col>
        {comparativo &&
          comparativo.plans.map((plan, key: number) => (
            <Col style={{ padding: 5, backgroundColor: darkBlue }}>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "white" }}
              >
                {plan.name.toUpperCase()}
              </Text>
            </Col>
          ))}
      </Row>

      {comparativo &&
        comparativo.benefits.map((benefit, key: number) => (
          <Row wrap={false} style={{backgroundColor: key % 2 === 0 ? lightBlue : "white",padding: 0,}}>
            <Col
              style={{
                backgroundColor: darkBlue,
                padding: 5,
                borderWidth: 1,
                borderColor: "gray",
              }}
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                {benefit.name}
              </Text>
            </Col>
            {comparativo.plans.map((plan, keyplan: number) => (
              <Col style={{ padding: 5 }}>
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  {plan.benefits
                    .find((b) => b.name === benefit.name)
                    ?.description.replaceAll("\\", "\n\n") || "--"}
                </Text>
              </Col>
            ))}
          </Row>
        ))}
    </Page>
  );
};

export const ComparePDF: React.FC<{ comparativo: ICompare | null }> = ({
  comparativo,
}) => {
  return (
    <Document>
      <ComparePage comparativo={comparativo} />
    </Document>
  );
};
