import React, { useState } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { Loader } from "../../components/Loader";
import { useQuote } from "./context";
import { PlanCard } from "./PlanCard";

export const QuoteTable: React.FC = () => {
  const { quote, loading } = useQuote();
  const [company, setCompany] = useState("");
 
  if (loading) {
    return <Loader />;
  }
  if (quote) {
    const companyNames = Array.from(
      new Set(quote.plans.map((obj) => obj.company))
    );
    const filteredPlans = quote.plans.filter(
      (plan) => plan.company === company || company === ""
    );
    return (
      <Card.Body>
        <ButtonGroup size="sm" className="w-100 company-buttons">
          {companyNames.map((companyName: string, key: number) => (
            <Button onClick={() => setCompany(companyName)} key={key}>
              {companyName}
            </Button>
          ))}
        </ButtonGroup>
        <div className="quote-table-wrapper">
          <Row noGutters className="px-2">
            {filteredPlans.map((plan, key) => {
              return (
                <Col key={key} sm={4} className="mb-3">
                  <PlanCard plan={plan} />
                </Col>
              );
            })}
          </Row>
        </div>
      </Card.Body>
    );
  }
  return null;
};
