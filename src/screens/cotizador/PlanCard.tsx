import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import BD from "../../assets/img/icons/BD.png";
import VU from "../../assets/img/icons/VU.png";
import BU from "../../assets/img/icons/BU.png";
import AL from "../../assets/img/icons/AL.png";
import { formatMoney } from "../../utils/formatMoney";
import { useQuote } from "./context";
import { Rider } from "./Rider";
import { IPlan, IRider } from "./types";

const Images: { [key: string]: string } = {
  "Allianz Care": AL,
  "Bupa Salud": BU,
  "Best Doctors Insurance": BD,
  "Vumi Group": VU,
};

export const PlanCard: React.FC<{ plan: IPlan }> = ({ plan }) => {
  const { quoteActions } = useQuote();
  const [ded, setDed] = useState(-1);
  const rate = plan.rates.find((x) => x.deductible === ded);

  const handleRiderSelection = (plan:any,ded:any,name:string,value:boolean) => {
   
    quoteActions.selectRider(plan,ded,name,value)
  };

  const calculateTotal = (rateType: string = "yearly") => {
    let total = 0;
    if (rate) {
      if(rate.main_price){
        total += rate.main_price[rateType];
      }
     
      if (rate.couple_price) {
        total += rate.couple_price[rateType];
      }
      if (rate.kids_price) {
        total += rate.kids_price[rateType];
      }
      if(rate.riders){
        rate.riders.forEach((r:IRider)=>{
          if(r.selected){
            total+=r.price
          }
        })
      }
    }
    return formatMoney(total, { decimalCount: 2 });
  };
  return (
    <Card className="plan-card">
      <Card.Header>
        <Image src={Images[plan.company]} style={{ width: 48, height: 48 }} />
        <p className="mb-0" style={{ fontSize: "0.8em" }}>
          {plan.name}
        </p>
        <Badge variant='secondary' style={{position:'absolute',right:0,top:0,borderRadius:0,fontSize:16}}>{plan.year}</Badge>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="coverage-bg">
          <span>Cobertura Max:</span>
          <span> {plan.extra_params.coverage}</span>
        </div>
        <FormGroup
          size="sm"
          as={Row}
          className="mb-1 px-2 deductible"
          noGutters
        >
          <FormLabel column xs={12} xl={6} className="form-control-sm">
            Deducible:
          </FormLabel>
          <Col xl={6} xs={12}>
            <FormControl
              value={ded}
              size="sm"
              as="select"
              onChange={({ target }) => setDed(parseInt(target.value))}
            >
              <option value="-1">...</option>
              {plan.rates.map((x, key: number) => {
                return (
                  <option key={key} value={x.deductible}>
                    {formatMoney(x.deductible, { decimalCount: 0 })}
                  </option>
                );
              })}
            </FormControl>
          </Col>
        </FormGroup>
        <Row noGutters className="riders-area">
          <Col sm={12} className="py-2">
            {rate && ded !== -1 &&
              rate.riders.map((r, k: number) => {
                if(r.name==='Costo Administrativo') return null;
                console.log(r)
                return (
                  <>
                    <Rider
                      key={k}
                      rider={r}
                      onChange={(value:boolean) => handleRiderSelection(plan.name,ded,r.name,value)}
                    />
                  </>
                );
              })}
          </Col>
        </Row>

        <div className="text-center my-2">
          <Button variant="primary" onClick={() => quoteActions.addToCompare(plan,ded)}>
            Comparar
          </Button>
        </div>
      </Card.Body>
      <Card.Footer>
        <Table size="sm">
          <tbody>
            <tr>
              <th>Semestral</th>
              <th>Anual</th>
            </tr>
            <tr>
              <th>{rate && calculateTotal("biyearly")}</th>
              <th>{rate && calculateTotal("yearly")}</th>
            </tr>
          </tbody>
        </Table>
      </Card.Footer>
    </Card>
  );
};
