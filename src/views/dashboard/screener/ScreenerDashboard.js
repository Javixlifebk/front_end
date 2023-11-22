import React from "react"
import { Row, Col, Card, CardBody,CardHeader,CardTitle } from "reactstrap"
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
import Chart from "react-apexcharts"
import axios from "axios";
import { Pie,Bar } from "react-chartjs-2"
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
  const $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $label_color = "#1E1E1E"
const themeColors = [$primary, $success, $danger, $warning, $label_color]

class ScreenerDashboard extends React.Component {

  state = {
    doctors:0,
    // ngos:0,
    // screeners:0,
    pharmacies:0,
    screening:0,
    sevikas:0,
    citizen:0,
    options: {
      colors: this.props.themeColors,
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: "rounded",
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      legend: {
        offsetY: -10
      },
      xaxis: {
        categories: [
          "Javix Actors"
        ]
      },
      yaxis: {
        title: {
          text: "Actors Counts"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return  val 
          }
        }
      }
    }
   


  }

  componentDidMount() {
   
  if(localStorage.getItem("javixid")===null || localStorage.getItem("javixid")==="0"){
    document.location="/dashboard/screditprofile";
  }

  this.mounted = true;
  //this.setState({data:null});
      
  axios.post('https://javixlife.org:3010/api/graph/getlist', {token:'dfjkhsdfaksjfh3756237',ngoId:localStorage.getItem("ngoId") ,userId:localStorage.getItem("userid"), ngoLoginId:localStorage.getItem('ngoId')})
   .then(response => {

        //console.dir(response.data.data.data)ngoLoginId:localStorage.getItem("ngoId")
        
        if(response.data.status===1){
          var recs=response.data.data.data[2];	
          //console.dir(recs)
          
          this.setState({screeners:response.data.data.data[0].Screeners}) 
          this.setState({doctors:response.data.data.data[1].Doctors}) 
           this.setState({ngos:response.data.data.data[2].NGO}) 
           this.setState({prescription:response.data.data.data[3].Prescription})
           this.setState({advancescreener:response.data.data.data[4].Sanyojika})
            this.setState({pendingadvancescreener:response.data.data.data[5].Sevika})
            this.setState({citizen:response.data.data.data[6].Citizen})
            this.setState({pharmacies:response.data.data.data[7].Pharmacy})
            this.setState({screening:response.data.data.data[8].Screening})
            this.setState({NonPrescription:response.data.data.data[9].NonPrescription})
            this.setState({mapsevika:response.data.data.data[10].mapsevika})
            this.setState({mapscreener:response.data.data.data[11].mapscreener})
            this.setState({mapdoctor:response.data.data.data[12].mapdoctor})
            this.setState({citizenprescibeCount:response.data.data.data[13].citizenprescibeCount})
            this.setState({citizenrefer:response.data.data.data[14].citizenrefer})
            this.setState({sevika:response.data.data.data[15].Sevikas})
      
        }else{
        }
        
   })
   .catch(e=>{
    if(e.response.data.status===0){
      this.state.notfound=0

    }
  });
}
  render() {
    const data = {
      // labels: ["Doctors",  "Screener","NGO", "Sevika","Screening","Pharmacy"],
      labels: ["Doctors", "Sevika","Screening","Pharmacy"],
      datasets: [
        {
          label: "Doctors Count",
          data: [this.state.doctors, this.state.screeners, this.state.ngos, this.state.sevika,this.state.screening,this.state.pharmacies],
          backgroundColor: themeColors
        }
      ]
    }

    const series= [
      {
        name: "Doctors",
        data: [this.state.doctors]
      },
      // {
      //   name: "Screener",
      //   data: [this.state.screeners]
      // },
      // {
      //   name: "NGO",
      //   data: [this.state.ngos]
      // },
      {
        name: "Sevika",
        data: [this.state.sevika]
      },
      {
        name: "Screening",
        data: [this.state.screening]
      },
      {
        name: "Pharmacy",
        data: [this.state.pharmacies]
      }
    ]
    
    const options = {
      responsive: true,
      responsiveAnimationDuration: 500,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Javix Users"
      }
    }
    return (
 
     <React.Fragment>
        <Row className="match-height">
          <Col>
          <Card>
            <CardBody>
          <h3>Screener's Dashboard</h3>
          </CardBody>
          </Card>
          </Col>
          </Row>
        <Row className="match-height">
          <Col>
            <SalesCard />
          </Col>         
        </Row>
     
      <Row className="match-height"  style={{textAlign:"center"}}>
      <Col lg="2" style={{textAlign:"center",cursor:'pointer'}}>

      <Card style={{textAlign:"center"}} onClick={() => {
                          document.location='/dashboard/admin/doctorlist';
                        }}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}}><h5>Doctors</h5></span>
            <h5>{this.state.doctors}</h5>              
          
      </CardBody>
      </Card>
      
      </Col>
     {/* <Col lg="2"  style={{textAlign:"center",cursor:'pointer'}}>
      <Card style={{textAlign:"center"}} onClick={() => {
                          document.location='/dashboard/admin/ngolist';
                        }}> 
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}}><h5>NGO</h5></span>
            <h5>{this.state.ngos}</h5>              
            
      </CardBody>
      
      </Card>
      </Col> */}
        
      {/* <Col lg="2"  style={{textAlign:"center",cursor:'pointer'}}>
      <Card style={{textAlign:"center"}} onClick={() => {
                          document.location='/dashboard/admin/screenerlist';
                        }}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}}><h5>Screeners</h5></span>
            <h5>{this.state.screeners}</h5>              
            
      </CardBody>
      </Card>
      </Col> */}
      <Col lg="2" style={{textAlign:"center",cursor:'pointer'}}>
      <Card style={{textAlign:"center"}} onClick={() => {
                          document.location='/dashboard/sevikalist';
                        }}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}}><h5>Sevikas</h5></span>
            <h5>{this.state.sevika}</h5>              
          
      </CardBody>
      </Card >
      </Col>
      <Col lg="2" style={{textAlign:"center",cursor:'pointer'}}>
      <Card style={{textAlign:"center"}} onClick={() => {
                          document.location='/dashboard/citizenlist';
                        }}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}}><h5>Citizen Screened</h5></span>
            <h5>{this.state.citizen}</h5>              
          
      </CardBody>
      </Card>
      </Col>
      <Col lg="2">
      <Card style={{cursor:'pointer'}} >
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}>
      <span style={{textAlign:"center"}} onClick={() => {
        document.location='/dashboard/pharmacylist';
      }}><h5>Pharmacies</h5></span>
            <h5>{this.state.pharmacies}</h5>              
          
      </CardBody>
      </Card>
      </Col>
      </Row> 
        <Row className="match-height"  style={{textAlign:"center"}}>
      <Col>
         <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardBody>
          <Pie data={data} options={options} height={300} />
          </CardBody>
        </Card>
      
      </Col>
      <Col>
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardBody>
          <Chart
            options={this.state.options}
            series={series}
            type="bar"
            height={350}
          />
          </CardBody>
        </Card>
      </Col>
      </Row>   
        
     
      </React.Fragment>
    )
  }
}

export default ScreenerDashboard
