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
     //String url="http://javixlife.org:3010/api/report/createCaseReport";

     
     var _url="http://google.co.in";
     /*axios.post('http://javixlife.org:3010/api/report/createCaseReport?=', { caseId:caseId,token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
        
					if(response.data.status===1)
					  {
						  var msg=response.data.message;        
						  _url="http://" + response.data.data.data.filename;
              this.state._myurl="http://" + response.data.data.data.filename;
					  }     

		 }).catch(e=>{
    });*/

    //document.location=this.state._myurl;
    //alert(this.state._myurl)
     //return(<a target='_blank' href={this.state._myurl}>Download</a>);
     window.open(
      this.state._myurl,
      '_blank' // <- This is what makes it open in a new window.
    );
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
        return(<span >Blood Gluclose<span><a href="#" onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Rapid Test":
        return(<span>Rapid Test<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Drug Test":
        return(<span>Drug Test<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Lipid Panel":
        return(<span>Lipid Panel<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Sickle Cell":
        return(<span>Sickle Cell<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Thalaseemia":
        return(<span>Thalassemia<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Lung Function":
        return(<span>Lung Function<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Eye Test":
        return(<span>Eye Test<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;
      case "Hemoglobin":
        return(<span>Hemoglobin<span><a href="#"  onClick={() =>this.downloadReport('0')}></a></span></span>)
      break;

    }
    
    
    /*
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
           <p><button data-toggle="collapse" data-target="#date">{row.createdAt}</button></p>
           </Col>
           <Col sm="6">
           <a href="#" style={{cursor:"pointer"}}  onClick={() =>this.downloadReport(row.caseId)}> Download <img style={{width:'15px;'}} src={downloadIcon} /></a>
           </Col>
           </Row>
         
        
                            
 

          <div id="date"> 
          <div >          
          
          <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
          <Col sm="6">
              <div style={{cursor:'pointer'}}>
              <img style={{width:"40px"}} src={vitalImg}/><button data-toggle="collapse" data-target="#dv_vital">Vital Signs</button>
              <p>&nbsp;</p>
             
              </div>
             
          </Col>
          <Col lg="6" md="6">
        
        <div id="dv_vital" >
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
    <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={glucoseIcon}/><button data-toggle="collapse" data-target="#dv_gluclose">Blood Glucose</button>
            </div>
            </Col>

            <Col lg="6" md="6">
              
              <div id="dv_gluclose" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  
                  <tr>
                    <td>Blood Gluclose</td>
                    <td>{this.isNull(row.bloodglucosetests,"Blood Glucose","bloodglucose")}&nbsp;mg/dl</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{this.isNull(row.bloodglucosetests,"Blood Glucose","type")}</td>
                  </tr> 
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.bloodglucosetests,"Blood Glucose","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                  </Col>
                </Row>
           
                <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
             <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={rapidIcon}/>{this.getData(row.labtests,"Rapid Test")}
            </div>
            </Col>
            <Col lg="6" md="6">
              
            <div id="dv_rapid" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( RAPID TEST REPORT )</td></tr>                  
                </table>
              </div>
                  
            </Col>
            </Row>  

            <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
             <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={drugIcon}/>{this.getData(row.drugtests,"Drug Test")}
            </div>
            </Col>
            <Col lg="6" md="6">              
            <div id="dv_drug" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( DRUG TEST REPORT )</td></tr>                  
                </table>
            </div>                  
            </Col>
            </Row>

            <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{"width":"40px"}} src={lipidIcon}/>{this.getData(row.lipidpaneltests,"Lipid Panel")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( LIPID PANEL TEST RESULTS )</td></tr>
                  <tr>
                    <td>Cholesterol</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","cholesterol")} &nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>HDL Cholesterol</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","hdlcholesterol")}&nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>Trioglycerides</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","triglycerides")}&nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>Glucose</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","glucose")} &nbsp;Mg/dl</td>
                  </tr>                  
                  <tr>
                    <td>LDL</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","ldl")} &nbsp;Mg/dl</td>
                  </tr>
                  <tr>
                    <td>TCL LDL</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","tcl_hdl")}</td>
                  </tr>
                  <tr>
                    <td>LDL HDL</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","ldl_hdl")}</td>
                  </tr>
                  <tr>
                    <td>NON HDL</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","non_hdl")}</td>
                  </tr>

                  <tr>
                    <td>TYPE</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","type")}</td>
                  </tr>
                 
                  
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.lipidpaneltests,"Lipid","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

              <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={sickleIcon}/>{this.getData(row.sicklecells,"Sickle Cell")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose">
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( SICKLE CELL Cell TEST RESULTS )</td></tr>
                  <tr>
                    <td>Sickle Cell</td>
                    <td>{this.isNull(row.sicklecells,"Sickle","SickleCell")}</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.sicklecells,"Sickle","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>
              <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={vitalImg}/>{this.getData(row.thalassemias,"Thalaseemia")}  
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( THALASSEMIA TEST RESULTS )</td></tr>
                  <tr>
                    <td>Thalassemia</td>
                    <td>{this.isNull(row.thalassemias,"Thalassemia","Thalassemia")}</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.thalassemias,"Thalassemia","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

              <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={lungIcon}/>{this.getData(row.lungfunctions,"Lung Function")}
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( LUNG FUNCTION TEST RESULTS )</td></tr>
                  <tr>
                    <th>Parameters</th><th>Predicted</th><th>Actual</th><th>%Predicted</th>
                  </tr>
                  <tr>
                    <td>FVC(L)</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc_predicted")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc_actual")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc_predicted_percent")}</td>
                  </tr>                 

                  <tr>
                    <td>FEV1(L)</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fev1_predicted")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fev1_actual")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fev1_predicted_percent")}</td>
                  </tr>                
                  
                  <tr>
                    <td>FVC1%(L)</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc1_predicted")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc1_actual")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","fvc1_predicted_percent")}</td>
                  </tr>                

                  <tr>
                    <td>PEF(L/s)</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","pef_predicted")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","pef_actual")}</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","pef_predicted_percent")}</td>
                  </tr>              

                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.lungfunctions,"Lung","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>

              <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={vitalImg}/>{this.getData(row.eyetests,"Eye Test")}  
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose" >
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( EYE TEST RESULTS )</td></tr>
                  <tr>
                    <td>Left Eye Test</td>
                    <td>{this.isNull(row.eyetests,"Eye","leyetest")}&nbsp;mtr</td>
                  </tr>
                  <tr>
                    <td>Right Eye Test</td>
                    <td>{this.isNull(row.eyetests,"Eye","reyetest")}&nbsp;mtr</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.eyetests,"Eye","notes")}</td>
                  </tr>
                </table>
              </div>
                  
                </Col>
              </Row>
              <Row style={{border:'solid 1px #dadada',padding:'10px'}}>
            <Col sm="6">
             <div style={{cursor:'pointer'}}>
             <img style={{width:"40px"}} src={hemlIcon}/>{this.getData(row.hemoglobins,"Hemoglobin")} 
            </div>
            </Col>
            <Col lg="6" md="6">              
              <div id="dv_gluclose">
                <table style={{width:'100%',lineHeight:'10px;'}}>
                  <tr><td colSpan='2' style={{textAlign:'center'}}>( HEMOGLOBIN TEST RESULTS )</td></tr>
                  <tr>
                    <td>Hemoglobin</td>
                    <td>{this.isNull(row.hemoglobins,"Hemo","hemoglobin")}&nbsp;gl/dl</td>
                  </tr>
                  
                  <tr>
                    <td>Notes</td>
                    <td>{this.isNull(row.hemoglobins,"Hemo","notes")}</td>
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
 }

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  window.location='/dashboard/patientview'  
}

isNull(data,test_type,field_name){
  if(data.length===0){
   
    return(
      <span style={{color:'red'}}>-</span>
    )
  }else{
    switch(test_type){
      case "Blood Glucose":
      return(<span>{data[0][field_name]}</span>);
    break;
    case "Lipid":
      return(<span>{data[0][field_name]}</span>);
      break;
      case "Sickle":
        return(<span>{data[0][field_name]}</span>);
        break;
        case "Thalassemia":
          return(<span>{data[0][field_name]}</span>);
          break;
          case "Lung":
          return(<span>{data[0][field_name]}</span>);
          break;
          case "Eye":
            return(<span>{data[0][field_name]}</span>);
            break;
            case "Hemo":
              return(<span>{data[0][field_name]}</span>);
              break;
      
    }
  }
}


 handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='/dashboard/reportissue'
 } 
}
  
componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://javixlife.org:3010/api/screening/getEncounters?=', { citizenId:localStorage.getItem("citizenId"),token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
					  }
		 });// then

   

     axios.post('http://javixlife.org:3010/api/report/createCaseReport?=', { caseId:localStorage.getItem("caseId"),token:'dfjkhsdfaksjfh3756237' })
    .then(response => {
       
         if(response.data.status===1)
           {
             var msg=response.data.message;        
            
             this.state._myurl= response.data.data.data.filename;
           }     

    }).catch(e=>{
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