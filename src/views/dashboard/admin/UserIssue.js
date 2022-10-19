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
      action:{"0":"New Issue","1":"Assigned","2":"Resoved","3":"Closed"},
    columns: [
      {
        name: "Issue No",
        selector: "ID",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
             
              <small title={row.issueNo}><a href="#">{row.issueNo}</a></small>
            </div>
          </div>
        )
      },
      {
        name: "By User",
        selector: "User",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.userId}</p>
        )
      },
      {
        name: "Subject",
        selector: "subject",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{row.issue}</p>
        )
      },
      {
        name: "Issue",
        selector: "issue",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{row.issueDetails}</p>
        )
      },
      {
        name: "Date",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{row.createdAt}</p>
        )
      },
      {
        name: "Status",
        selector: "satus",
        sortable: true,
        cell: row => (
          <p className="text-bold-500  mb-0">{this.state.action[row.status]}</p>
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

 handleSubmit = e => {
  e.preventDefault()
  

 if(window.confirm("Do you want to raise issue !")){

 //alert('okay')
 window.location='/dashboard/reportissue'
 }

 

}
  

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://javixlife.org:3010/api/issues/issuesByUser',{userId:localStorage.getItem("userid") })
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
           item.issueNo.toLowerCase().startsWith(value.toLowerCase()) ||
           item.issue.toLowerCase().startsWith(value.toLowerCase()) ||
           item.issueDetails.toLowerCase().startsWith(value.toLowerCase()) 
        let includesCondition =
          item.issue.toLowerCase().includes(value.toLowerCase()) ||
          item.info.firstName.toLowerCase().includes(value.toLowerCase()) ||
		      item.issueDetails.toLowerCase().includes(value.toLowerCase())

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
          <Col sm="6">
          <CardTitle>Issue List</CardTitle>
          </Col>
          <Col sm="6">
          <Button.Ripple
                    color="primary"
                    type="button"
                    className="mr-1 mb-1"
                    onClick={this.handleSubmit}
                  >
                    Raise an Issue
        </Button.Ripple>
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

export default JTable
