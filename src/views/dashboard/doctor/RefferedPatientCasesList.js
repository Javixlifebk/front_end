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
import { useParams } from "react-router-dom";
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
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


class PatientList extends React.Component {

  loadData(){
    localStorage.removeItem("caseReport"); 
    axios.post('http://localhost:3010/api/report/createHistoryReport?=', { citizenId:localStorage.getItem("citizenId")})
    .then(response => {  
         if(response.data.status===1){
             var msg=response.data.message;
             //var recs=response.data.data.data;
             if( response.data.data.data.filename!==null){
              //this.state._myurl=response.data.data.data.filename;
              //localStorage.setItem("caseReport",response.data.data.data.filename);
                this.state.imgUrl=response.data.data.data.filename;
               console.dir("Drug Allery Report" + response.data.data.data.filename); 
             } 
           }
    }).catch(e=>{
   });
  }

  handleClick(_userid,_caseid,row) {
    localStorage.removeItem("caseReport")  
    localStorage.setItem("citizenId",_userid);
    localStorage.setItem("caseId",_caseid);
    this.loadData();
    
    localStorage.setItem("caseReport",this.state.imgUrl);
    var roleId=localStorage.getItem("roleId");
    if(roleId==='1'){
  
      window.location='/dashboard/patientview'
    }else{
      window.location='/dashboard/patientviewscreener'
    }
    
  }
  


  setBMI(val,val1){
    if(val>18 && val<=25 ){
        return(<span style={{background:'#008000',padding:'4px',color:'white'}}>BMI:{val}</span>);
    }else if(val>25 && val<=30){
        return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BMI:{val}</span>);
    }else if(val>30 || val<18){
        return(<span style={{background:'red',padding:'4px',color:'white'}}>BMI:{val}</span>);
    }
}
setSOP2(val,val1){
  if(val1===0 ){
      return(<span style={{background:'#008000',padding:'4px',color:'white'}}>SPO2:{val}</span>);
  }else if(val1===1){
      return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>SPO2:{val}</span>);
  }else{
      return(<span style={{background:'red',padding:'4px',color:'white'}}>SPO2:{val}</span>);
  }
}
setPulse(val,val1){
  if(val1===0 ){
      return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Heart:{val}</span>);
  }else if(val1===1){
      return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Heart:{val}</span>);
  }else{
      return(<span style={{background:'red',padding:'4px',color:'white'}}>Heart:{val}</span>);
  }
}
setTemp(val,val1){
  if(val1===0){
      return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
  }else if(val1===1){
      return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
  }else{
      return(<span style={{background:'red',padding:'4px',color:'white'}}>Temp(F):{val}</span>);
  }
}

setResp(val,val1){
  if(val1===0 ){
      return(<span style={{background:'#008000',padding:'4px',color:'white'}}>Resp:{val}</span>);
  }else if(val1===1){
      return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>Resp:{val}</span>);
  }else{
      return(<span style={{background:'red',padding:'4px',color:'white'}}>Resp:{val}</span>);
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
  
  
 

    

    
 constructor(props) {
    super(props);	
  this.state = {
    
    _myurl:'',
    action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
    columns: [
      {
        name: "Patient Details",
        selector: "User",
        sortable: true,
        cell: row => (

         
         <div style={{cursor:'pointer'}}  onClick={() =>this.handleClick(row.citizenId,row.caseId,row)}>
          {this.loadData()},
          {/* {console.log("%%%%%%%%%%%%%%%%%%",row.screeners[0].firstName)} */}
          <p className="text-bold-500 mb-0">{row.firstName + ' ' + row.lastname}</p>
          <p className="text-bold-500 mb-0">{'CASE ID:' + ' ' + row.caseId}</p>
			<p className="text-bold-500 mb-0 text-info">{'Screener:' + ' ' + row.ScreenerFirstName + ' '+ row.ScreenerLastName }</p>		  
          </div>
        )
      },
      {
        name: "Alerts",
        selector: "alerts",
        sortable: true,
        cell: row => (
         <div>     
                                 
          <p className="text-bold-500 mb-0">
          <span>{this.setBMI(row.bmi,row.severity_bmi)}</span>&nbsp;&nbsp;
          <span style={{margin:'20px;',padding:'4px;'}}>{this.setBP(row.bpsys,row.bpdia,row.severity_bp)}</span>&nbsp;&nbsp;
          <span style={{margin:'20px;',padding:'4px;'}}>{this.setSOP2(row.spo2,row.severity_spo2)}</span>&nbsp;&nbsp;
          <span style={{margin:'20px;',padding:'4px;'}}>{this.setPulse(row.pulse,row.severity_pulse)}</span>&nbsp;&nbsp;
          <span style={{margin:'20px;',padding:'4px;'}}>{this.setTemp(row.temperature,row.severity_temperature)}</span>&nbsp;&nbsp;
          
          </p>
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



loadData(){
  localStorage.removeItem("caseReport"); 
  axios.post('http://localhost:3010/api/report/createHistoryReport?=', { citizenId:localStorage.getItem("citizenId")})
  .then(response => {  
       if(response.data.status===1){
           var msg=response.data.message;
           //var recs=response.data.data.data;
           if( response.data.data.data.filename!==null){
            //this.state._myurl=response.data.data.data.filename;
            //localStorage.setItem("caseReport",response.data.data.data.filename);
              this.state.imgUrl=response.data.data.data.filename;
             console.dir("Drug Allery Report" + response.data.data.data.filename); 
           } 
         }
  }).catch(e=>{
 });
}

 handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='/dashboard/reportissue'
 } 
}
// const { id } = useParams();
// let { id } = useParams();

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
    let scrId=localStorage.getItem("citizenId");
    console.log(scrId, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    axios.post('http://localhost:3010/api/screening/getCaseDetails?=', {token:'dfjkhsdfaksjfh3756237',citizenId:scrId,ngoId:localStorage.getItem("ngoId")})
		 .then(response => {
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
              console.log(recs, "111111111111111111111");
					  }
		 });// then

}
// ====================================

// ======================================



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
            noDataComponent="Loading...."
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
