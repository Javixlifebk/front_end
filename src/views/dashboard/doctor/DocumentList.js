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
import AddDocuments from "./AddDocuments"
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
      
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
    columns: [
      
      {
        name: "Documents",
        selector: "User",
        sortable: true,
        cell: row => (
         <div >
        
         <p>{row.type}</p>     
          </div>
        )
      },
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
          name: "Report",
          selector: "User",
          sortable: true,
          cell: row => (
           <div >          
           <p><a href={row.recordUrl}><img style={{cursor:'pointer'}}  
                src={pdfImg}
                width="32px"
                alt="pdfImg"
                className="img-fluid img-border rounded-circle box-shadow-1"
              /></a></p>     
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
  axios.post('http://localhost:3001/api/citizen/documentList?=', { citizenId:localStorage.getItem("citizenId")})
  .then(response => {
       console.log("Returned data:", response.data.status);
      
       if(response.data.status===1)
         {
           var msg=response.data.message;
           var recs=response.data.data.data;
           
           
         }
  }).catch(e=>{
   console.log("Exception:"); 
   console.log(e);
 });
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
		  axios.post('http://localhost:3001/api/citizen/documentsList?=', { citizenId:localStorage.getItem("citizenId"),token:'dfjkhsdfaksjfh3756237'})
		 .then(response => {
					console.log("Returned data:", response.data.status);
          console.log("User MasterId=" + localStorage.getItem("usermasid"))
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
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
        <AddDocuments/>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
        <Row>          
          <Col sm="12">
          <CardTitle>Document Lists</CardTitle>
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
