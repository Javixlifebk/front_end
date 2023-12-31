import React from "react"
import { Card, CardBody } from "reactstrap"
import { Award } from "react-feather"

import decorLeft from "../../../assets/img/elements/decore-left.png"
import decorRight from "../../../assets/img/elements/decore-right.png"

class SalesCard extends React.Component {
  render() {
    return (
      <Card className="bg-analytics text-white sales-card">
        <CardBody className="text-center">
          
          <div className="award-info text-center">
            <h1 className="mb-2 text-white">     <div>Welcome {localStorage.getItem("firstName") +" " + localStorage.getItem("lastName")}</div></h1>
            
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default SalesCard
