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
import { CsvToHtmlTable } from 'react-csv-to-table';
import './App.css';
// import DailyWeeklyReports from "./dailyAndweeklyReports/dailyWeeklyReports";


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
		tabledailyScreeningScreener:'',
		tableweeklyScreeningScreener:'',
		tabledailyScreeningSevika:'',
		tableweeklyScreeningSevika:'',
		tabledailyCitizens:'',
		tabledailyCitizenDetails:'',
		tableweeklyCitizens:'',
		tableweeklyCitizenDetails:'',
		tablelipidCriticalCitizens:'',
		tableunscreened:'',
		tablegeneral:'',
		tablehealth:'',
		tablesocio:'',
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
   this.setState({loader:null});
 }

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  //alert(_userid)
  window.location='/dashboard/citizenprofile'  
}

 handleSubmit() {
  
  //alert('Hellow')
  if(localStorage.getItem("roleId")==="1" || localStorage.getItem("roleId")===1){
    alert("Sorry as a Doctor you are not entitled for this.");

  }else{
  window.location='/dashboard/addcitizen'
  }
}
  
getImage(imagUrl){
  if(imagUrl===null || imagUrl===undefined || imagUrl==='' ){
    imagUrl='http://javixlife.org:3010/profile/no-photo-male.jpg';
  }
 return imagUrl;
}

getdailycitizenReport(){
  axios.get('http://javixlife.org:3010/api/report/createCitizenCsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}
getweekcitizenReport(){
  axios.get('http://javixlife.org:3010/api/report/createWeeklyCitizencsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}
getdailycitizendetailReport(){
  axios.get('http://javixlife.org:3010/api/report/createCitizenDetailCsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}
getweekcitizendetailReport(){
  axios.get('http://javixlife.org:3010/api/report/weeklyCitizenDetailcsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}
getscreenerReport(){
  axios.get('http://javixlife.org:3010/api/report/ScreeningScreenerCsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}
getsevikaReport(){
  axios.get('http://javixlife.org:3010/api/report/ScreeningSevikaCsv',{ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
})
  .then(response => {

       this.setState({response});
       
  })
  .catch(e=>{
  
 });
}

getCaseDetails(_citizenId){
  localStorage.setItem("_citizenId",_citizenId);
  document.location="/dashboard/doctor/patientlist";  
}

componentDidMount() {

this.mounted = true;
this.getdailycitizenReport();
this.getweekcitizenReport();
this.getdailycitizendetailReport();
this.getweekcitizendetailReport();
this.getscreenerReport();
this.getsevikaReport();
axios.get('http://javixlife.org:3010/documents/dailyScreeningScreener.csv')
   .then(response => {

        this.setState({tabledailyScreeningScreener:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://javixlife.org:3010/documents/weeklyScreeningScreener.csv')
   .then(response => {

        this.setState({tableweeklyScreeningScreener:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://javixlife.org:3010/documents/dailyScreeningSevika.csv')
   .then(response => {

        this.setState({tabledailyScreeningSevika:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://javixlife.org:3010/documents/weeklyScreeningSevika.csv')
   .then(response => {

        this.setState({tableweeklyScreeningSevika:response.data});
        
   })
   .catch(e=>{
   
  });

//

axios.get('http://javixlife.org:3010/documents/dailyCitizens.csv')
   .then(response => {

        this.setState({tabledailyCitizens:response.data});
        
   })
   .catch(e=>{
   
  });
axios.get('http://javixlife.org:3010/documents/dailyCitizenDetails.csv')
   .then(response => {

        this.setState({tabledailyCitizenDetails:response.data});
        
   })
   .catch(e=>{
   
  });
axios.get('http://javixlife.org:3010/documents/weeklyCitizens.csv')
   .then(response => {

        this.setState({tableweeklyCitizens:response.data});
        
   })
   .catch(e=>{
   
  });
axios.get('http://javixlife.org:3010/documents/weeklyCitizenDetails.csv')
   .then(response => {

        this.setState({tableweeklyCitizenDetails:response.data});
        
   })
   .catch(e=>{
   
  });
axios.get('http://javixlife.org:3010/documents/lipidCriticalCitizens.csv')
   .then(response => {

        this.setState({tablelipidCriticalCitizens:response.data});
        
   })
   .catch(e=>{
   
  });
axios.get('http://javixlife.org:3010/documents/unscreened.csv')
   .then(response => {

        this.setState({tableunscreened:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://javixlife.org:3010/documents/dump.csv')
   .then(response => {

        this.setState({tablegeneral:response.data});
        
   })
   .catch(e=>{
   
  });
  
axios.get('http://javixlife.org:3010/documents/dumpHealth.csv')
   .then(response => {

        this.setState({tablehealth:response.data});
        
   })
   .catch(e=>{
   
  });
  
axios.get('http://javixlife.org:3010/documents/dumpSocio.csv')
   .then(response => {

        this.setState({tablesocio:response.data});
        
   })
   .catch(e=>{
   
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

  
  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <React.Fragment >
          <Row>
          <Col sm="12">
          <Row mt="4" style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
{/* <DailyWeeklyReports/> */}
<center><h2>Daily Screening Screener <a href="http://javixlife.org:3010/exports/csv-screeningScreener
.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tabledailyScreeningScreener" aria-expanded="false" aria-controls="tabledailyScreeningScreener">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tabledailyScreeningScreener">
<CsvToHtmlTable
data={this.state.tabledailyScreeningScreener}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>
<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Weekly Screening Screener <a href="http://javixlife.org:3010/exports/csv-screeningScreener.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tableweeklyScreeningScreener" aria-expanded="false" aria-controls="tableweeklyScreeningScreener">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tableweeklyScreeningScreener">
<CsvToHtmlTable
data={this.state.tableweeklyScreeningScreener}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>
<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Daily Screening Sevika <a href="http://javixlife.org:3010/exports/csv-screeningSevika.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tabledailyScreeningSevika" aria-expanded="false" aria-controls="tabledailyScreeningSevika">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tabledailyScreeningSevika">
<CsvToHtmlTable
data={this.state.tabledailyScreeningSevika}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>
<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Weekly Screening Sevika <a href="http://javixlife.org:3010/exports/csv-screeningSevika.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tableweeklyScreeningSevika" aria-expanded="false" aria-controls="tableweeklyScreeningSevika">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tableweeklyScreeningSevika">

<CsvToHtmlTable
data={this.state.tableweeklyScreeningSevika}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>


<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
  
{/* <center><h2>Daily Citizens <a href="http://javixlife.org:3010/documents/dailyCitizens.csv" target="_blank">Download</a></h2> */}
<center><h2>Daily Citizens <a  href="http://javixlife.org:3010/exports/csv-dailyCitizens.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tabledailyCitizens" aria-expanded="false" aria-controls="tabledailyCitizens">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tabledailyCitizens">

<CsvToHtmlTable
data={this.state.tabledailyCitizens}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>

<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Daily Citizen Details <a href="http://javixlife.org:3010/exports/csv-dailyCitizenDetails.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tabledailyCitizenDetails" aria-expanded="false" aria-controls="tabledailyCitizenDetails">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tabledailyCitizenDetails">

<CsvToHtmlTable
data={this.state.tabledailyCitizenDetails}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>

<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Weekly Citizens <a  href="http://javixlife.org:3010/exports/csv-weeklyCitizens.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tableweeklyCitizens" aria-expanded="false" aria-controls="tableweeklyCitizens">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tableweeklyCitizens">

<CsvToHtmlTable
data={this.state.tableweeklyCitizens}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>

<Row style={{
overflow: "auto",
display: "block",
// "table-layout": "auto" href="http://javixlife.org:3010/documents/weeklyCitizenDetails.csv"
}}>
<center><h2>Weekly Citizen Details <a href="http://javixlife.org:3010/exports/csv-weeklyCitizenDetails.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tableweeklyCitizenDetails" aria-expanded="false" aria-controls="tableweeklyCitizenDetails">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tableweeklyCitizenDetails">

<CsvToHtmlTable
data={this.state.tableweeklyCitizenDetails}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>


<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Lipid Critical Citizens <a href="http://javixlife.org:3010/documents/lipidCriticalCitizens.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tablelipidCriticalCitizens" aria-expanded="false" aria-controls="tablelipidCriticalCitizens">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tablelipidCriticalCitizens">

<CsvToHtmlTable
data={this.state.tablelipidCriticalCitizens}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>

<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Unscreened Citizen <a href="http://javixlife.org:3010/documents/unscreened.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tableunscreened" aria-expanded="false" aria-controls="tableunscreened">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tableunscreened">

<CsvToHtmlTable
data={this.state.tableunscreened}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>General Survey <a href="http://javixlife.org:3010/documents/dump.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tablegeneral" aria-expanded="false" aria-controls="tablegeneral">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tablegeneral">

<CsvToHtmlTable
data={this.state.tablegeneral}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>Health Survey <a href="http://javixlife.org:3010/documents/dumpHealth.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tablehealth" aria-expanded="false" aria-controls="tablehealth">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tablehealth">

<CsvToHtmlTable
data={this.state.tablehealth}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>

<hr style={{"margin-top":"10px"}}/>
<Row style={{
overflow: "auto",
display: "block",
"table-layout": "auto"
}}>
<center><h2>SocioEconomic Survey <a href="http://javixlife.org:3010/documents/dumpSocio.csv" target="_blank">Download</a></h2>
<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#tablesocio" aria-expanded="false" aria-controls="tablesocio">
    Collapse/Expand
  </button>
</center>
<Col sm="12" className="collapse" id="tablesocio">

<CsvToHtmlTable
data={this.state.tablesocio}
csvDelimiter=","
tableClassName="table table-striped table-hover"

/>
</Col>
</Row>
<hr style={{"margin-top":"10px"}}/>
          </Col>
      </Row>

      </React.Fragment>
    )
  }
  /* ENd rebder */
}

export default JTable

