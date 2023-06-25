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
import AddPersonalHistory from "./AddPersonalHistory"
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

class PersonalHistoryList extends React.Component {


  
 constructor(props) {
    super(props);	
  this.state = {
      
      working:{"0":"No","1":"Yes"},
    columns: [
      
      /*{
        name: "Details",
        selector: "maritalstatus",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}}  onClick={() =>this.handleClick(row.citizenId)}>
        
         <p>Marital Status:-{row.maritalstatus}</p>  
         <p>Working:-{this.state.working[row.notworking]}</p>    
         <p>Occupation:-{row.ocupation}</p>    
        
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
              
            <p><a href={localStorage.getItem("caseReport")} target='blank'><img width="32px" src={pdfImg}/></a></p>     
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
loadRecs(recs)
 {
	 
	 this.setState({data:recs});
 }

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  window.location='/dashboard/patientview'  
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
    //alert(localStorage.getItem("caseReport"))
		//this.setState({data:null});
		  axios.post('http://18.60.238.252:3010/api/citizen/getHistoryPersonal?=', {citizenId:localStorage.getItem("citizenId"),ngoId: localStorage.getItem("ngoId")})
		 .then(response => {
					if(response.data.status===1)
					  {
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
       <AddPersonalHistory/>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
        <Row>
          <Col sm="12">
          <CardTitle>Personal History List</CardTitle>
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

export default PersonalHistoryList
