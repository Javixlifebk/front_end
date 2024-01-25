import React,{ useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import * as Icon from "react-feather"
import axios from "axios";

import pdfImg from "../../../assets/img/profile/user-uploads/pdf_download.jpg"
import { Modal } from "bootstrap"
import AddHistory from "./AddHistory"
import classnames from "classnames"
import { Eye, Code } from "react-feather"
import ModalForm from "./TestModel"
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
 constructor(props) {
    super(props);	
  this.state = {
    _myurl:'',
    medical:{
      "diabetes": "N/A",
      "high_bp": "N/A",
      "high_cholestrol": "N/A",
      "goiter": "N/A",
      "cancer": "N/A",
      "leukemia": "N/A",
      "psoriasis": "N/A",
      "agina": "N/A",
      "type_of_cancer": "N/A",
      "heart_problems": "N/A",
      "heart_murmur": "N/A",
      "pneumonia": "N/A",
      "pulmonary_embolism": "N/A",
      "asthma": "N/A",
      "emphysema": "N/A",
      "stroke": "N/A",
      "epilepsy": "N/A",
      "cataracts": "N/A",
      "kidney_disease": "N/A",
      "kidney_stones": "N/A",
      "chrohns_disease": "N/A",
      "colitis": "N/A",
      "anemia": "N/A",
      "jaundice": "N/A",
      "hepatitis": "N/A",
      "stomach": "N/A",
      "rheumatic_fever": "N/A",
      "tuberculosis": "N/A",
      "hiv_aids": "N/A",
      "other": "N/A",
      },
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
      columns: [
      
      /*{
        name: "Past History",
        selector: "User",
        sortable: true,
        cell: row => (
         <div >
        
         <p>{this.getData(row)}</p>     
          </div>
        )
      },*/
      { 
        name: "Created Date",
        selector: "User",
        sortable: true,
        cell: row => (
         <div >
        
         <p>{row.createdAt}</p>     
          </div>
        )},
        { 
          name: "Downloads",
          selector: "Downloads",
          sortable: true,
          cell: row => (
           <div>
            <p><a href="#"><img style={{cursor:'pointer'}}  
                src={pdfImg}
                width="32px"
                alt="pdfImg"
                onClick={() =>this.handleClick(row.citizenId)}
                className="img-fluid img-border rounded-circle box-shadow-1"
              /></a></p>
             {/* {this.handleClick(0)}          
            <p><a href={localStorage.getItem("caseReport")} target='blank'><img width="32px" src={pdfImg}/></a></p>      */}
          </div>
          )}         
      
    ],
    data: [],
    filteredData: [],
    value: "",
	recs:[]
  }
  this.loadRecs = this.loadRecs.bind(this);
} // cosntructor
loadRecs(recs){	 
	 this.setState({data:recs});
 }


//  handleClick(_userid) {    
  handleClick(_citizenId)  {    

   axios.post('https://javixlife.org/api/report/createMedicalHistReport?=', {citizenId:_citizenId, ngoId:localStorage.getItem("ngoId")})
  .then(response => {  
       if(response.data.status===1){
           var msg=response.data.message;
           var recs=response.data.data.data;
           window.open(response.data.data.data.filename, '_blank');
          //  document.location=response.data.data.data.filename;
           //var recs=response.data.data.data;
          //  if( response.data.data.data.filename!==null){
          //   this.state._myurl=response.data.data.data.filename;
          //     console.dir("Drug Allery Report" + response.data.data.data.filename); 
          //  } 
         }
  }).catch(e=>{
 });


}
getSplit(_var){

  //var arr=_var.split(",,,")

  return(<p></p>)
}
handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='/dashboard/reportissue'
 } 

}

getData(row){

var strKey="";
for (const [key, value] of Object.entries(row)) {
  strKey+=`${key}` + "&nbsp;";
  //dataArray[i]=`${key}`;
  //i++;  
}
  return (
    <span>{strKey}</span>
  )
}
  

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('https://javixlife.org/api/citizen/getHistoryMedical?=', { citizenId:localStorage.getItem("citizenId"),ngoId:localStorage.getItem("ngoId")})
		 .then(response => {
					if(response.data.status===1){
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
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
        <AddHistory/>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
        <Row>
          <Col lg="12" md="12"> </Col>
          <Col sm="12">
          <CardTitle>Medical History List</CardTitle>
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
