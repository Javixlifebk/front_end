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

class ScreenerCasesList extends React.Component {

 

 


    
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
         <div style={{cursor:'pointer'}} >
        
         <p className="text-bold-500 mb-0">{row.fullname}</p> 
          {/* <p className="text-bold-500 mb-0">{row.citizenId}</p>          */}
          </div>
        )
      },
      {
        name: "CaseId ",
        selector: "User",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}}  >
        
          <p className="text-bold-500 mb-0">{row.caseId}</p>
             
          </div>
        )
      },
      
    
      {
        name: "Citizen Id",
        selector: "User",
        sortable: true,
        cell: row => (
         <div style={{cursor:'pointer'}} >
        
         {/* <p className="text-bold-500 mb-0">{row.fullname}</p>  */}
          <p className="text-bold-500 mb-0">{row.citizenId}</p>         
          </div>
        )
      },
     
       

         
        
                            
 

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
    let scrId=localStorage.getItem("screenerId");
    console.log(scrId, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    axios.post('http://javixlife.org:3010/api/screening/getscreenercases?', {token:'dfjkhsdfaksjfh3756237',screenerId:scrId})
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

export default ScreenerCasesList
