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

class DoctorList extends React.Component {
 constructor(props) {
    super(props);	
  this.state = {
    columns: [

      {
        name: "Name",
        selector: "",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.firstName}&nbsp;{row.lastName}</p>
      },
      {
        name: "Mobile",
        selector: "mobile",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.mobile}</p>
        )
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.email}</p>
        )
      },
       
      {
        name: "Qualification",
        selector: "qualification",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.info.qualification}&nbsp;({row.info.specialisation})</p>
        )
      },
   
      {
        name: "Profile",
        selector: "",
        sortable: true,
        cell: row => (
          <div style={{textAlign:'right'}}> 
          <img
          src={profileImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.doctorLoginId)}
          style={{width:"30px",cursor:"pointer"}}
          className="img-fluid img-border rounded-circle box-shadow-1"
        />
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

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('https://javixlife.org:3010/api/doctor/doctorList', {userId:'rahulpandeyjaiho@gmail.com',token:"dfjkhsdfaksjfh3756237",ngoId:localStorage.getItem("ngoId")})
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
  handleClick(_userid) {    
    localStorage.setItem("Docid",_userid);
    window.location='/dashboard/admin/doctorprofile'
    
  }

  /* render for all */
  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle>Doctors List</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
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
        </CardBody>
      </Card>
    )
  }
  /* ENd rebder */
}

export default DoctorList
