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

class JTable extends React.Component {
 constructor(props) {
    super(props);	
  this.state = {
    columns: [
      {
        name: "Screener ID",
        selector: "screenerid",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.screenerId}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.screenerId}
              </span>
              
            </div>
          </div>
        )
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.firstName} &nbsp;{row.lastName}</p>
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
        name: "Qualification",
        selector: "qualification",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.info.qualification}</p>
        )
      },
      {
        name: "onBoarding.Date",
        selector: "boradingDate",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.info.dateOfOnBoarding}</p>
        )
      },
      ,    
      {
        name: "Action",
        selector: "",
        sortable: true,
        cell: row => (
          <div>
          <img
          src={profileImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.screenerLoginId)}
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

 handleClick(_userid) {    
  localStorage.setItem("Scrid",_userid);
  window.location='/dashboard/admin/screenerprofile'  
}

 handleBack() {    
  window.location='/dashboard/admin/ngolist'
}
  
componentWillUnmount(){ 
   this.mounted = false;}
componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
        
		axios.post('http://javixlife.org:3010/api/ngo/screenerList', {userId:localStorage.getItem("userid"),ngoId:localStorage.getItem("Ngoid"),token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
					if(response.data.status===1)
					  {
						  var msg=response.data.message;
						  var recs=response.data.data;
						  this.loadRecs(recs);
              localStorage.removeItem("Ngoid")
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
  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle>Screener List</CardTitle>
           <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1 float-right"
                    onClick={this.handleBack}
                  >
                   Back
                  </Button.Ripple>
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
