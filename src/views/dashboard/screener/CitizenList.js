import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import axios from "axios";
import loaderImg from "../../images/loader.gif"
import profileImg from "../../../assets/img/icons/viewprofile.png"
import pickImg from "../../../assets/img/icons/activate.png"


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

class JTable extends React.Component {
 constructor(props) {
    super(props);	
  this.state = {
    loader:<h2 align='center'><img src={loaderImg} width='400px' height='300px'></img></h2>,
     imagurl:'',
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
	  gsearch:"",
    columns: [
      {
        name: "Citizen",
        selector: "ID",
        sortable: true,
        style: { 'whiteSpace': 'unset' },
        minWidth: "50px",
        cell: row => (
          <div>
          
          <img
              src={this.getImage(row.info.photo)}
              width="40px"
              className="img-fluid img-border rounded-circle box-shadow-1"
            />
            </div>
        )
      },
      {
        name: "Citizen Name",
        selector: "User",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.firstName + " " + row.lastName}</p>
        )
      },
      {
        name: "Citizen ID",
        selector: "User",
        sortable: true,
        minWidth: "150px",
        style: { 'word-break': 'keep-all' },
        cell: row => (
          <p className="text-bold-500 mb-0">{row.citizenId}</p>
        )
      },
      {
        name: "Mobile",
        selector: "subject",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.mobile}</p>
        )
      },
      {
        name: "Email",
        selector: "issue",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{row.email}</p>
        )
      },
	  {
        name: "Screener",
        selector: "screener",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{row.firstName + ' ' + row.lastName}</p>
        )
      },
      {
        name: "On Boarding Date",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{row.createdAt}</p>
        )
      },
      {
        name: "Action",
        selector: "satus",
        sortable: true,
        cell: row => (
          <div>
            <span>
          <img
          src={profileImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.citizenId)}
          style={{width:"30px",cursor:"pointer"}}
          className="img-fluid img-border rounded-circle box-shadow-1"
        />
        </span>
        &nbsp;&nbsp;
        <span>
        <img
          src={pickImg}
          alt="profileImg"
          onClick={() =>this.getCaseDetails(row.citizenId)}
          style={{width:"30px",cursor:"pointer"}}
          className="img-fluid img-border rounded-circle box-shadow-1"
        />
        </span>

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
   this.setState({loader:null});
 }

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  //alert(_userid)
  window.location='../../views/dashboard/citizenprofile'  
}

 handleSubmit() {
  
  //alert('Hellow')
  if(localStorage.getItem("roleId")==="1" || localStorage.getItem("roleId")===1){
    alert("Sorry as a Doctor you are not entitled for this.");

  }else{
  window.location='../../views/dashboard/addcitizen'
  }
}
  
getImage(imagUrl){
  if(imagUrl===null || imagUrl===undefined || imagUrl==='' ){
    imagUrl='http://159.65.148.197:3001/profile/no-photo-male.jpg';
  }
 return imagUrl;
}

getCaseDetails(_citizenId){
  localStorage.setItem("_citizenId",_citizenId);
  document.location="../../views/dashboard/patientlist";  
}

componentDidMount() {console.log("DID MOUNT ************");
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://159.65.148.197:3001/api/citizen/citizenList100?', {token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
					console.log("Returned data:", response.data.status);
          console.log("User MasterId=" + localStorage.getItem("usermasid"))
					if(response.data.status===1){
						  var msg=response.data.message;
						  var recs=response.data.data.data;
              console.log("Citize Data " + response.data.data.data[0].info.photo);
						  this.loadRecs(recs);
					  }
		 });// then
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
        
           item.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
           item.lastName.toLowerCase().startsWith(value.toLowerCase()) 
        let includesCondition =
       
          item.firstName.toLowerCase().includes(value.toLowerCase()) ||
		      item.lastName.toLowerCase().includes(value.toLowerCase())

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
  callSearch=_v=>{
	  
		//this.setState({data:null});
		  axios.post('http://159.65.148.197:3001/api/citizen/citizenList100?', {token:'dfjkhsdfaksjfh3756237',v:_v })
		 .then(response => {
					console.log("Returned data:", response.data.status);
          console.log("User MasterId=" + localStorage.getItem("usermasid"))
					if(response.data.status===1){
						  var msg=response.data.message;
						  var recs=response.data.data.data;
              console.log("Citize Data " + response.data.data.data[0].info.photo);
						  this.loadRecs(recs);
					  }
		 });// then
  }
  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <React.Fragment >
         <Row>
      <Col lg="12" md="12">
      <Card>
        <CardHeader style={{textAlign:'right'}}>
        <Button.Ripple
            onClick={this.handleSubmit}
            color="primary"
            outline
          >
            Add Citizen
          </Button.Ripple>
		 
        </CardHeader>
        <CardBody className="rdt_Wrapper">
        <Row>
		  
            <Col sm="12">
			<FormGroup>
                  
                  <Input
                    type="text"                    
                    name="gsearch"
                    id="gsearch"
                    placeholder="Search Citizens"
                    value={this.state.gsearch}
                    onChange={e => {this.setState({ gsearch: e.target.value });this.callSearch(e.target.value);}}
                  />
                </FormGroup>
			</Col>
			
          <Col sm="12">
          <CardTitle>Citizen List</CardTitle>
          
          
          </Col>          
          </Row>
          <Row>
          <Col sm="12">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noDataComponent={""}
            noHeader
            pagination
            subHeader
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
          </Col>
          <Col sm="12">
          {this.state.recs.length!=0 || this.state.loader}
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

export default JTable

