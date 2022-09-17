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

    setBMI(val,val1){
        if(val>18 && val<=25 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>25 && val<=30){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>30 || val<18){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }
    }
    setBP(bpsys,bpdia,val1){

        if(val1===0 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white',borderRadius:'25px;'}}>BP:{bpsys}/{bpdia}</span>);
         }else if(val1===1){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BP:{bpsys}/{bpdia}</span>);
         }else{
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BP:{bpsys}/{bpdia}</span>);
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
 constructor(props) {
    super(props);	
  this.state = {
      
    imgUrl:'',
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
    columns: [
      
      {
        name: "Patient Details",
        selector: "User",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}}  onClick={() =>this.handleClick(row.citizenId,row.caseId,row)}>
          {this.loadData()}
          <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p>
          <p className="text-bold-500 mb-0">{'CASE ID:' + ' ' + row.caseId}</p>
			<p className="text-bold-500 mb-0 text-info">{'Screener:' + ' ' + row.screeners[0].firstName + ' '+ row.screeners[0].lastName}</p>		  
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

loadData(){
  localStorage.removeItem("caseReport"); 
  axios.post('http://143.244.136.145:3001/api/report/createHistoryReport?=', { citizenId:localStorage.getItem("citizenId")})
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
  
componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
    /*let postData=""
     if(localStorage.getItem("roleId")==="1"){
      postData="doctorId:" + localStorage.getItem("usermasid")+ "&token:'dfjkhsdfaksjfh3756237'";
     }else if(localStorage.getItem("roleId")==="2" || localStorage.getItem("roleId")==="21"){
      postData="screenerId:" + localStorage.getItem("usermasid")+ "&token:'dfjkhsdfaksjfh3756237'";
     }*/
		  axios.post('http://143.244.136.145:3001/api/screening/getCaseDetails?=', {citizenId:localStorage.getItem("_citizenId"),token:'dfjkhsdfaksjfh3756237'})
		 .then(response => {
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
					  }
		 });// then
     localStorage.removeItem("caseReport"); 
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
         
           item.citizens[0].firstName.toLowerCase().startsWith(value.toLowerCase()) ||
           item.citizens[0].lastName.toLowerCase().startsWith(value.toLowerCase()) 
        let includesCondition =
          
        item.citizens[0].firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.citizens[0].lastName.toLowerCase().includes(value.toLowerCase())

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
          <CardTitle>Encounters List</CardTitle>
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
