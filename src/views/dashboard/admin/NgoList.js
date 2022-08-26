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
import screenerImg from "../../../assets/img/icons/screenerlist.png"
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
    columns: [
      {
        name: "Id",
        selector: "ngoId",
        sortable: true,
        minWidth: "200px",
        cell: row => (     

        <p className="text-bold-500 text-truncate mb-0">{row.ngoId}</p>
        )
      },
      {
        name: "Ngo RegNo",
        selector: "ngoRegNo",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.info.ngoRegistrationNo}</p>
        )
      },
	   {
        name: "Ngo Name",
        selector: "name",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
        )
      },
      {
        name: "Ngo Owner",
        selector: "owner",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.owner}</p>
        )
      },
      {
        name: "Mobile No",
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
        name: "Reg.Date",
        selector: "regDate",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.info.dateOfRegistration}</p>
        )
      },    
      {
        name: "Action",
        selector: "",
        sortable: true,
        cell: row => (
          <div>
          <img
          src={profileImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.ngoLoginId)}
          style={{width:"30px",cursor:"pointer"}}
          className="img-fluid img-border rounded-circle box-shadow-1"
        />
        <img
        src={screenerImg}
        alt="porfileImg"
        onClick={() =>this.handleScreener(row.ngoLoginId)}
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
	 console.log(this.state.recs);
 }
 handleClick(_userid) {    
  localStorage.setItem("Ngoid",_userid);
  window.location='../../views/dashboard/ngoprofile'  
}

handleScreener(_userid) {    
  localStorage.setItem("Ngoid",_userid);
  window.location='../../views/dashboard/screenerlist'  
}
  
componentWillUnmount(){ console.log("WIllUnmount************"); this.mounted = false;}
componentDidMount() {console.log("DID MOUNT ************");
		this.mounted = true;
		//this.setState({data:null});
		axios.post('http://159.65.148.197:3001/api/ngo/ngoList', {email:'jilani.it@gmail.com',status:1 })
		 .then(response => {
					console.log("Returned data:", response.data.status);
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data.data;
						  console.log(recs[0]);
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
        let startsWithCondition =
        
          item.name.toLowerCase().startsWith(value.toLowerCase()) 
         
          
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) 
      
        
         

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
          <CardTitle>Enrolled NGO List</CardTitle>
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
