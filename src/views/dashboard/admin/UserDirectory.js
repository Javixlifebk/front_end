import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import axios from "axios";
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

    Role:{
        "1":"Doctor",
        "2":"Screener",
        "3":"NGO",
        "4":"Pharmacy",
        "5":"Pathalogy",
        "6":"Citizen",
        "91":"System Admin",
        "92":"Doctor Admin",
        "99":"Controller Admin",
        "21":"Sevika"
    },
    columns: [
        {
            name: "Name",
            selector: "userName",
            sortable: true,
            minWidth: "200px",
            cell: row => (
              <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
                
                <div className="user-info text-truncate ml-xl-50 ml-0">               
                <div title={row.info.firstName +' ' + row.info.lastName}>{row.info.firstName +' ' + row.info.lastName}</div>
                </div>
              </div>
            )
      },  
      {
        name: "Email",
        selector: "EmailId",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
           
              <div title={row.email}><a href="#">{row.email}</a></div>
            </div>
          </div>
        )
      },
      {
        name: "Phone",
        selector: "PhoneNo",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
           
              <div title={row.info.phoneNo}>{row.info.phoneNo}</div>
            </div>
          </div>
        )
      },
      {
        name: "Role",
        selector: "roleId",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{this.state.Role[row.roleId]}</p>
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
  

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://18.60.238.252:3010/api/auth/authlist', {email:'jilani.it@gmail.com',status:1 })
		 .then(response => {
					
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
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
      <Card>
        <CardHeader>
          <CardTitle>Directory List</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
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
        </CardBody>
      </Card>
    )
  }
  /* ENd rebder */
}

export default JTable
