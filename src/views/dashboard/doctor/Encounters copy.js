import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import * as Icon from "react-feather"
import axios from "axios";
import profileImg from "../../../assets/img/icons/viewprofile.png"
import vitalImg from "../../../assets/img/javix/vital.png"
import downloadIcon from "../../../assets/img/javix/download_small.png"
import lipidIcon from "../../../assets/img/javix/lipid.png"
import rapidIcon from "../../../assets/img/javix/rapid.png"
import sickleIcon from "../../../assets/img/javix/sickle_cell.png"
import lungIcon from "../../../assets/img/javix/lung.png"
import hemlIcon from "../../../assets/img/javix/hemo.png"
import glucoseIcon from "../../../assets/img/javix/gluecose.png"
import drugIcon from "../../../assets/img/javix/drug.png"

import { Color } from "ag-grid-community"
const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} placeholder="search" onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

class PatientList extends React.Component {

 

   downloadReport(caseId){
    
    
     //alert(caseId)

     //RequestBody body = RequestBody.create(mediaType, "caseId=" + rec.caseid);
     //String url="http://http://159.65.148.197/:3001/api/report/createCaseReport";

     
     var _url="http://google.co.in";
     /*axios.post('http://http://159.65.148.197/:3001/api/report/createCaseReport?=', { caseId:caseId,token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
					console.log("Returned data:", response.data.data.data);
        
					if(response.data.status===1)
					  {
						  var msg=response.data.message;        
              console.log("Returned URL :", response.data.data.data.filename);
						  _url="http://" + response.data.data.data.filename;
              this.state._myurl="http://" + response.data.data.data.filename;
					  }     

		 }).catch(e=>{
      console.log("Exception:"); 
      console.log(e);
    });*/

    document.location=this.state._myurl;
    //alert(this.state._myurl)
     //return(<a target='_blank' href={this.state._myurl}>Download</a>);
   }


   getData(row,test_type){
   
    /*{this.getData(row.drugtests,"Drug Test")}
           {this.getData(row.lipidpaneltests,"Lipid Panel")}
           {this.getData(row.sicklecells,"Sickle Cell")}
           {this.getData(row.thalassemias,"Thalaseemia")}
           {this.getData(row.lungfunctions,"Lung Function")}
           {this.getData(row.eyetests,"Eye Test")}
           {this.getData(row.hemoglobins,"Hemoglobin")}*/
    switch(test_type){
      case "Blood Glucose":
        return(<span >Blood Gluclose&nbsp;&nbsp;&nbsp;<span><a href="#" onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Rapid Test":
        return(<span>Rapid Test&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Drug Test":
        return(<span>Drug Test&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Lipid Panel":
        return(<span>Lipid Panel&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Sickle Cell":
        return(<span>Sickle Cell&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Thalaseemia":
        return(<span>Thalassemia&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Lung Function":
        return(<span>Lung Function&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Eye Test":
        return(<span>Eye Test&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;
      case "Hemoglobin":
        return(<span>Hemoglobin&nbsp;&nbsp;&nbsp;<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span><hr></hr></span>)
      break;

    }
    
    
    /*console.log(row);
    if(!row){
      alert("Not Null Data")
    //console.dir("row Data =" + row.thalassemias[0].createdAt);
    }
    else{alert('Null Data')}*/
   }

   getID(i){
    
     return(<span>{i}</span>)
     i++;
   }
    setBMI(val){
        if(val>18 && val<=25 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>25 && val<=30){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>30 || val<18){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }
    }
    setBP(bpsys,bpdia){

        if(bpsys<=120 && bpdia<=80){
            return(<span style={{background:'#008000',padding:'4px',color:'white',borderRadius:'25px;'}}>BP:{bpsys}/{bpdia}</span>);
         }else if((bpsys>120  && bpsys<=160) && (bpdia>80 && bpdia<=110)){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BP:{bpsys}/{bpdia}</span>);
         }else if(bpsys>160  &&  bpdia>110){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BP:{bpsys}/{bpdia}</span>);
         }else{
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BP:{bpsys}/{bpdia}</span>);
         }
    }
    setSOP2(val){
        if(val>95 && val<=100 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>SPO2:{val}</span>);
        }else if(val>89 && val<=94){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>SPO2:{val}</span>);
        }else if(val<89){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>SPO2:{val}</span>);
        }
    }
    setPulse(val){
        if(val>65 && val<=72 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Heart:{val}</span>);
        }else if(val>72 && val<=83){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Heart:{val}</span>);
        }else if(val>83){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Heart:{val}</span>);
        }else{
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Heart:{val}</span>);
        }
    }
    setTemp(val){
        if(val>94 && val<=99 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
        }else if(val>99 && val<=103){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
        }else if(val>103){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
        }else{
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
        }
    }

    setResp(val){
        if(val>12 && val<=20 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Resp:{val}</span>);
        }else if(val>20 && val<=30){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Resp:{val}</span>);
        }else if(val>30){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Resp:{val}</span>);
        }else{
            return(<span style={{background:'red',padding:'4px',color:'white'}}>Resp:{val}</span>);
        }
    }

    
 constructor(props) {
    super(props);	
  this.state = {
    
    _myurl:'',
    action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
    columns: [
      /*{
        name: "Date ",
        selector: "User",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}}  >
        
          <p className="text-bold-500 mb-0">{row.createdAt}</p>
             
          </div>
        )
      },
      
      /*{
        name: "Patient Details",
        selector: "User",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}}  onClick={() =>this.handleClick(row.citizenId)}>
        
          <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p>
          <p className="text-bold-500 mb-0">{row.citizenId}</p>         
          </div>
        )
      },*/
      {
        name: "",
        selector: "alerts",
        sortable: true,
        cell: row => (
         <div style={{width:'100%'}}> 
         <React.Fragment >


         <Row>
          <Col sm="6">
            <p>{this.getID()}</p>
           <p>{row.createdAt}</p>
           </Col>
           <Col sm="6">
           <a href="#" style={{cursor:"pointer"}}  onClick={() =>this.downloadReport(row.caseId)}> Download <img style={{width:'15px;'}} src={downloadIcon} /></a>
           </Col>
           </Row>
         
         <p><hr></hr></p>
          <div>          
          
                <Row>
                <Col sm="6">
                    <div style={{cursor:'pointer'}}>
                    <img style={{width:"40px"}} src={vitalImg}/>&nbsp;&nbsp;&nbsp;Vital Signs 
                    <p>&nbsp;</p>
                   
                    </div>
                   
                </Col>
                <Col lg="6" md="6">
              
              <div id="dv_vital" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr>
                    <td>Height</td>
                    <td>{row.height}&nbsp;Inches</td>
                  </tr>
                  <tr>
                    <td>Weight</td>
                    <td>{row.weight}&nbsp;Kg</td>
                  </tr>
                  <tr>
                    <td>BMI</td>
                    <td>{row.bmi}&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Blood Pressure</td>
                    <td>{row.bpsys}/{row.bpdia}&nbsp;mmHg</td>
                  </tr>
                  <tr>
                    <td>SPO2(%)</td>
                    <td>{row.spo2}&nbsp;spo2%</td>
                  </tr>
                  <tr>
                    <td>Respiratory Rate</td>
                    <td>{row.respiratory_rate}&nbsp;brpm</td>
                  </tr>
                  <tr>
                    <td>Heart Rate</td>
                    <td>{row.pulse}&nbsp;bpm</td>
                  </tr>
                  <tr>
                    <td>Temperature</td>
                    <td>{row.temperature}&nbsp;F</td>
                  </tr>
                  <tr>
                    <td>Arm</td>
                    <td>{row.arm}&nbsp;cm</td>
                  </tr>
                  <tr>
                    <td>Notes</td>
                    <td>{row.notes}</td>
                  </tr>
                </table>
              </div>
                  
                  </Col>
                </Row>
                      
          </div>                         
     
          <p><hr></hr></p>

          <div>
       
            <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={glucoseIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.bloodglucosetests,"Blood Glucose")}
            </div>
            </Col>

            <Col lg="6" md="6">
              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( BLOOD GLUCOSE REFERENCE SCALE HERE )</td></tr>
                  <tr>
                    <td>Blood Gluclose</td>
                    <td>{row.bloodglucosetests[0].bloodglucose}&nbsp;mg/dl</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{row.bloodglucosetests[0].type}</td>
                  </tr> 
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                  </Col>
                </Row>
           
            <Row>
             <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={rapidIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.labtests,"Rapid Test")}
            </div>
            </Col>
            <Col lg="6" md="6">
              
            <div id="dv_rapid" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( RAPID TEST REPORT )</td></tr>                  
                </table>
              </div>
                  
            </Col>
            </Row>  

           <Row>
             <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={drugIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.drugtests,"Drug Test")}
            </div>
            </Col>
            <Col lg="6" md="6">              
            <div id="dv_drug" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( DRUG TEST REPORT )</td></tr>                  
                </table>
            </div>                  
            </Col>
            </Row>

           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={lipidIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.lipidpaneltests,"Lipid Panel")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( LIPID PANEL TEST RESULTS )</td></tr>
                  <tr>
                    <td>Cholesterol</td>
                    <td>{row.lipidpaneltests[0].cholesterol} &nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>HDL Cholesterol</td>
                    <td>{row.lipidpaneltests[0].hdlcholesterol}&nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>Trioglycerides</td>
                    <td>{row.lipidpaneltests[0].triglycerides}&nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>Glucose</td>
                    <td>{row.lipidpaneltests[0].glucose} &nbsp;Mg/dl</td>
                  </tr>                  
                  <tr>
                    <td>LDL</td>
                    <td>{row.lipidpaneltests[0].ldl} &nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>TCL LDL</td>
                    <td>{row.lipidpaneltests[0].tcl_hdl}</td>
                  </tr>
                  <tr>
                    <td>LDL HDL</td>
                    <td>{row.lipidpaneltests[0].ldl_hdl}</td>
                  </tr>
                  <tr>
                    <td>NON HDL</td>
                    <td>{row.lipidpaneltests[0].non_hdl}</td>
                  </tr>

                  <tr>
                    <td>TYPE</td>
                    <td>{row.lipidpaneltests[0].type}</td>
                  </tr>
                 
                  
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={sickleIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.sicklecells,"Sickle Cell")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( SICKLE CELL Cell TEST RESULTS )</td></tr>
                  <tr>
                    <td>Sickle Cell</td>
                    <td>{row.sicklecells[0].SickleCell}</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>
           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={vitalImg}/>&nbsp;&nbsp;&nbsp;{this.getData(row.thalassemias,"Thalaseemia")}  
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( THALASSEMIA TEST RESULTS )</td></tr>
                  <tr>
                    <td>Thalassemia</td>
                    <td>{row.thalassemias[0].Thalassemia}</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={lungIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.lungfunctions,"Lung Function")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( LUNG FUNCTION TEST RESULTS )</td></tr>
                  <tr>
                    <th>Parameters</th><th>Predicted</th><th>Actual</th><th>%Predicted</th>
                  </tr>
                  <tr>
                    <td>FVC(L)</td>
                    <td>{row.lungfunctions[0].fvc_predicted}</td>
                    <td>{row.lungfunctions[0].fvc_actual}</td>
                    <td>{row.lungfunctions[0].fvc_predicted_percent}</td>
                  </tr>                 

                  <tr>
                    <td>FEV1(L)</td>
                    <td>{row.lungfunctions[0].fev1_predicted}</td>
                    <td>{row.lungfunctions[0].fev1_actual}</td>
                    <td>{row.lungfunctions[0].fev1_predicted_percent}</td>
                  </tr>                
                  
                  <tr>
                    <td>FVC1%(L)</td>
                    <td>{row.lungfunctions[0].fvc1_predicted}</td>
                    <td>{row.lungfunctions[0].fvc1_actual}</td>
                    <td>{row.lungfunctions[0].fvc1_predicted_percent}</td>
                  </tr>                

                  <tr>
                    <td>PEF(L/s)</td>
                    <td>{row.lungfunctions[0].pef_predicted}</td>
                    <td>{row.lungfunctions[0].pef_actual}</td>
                    <td>{row.lungfunctions[0].pef_predicted_percent}</td>
                  </tr>              

                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={vitalImg}/>&nbsp;&nbsp;&nbsp;{this.getData(row.eyetests,"Eye Test")}  
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( EYE TEST RESULTS )</td></tr>
                  <tr>
                    <td>Eye Test</td>
                    <td>{row.eyetests[0].eyetest}&nbsp;mtr</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>


           <Row>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={hemlIcon}/>&nbsp;&nbsp;&nbsp;{this.getData(row.hemoglobins,"Hemoglobin")} 
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" style={{width:'100%',background:'#fafafa',border:'solid 1px silver'}}>
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( HEMOGLOBIN TEST RESULTS )</td></tr>
                  <tr>
                    <td>Hemoglobin</td>
                    <td>{row.hemoglobins[0].hemoglobin}&nbsp;gl/dl</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{row.bloodglucosetests[0].notes}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>
          </div>
          </React.Fragment>  
          </div>
        )
      }
    ],
    data: [],
    filteredData: [],
    value: "",
	recs:[]
  }
  this.loadRecs = this.loadRecs.bind(this);
} // cosntructor
loadRecs(recs)
 {
	 
	 this.setState({data:recs});
	 console.log(this.state.recs);
 }

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  console.log("CitizenId=" + _userid)
  window.location='../../views/dashboard/patientview'  
}

 handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='../../views/dashboard/reportissue'
 } 
}
  
componentDidMount() {console.log("DID MOUNT ************");
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://http://159.65.148.197/:3001/api/screening/getEncounters?=', { citizenId:'162219685397965216',token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
					console.log("Returned data:", response.data.status);
          console.log("User MasterId=" + localStorage.getItem("usermasid"))
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
					  }
		 });// then



     axios.post('http://http://159.65.148.197/:3001/api/report/createCaseReport?=', { caseId:'162220028503244889',token:'dfjkhsdfaksjfh3756237' })
    .then(response => {
         console.log("Returned data:", response.data.data.data);
       
         if(response.data.status===1)
           {
             var msg=response.data.message;        
             console.log("Returned URL :", response.data.data.data.filename);
            
             this.state._myurl= response.data.data.data.filename;
           }     

    }).catch(e=>{
     console.log("Exception:"); 
     console.log(e);
   });

}

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
		  console.dir(item.userId);
        let startsWithCondition =
          item.userId.toLowerCase().startsWith(value.toLowerCase()) ||
           item.info.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
           item.info.lastName.toLowerCase().startsWith(value.toLowerCase()) 
        let includesCondition =
          item.userId.toLowerCase().includes(value.toLowerCase()) ||
         item.info.firstName.toLowerCase().includes(value.toLowerCase()) ||
		 item.info.lastName.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null 
      })
      this.setState({ filteredData })
    }
	
  }

  /* render for all */
  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <React.Fragment >
         <Row>
      <Col lg="12" md="12">
      <Card>
        <CardHeader>
       
        </CardHeader>
        <CardBody className="rdt_Wrapper">
        <Row>
          <Col sm="12">
          <CardTitle>Encounter List</CardTitle>
          </Col>          
          </Row>
          <Row>
          <Col sm="12">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            pagination
            subHeader
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
          </Col>
          </Row>
        </CardBody>
      </Card>
      </Col>
      </Row>
      </React.Fragment>
    )
  }
  /* ENd rebder */
}

export default PatientList
