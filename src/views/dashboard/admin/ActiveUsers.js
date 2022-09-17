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
import activateImg from "../../../assets/img/icons/activate.png"
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
        name: "User Id",
        selector: "userId",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.userId}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.userId}
              </span>
              <small title={row.email}><a href="#">{row.email}</a></small>
            </div>
          </div>
        )
      },
      {
        name: "Role",
        selector: "roleId",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 mb-0">{this.state.Role[row.roleId]}</p>
        )
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        cell: row => (
          <Badge
            color={row.status === 0 ? "light-danger" : "light-success"}
            pill>
            {row.status === 0 ? "Inactive" : "Active"}
          </Badge>
        )
      },
     
      {
        name: "Name",
        selector: "",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.info.firstName}&nbsp;{row.info.lastName}</p>
      },
      {
        name: "Blocked",
        selector: "isBlocked",
        sortable: true,
        cell: row => (
          <Badge
            color={row.info.isBlocked === true ? "light-danger" : "light-success"}
            pill>
            {row.info.isBlocked === true ? "Yes" : "No"}
          </Badge>
        )
      },
      {
        name: "Expired",
        selector: "",
        sortable: true,
        cell: row =>(
          <Badge
            color={row.info.isExpired === true ? "light-danger" : "light-success"}
            pill>
            {row.info.isExpired === true ? "expired" : "No"}
          </Badge>
        )
      },
      {
        name: "Active",
        selector: "",
        sortable: true,
        cell: row => (
          <Badge
            color={row.info.isUnActive === true ? "light-danger" : "light-success"}
            pill>
            {row.info.isUnActive === true ? "Inactive" : "Active"}
          </Badge>
        )
      },
      {
        name: "Action",
        selector: "",
        sortable: true,
        cell: row =>(
          <img
          src={activateImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.userId)}
          style={{width:"30px",cursor:"pointer"}}
          className="img-fluid img-border rounded-circle box-shadow-1"
        />
         
          
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


/**************Activate Users Function**********/
handleClick(_userid) {

  if(window.confirm("Are you sure want to Deactivate User !")){
  let postData="forUserId="+_userid+"&status=0&isBlocked=0&isExpired=0&isUnActive=0&token=dfjkhsdfaksjfh3756237";
  let _targetPostURL="http://159.65.148.197:3001/api/auth/approve?=";
  axios(
    {
      method: 'post',
      url: _targetPostURL,
      data: postData,
      headers: {'Content-Type': 'application/x-www-form-urlencoded' }
      }

  ).then(res=>{
    if(res.data.status===1){
      //alert("Updated Successfully")
      window.location.reload();

    }
                              

  })
  .catch(e=>{
   
  });
}
  //alert(_userid)
  //localStorage.setItem("Sid",scrid)
  //document.location='/views/dashboard/screener/profile'
  //this.props.onHeaderClick(this.props.value);
}
/*******************End Activate Users Function************************* */

loadRecs(recs)
 {
	 
	 this.setState({data:recs});
	
 }
  

componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		  axios.post('http://159.65.148.197:3001/api/auth/authlist', { email: 'jilani.it@gmail.com',status:1 })
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
          <CardTitle>Active User List</CardTitle>
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
