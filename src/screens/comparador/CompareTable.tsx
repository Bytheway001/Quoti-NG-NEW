import React, { useState } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { Loader } from "../../components/Loader";
import { useCompare } from "./context";

export const CompareTable: React.FC = () => {
  const [category, setCategory] = useState<number>(0);
  function changeCategory(categoryName: number) {
    if (category === categoryName) {
      setCategory(0);
    } else {
      setCategory(categoryName);
    }
  }

  const { comparativo, loading } = useCompare();
  const columnWidth = 100 / (1 + (comparativo ? comparativo.plans.length : 0));

  if (comparativo) {
    return (
      <Card.Body>
        <ButtonGroup className="w-100 d-none d-xl-block">
          {comparativo?.categories.map((categoryName, index: number) => {
            let active =
              category === categoryName.id ? "active" : "";
            return (
              <Button
                onClick={() => changeCategory(categoryName.id)}
                className={`tab-button ${active}`}
                size="sm"
              >
                {categoryName.category_name}
              </Button>
            );
          })}
        </ButtonGroup>
        <div style={{ padding: 10 }} className="compare-table-wrapper">
          <Table variant="striped" responsive className="benefits-table">
            <thead>
              <tr>
                <th style={{ width: `${columnWidth}%` }}>Beneficio</th>
                <>
                  {comparativo?.plans.map((plan, key: number) => (
                    <th style={{ width: `${columnWidth}%` }}>{plan.name}</th>
                  ))}
                </>
              </tr>
            </thead>
            <tbody>
              {comparativo?.benefits.map((b) => {
                if (b.category_id === category || category===0) {
                  return (
                    <tr>
                      <th>{b.name}</th>
                      {comparativo.plans.map((plan,index)=>(
                        <td>{plan.benefits.find(x=>x.name === b.name)?.description}</td>
                      ))}
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return null;
};
