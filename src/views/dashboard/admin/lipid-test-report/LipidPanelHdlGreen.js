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
// import profileImg from "../../../assets/img/icons/viewprofile.png"
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

class LipidPanelHdlGreen extends React.Component {

  state = {
    casetype: "",
    password: "",
    remember: false,
    myexection:''
  }
//   else if((bloodglucose>=101 && bloodglucose<=125)) {
//     return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>bloodglucose:{bloodglucose}</span>);
//  }else if(bloodglucose>=126 &&  bloodglucose<60){
//     return(<span style={{background:'red',padding:'4px',color:'white'}}>bloodglucose:{bloodglucose}</span>);
//  }

    setBMI(val){
        if(val>18 && val<=25 ){
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>25 && val<=30){
            return(<span style={{background:'#FFBF00',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }else if(val>30 || val<18){
            return(<span style={{background:'red',padding:'4px',color:'white'}}>BMI:{val}</span>);
        }
    }
    setBP(hdlcholesterol){

        if(hdlcholesterol>=60){
            return(<span style={{background:'#008000',padding:'4px',color:'white',borderRadius:'25px;'}}>hdlcholesterol:{hdlcholesterol}</span>);
         }else{
            return(<span style={{background:'#008000',padding:'4px',color:'white'}}>hdlcholesterol:{hdlcholesterol}</span>);
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
      
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
      columns: [
      
        {
          name: "Patient Details",
          selector: "User",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  onClick={() =>this.handleClick(row.fullname)}>
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.fullname}</p>         
            </div>
          )
        },
        {
          name: "Mobile",
          selector: "mobile",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  >
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.mobile}</p>         
            </div>
          )
        },
        {
          name: "Citizen Id",
          selector: "citizenId",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  >
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.citizenId}</p>         
            </div>
          )
        },
        {
          name: "Screener Name",
          selector: "screenerfullname",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  >
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.screenerfullname}</p>         
            </div>
          )
        },
        {
          name: "Address",
          selector: "address",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  >
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.address}</p>         
            </div>
          )
        },
        {
          name: "Date Of On Boarding",
          selector: "dateOfOnBoarding",
          sortable: true,
          cell: row => (
           <div style={{cursor:'pointer'}}  >
          
            {/* <p className="text-bold-500 mb-0">{row.citizens[0].firstName + ' ' + row.citizens[0].lastName}</p> */}
            <p className="text-bold-500 mb-0">{row.dateOfOnBoarding}</p>         
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
            {/* <span>{this.setBMI(row.bmi)}</span>&nbsp;&nbsp; */}
            <span style={{margin:'20px;',padding:'4px;'}}>{this.setBP(row.cholesterol)}</span>&nbsp;&nbsp;
            {/* <span style={{margin:'20px;',padding:'4px;'}}>{this.setSOP2(row.spo2)}</span>&nbsp;&nbsp; */}
            {/* <span style={{margin:'20px;',padding:'4px;'}}>{this.setPulse(row.pulse)}</span>&nbsp;&nbsp; */}
            {/* <span style={{margin:'20px;',padding:'4px;'}}>{this.setTemp(row.temperature)}</span>&nbsp;&nbsp; */}
            
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

 handleClick(_userid) {    
  localStorage.setItem("citizenId",_userid);
  window.location='../../views/dashboard/patientview'  
}

 handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='../../views/dashboard/reportissue'
 } 

}
  

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
    // if(localStorage.getItem("severity")==="1"){
    
		  axios.post('http://javixlife.org:3010/api/labtest/LipidPanelhdlGreenList')
		 .then(response => {
			
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  this.loadRecs(recs);
              this.state.casetype="amber";
					  }
		 });// then
    // }
    // else if(localStorage.getItem("severity")==="0"){
    //   axios.post('http://javixlife.org:3010/api/labtest/getBloodGlucoseTestList', {severity:0})
    //   .then(response => {
    //        if(response.data.status===1)
    //          {
    //            var msg=response.data.message;
    //            var recs=response.data.data.data;
    //            this.loadRecs(recs);
    //            this.state.casetype="green";
    //          }
    //   });// then
    // }else if(localStorage.getItem("severity")==="2"){
    //   axios.post('http://javixlife.org:3010/api/labtest/getBloodGlucoseTestList', {severity:2})
    //   .then(response => {
    //        if(response.data.status===1)
    //          {
    //            var msg=response.data.message;
    //            var recs=response.data.data.data;
    //            this.loadRecs(recs);
    //            this.state.casetype="red";
    //          }
    //   });// then
    // }
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
          <CardTitle>Lipid Panel Green Cases</CardTitle>
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
            noDataComponent="Loading...."
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

export default LipidPanelHdlGreen;
