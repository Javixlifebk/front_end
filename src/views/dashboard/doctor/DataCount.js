import React from "react"
import { Row, Col,Card, CardBody,CardHeader,CardTitle } from "reactstrap"
import { Award } from "react-feather"
import { Pie,Bar } from "react-chartjs-2"
import decorLeft from "../../../assets/img/elements/decore-left.png"
import decorRight from "../../../assets/img/elements/decore-right.png"
import axios from "axios";

const $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $label_color = "#1E1E1E"
const themeColors = [$primary, $success, $danger, $warning, $label_color]
class DataCount extends React.Component {
  state = {
    tcases:0,
    picked:0,
    prescribed:0,
    pharmacies:0,
    screening:0,
    sevikas:0

  }
  componentDidMount () {
    if (
      localStorage.getItem ('javixid') === null ||
      localStorage.getItem ('javixid') === '0'
    ) {
      document.location = '/dashboard/doceditprofile';
    }

    this.mounted = true;
    //this.setState({data:null});

    axios
      .post ('https://javixlife.org/api/graph/getlist', {
        ngoId:localStorage.getItem("ngoId"),
        userId: localStorage.getItem ('userid'),
        token: 'dfjkhsdfaksjfh3756237',
      })
      .then (response => {
        //console.dir(response.data.data.data)

        if (response.data.status === 1) {
          var recs = response.data.data.data[2];
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
          
        } else {
        }
      })
      .catch (e => {
        if (e.response.data.status === 0) {
          this.state.notfound = 0
        }
      });
  }
//   componentDidMount() {
//   if(localStorage.getItem("javixid")===null || localStorage.getItem("javixid")==="0"){
//     document.location="/dashboard/doceditprofile";
//   }

//   this.mounted = true;
//   //this.setState({data:null});
      
//     axios.post('https://javixlife.org/api/screening/getCaseDetails', { doctorId:localStorage.getItem("usermasid") })
//    .then(response => {

//          console.dir("Data Length=" + response.data.data.data.length)
//          if(response.data.status===1){
//           this.setState({tcases:response.data.data.data.length}) 
//          }
        
        
        
//    })
//    .catch(e=>{
    
    
//     if(e.response.data.status===0){
//       this.state.notfound=0

//     }
//   });

//   axios.post('https://javixlife.org/api/citizen/citizenRefercount')
//   .then(response => {

//         console.dir("Data Length=" + response.data.data)
//         // if(response.data.status===1){
//          this.setState({picked:response.data.data}) 
//         // }
       
       
       
//   })
//   .catch(e=>{
   
   
//    if(e.response.data.status===0){
//      this.state.notfound=0

//    }
//  });

//  axios.post('https://javixlife.org/api/citizen/citizenPrescribeCount')
//   .then(response => {

        
//         // if(response.data.data.status===1){
//           console.log("Data Length+++=" + response.data.data)
//          this.setState({prescribed:response.data.data}) 
//         // }
       
       
       
//   })
//   .catch(e=>{
   
   
//    if(e.response.data.status===0){
//      this.state.notfound=0

//    }
//  });
// }
getCaseDetails(_type){
     if(_type==="Total"){
       localStorage.setItem("_status","1");
       localStorage.setItem("caseType","Total Cases")
       document.location="/dashboard/casedetails";
     }else if(_type=="Picked"){
      localStorage.setItem("_status","2");
      localStorage.setItem("caseType","Picked Cases")
      document.location="/dashboard/casedetails";
     }
     else if(_type=="Prescribed"){
      localStorage.setItem("_status","3");
      localStorage.setItem("caseType","Prescribed Cases")
      document.location="/dashboard/casedetails";
     }
}
  render() {

 

    const data = {
      labels: ["Referred Cases",  "Prescribed Cases","Pending Cases"],
      datasets: [
        {
          label: "Total Cases Count",
          data: [this.state.citizenrefer, this.state.citizenprescibeCount, this.state.citizenrefer],
          backgroundColor: themeColors
        }
      ]
    }

    const options = {
      responsive: true,
      responsiveAnimationDuration: 500,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Case Details"
      }
    }
    return (
      <div>
      {/* <Row className="match-height"  style={{textAlign:"center"}}>
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle ></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center",cursor:"pointer"}} onClick={() =>this.getCaseDetails("Total")}>  
      <span style={{textAlign:"center"}}><h3>Total Cases</h3></span>                       
      <h5>{this.state.tcases}</h5>  
      </CardBody>
      </Card>
      </Col>
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle style={{textAlign:"center"}}></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center",cursor:"pointer"}} onClick={() =>this.getCaseDetails("Picked")}> 
      <span style={{textAlign:"center"}}><h3>Cases Picked (Pending)</h3></span>                        
      <h5>{this.state.picked}</h5>  
      </CardBody>
      </Card>
      </Col>
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}> 
      <span style={{textAlign:"center",cursor:"pointer"}} onClick={() =>this.getCaseDetails("Prescribed")}><h3>Prescribed Cases</h3></span>                        
      <h5>{this.state.prescribed}</h5>  
      </CardBody>
      </Card>
      </Col>
    

      </Row>
       */}

<Row className="match-height"  style={{textAlign:"center"}}>
      {/* <Col lg="3" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle ></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center",cursor:"pointer"}} onClick={() =>this.getCaseDetails("Total")}>  
      <span style={{textAlign:"center"}}><h4>Total Cases</h4></span>                       
      <h5>{this.state.tcases}</h5>  
      </CardBody>
      </Card>
      </Col> */}
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle style={{textAlign:"center"}}></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center",cursor:"pointer"}} onClick={() =>{ document.location='/dashboard/doctor/ReferAndPrescribedPatient'}}> 
      <span style={{textAlign:"center"}}><h4>All Prescribed and Referred Cases</h4></span>                        
      <h5>{this.state.citizenrefer}</h5>  
      </CardBody>
      </Card>
      </Col>
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}> 
      <span style={{textAlign:"center",cursor:"pointer"}} onClick={() =>{ document.location='/dashboard/admin/PrescriptionList'}}><h4>Prescribed Cases</h4></span>                        
      <h5>{this.state.citizenprescibeCount}</h5>  
      
      </CardBody>
      </Card>
      </Col>
      <Col lg="4" style={{textAlign:"center"}}>
      <Card style={{textAlign:"center"}}>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardBody style={{textAlign:"center"}}> 
      <span style={{textAlign:"center",cursor:"pointer"}} onClick={() =>{ document.location='/dashboard/doctor/ReferPatientList'}}><h4>Pending Cases</h4></span>                        
      <h5>{this.state.citizenrefer}</h5>  
      </CardBody>
      </Card>
      </Col>
    

      </Row>
      <Row>
<Col lg="6" style={{textAlign:"center"}}>
<Card>
    <CardHeader>
      <CardTitle>Bar Chart</CardTitle>
    </CardHeader>
    <CardBody>
    <Bar data={data} options={options} height={300} />
    </CardBody>
  </Card>
  </Col>
  <Col lg="6" style={{textAlign:"center"}}>
<Card>
    <CardHeader>
      <CardTitle>Pie Chart</CardTitle>
    </CardHeader>
    <CardBody>
    <Pie data={data} options={options} height={300}
     />
    </CardBody>
    <CardBody>
                <a style={{color:"blue"}}
                onClick={() =>this.getCaseDetails("Total")}
                >
                 Total Cases
                </a>
              </CardBody>
              <CardBody>
                <a
                style={{color:"blue"}}
                 onClick={() =>this.getCaseDetails("Picked")}
                >
                  Picked Cases
                </a>
              </CardBody>
              <CardBody>
                <a style={{color:"blue"}}
                  onClick={() =>this.getCaseDetails("Prescribed")}
                >
                 Prescribed Cases
                </a>
              </CardBody>
  </Card>
  </Col>
  </Row>
      </div>
    )
  }
}
export default DataCount
