import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import SalesCard from "./SalesCard"
//import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
//import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived"
//import AvgSession from "../../ui-elements/cards/analytics/AvgSessions"
//import SupportTracker from "../../ui-elements/cards/analytics/SupportTracker"
//import ProductOrders from "../../ui-elements/cards/analytics/ProductOrders"
//import SalesStat from "../../ui-elements/cards/analytics/Sales"
//import ActivityTimeline from "./ActivityTimeline"
//import DispatchedOrders from "./DispatchedOrders"
import "../../../assets/scss/pages/dashboard-analytics.scss"
//import PieChart from "../../charts/chart-js/PieChart"
//import BarChart from "../../charts/chart-js/BarChart"


/*let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $white = "#fff"*/

class SevikaDashboard extends React.Component {

  componentDidMount() {
  
  if(localStorage.getItem("javixid")=='null' || localStorage.getItem("javixid")=="0"){
    document.location="/dashboard/seveditprofile";
  }
  this.mounted = true;

}
  render() {
    return (
 
     <React.Fragment>
        <Row className="match-height">
          <Col>
          <Card>
            <CardBody>
          <h3>Sevika's Dashboard</h3>
          </CardBody>
          </Card>
          </Col>
          </Row>
        <Row className="match-height">
          <Col>
            <SalesCard />
          </Col>         
        </Row>        
     
      </React.Fragment>
    )
  }
}

export default SevikaDashboard
