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
    columns: [
      {
        name: "Doctor ID",
        selector: "doctorId",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.doctorId}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.doctorId}
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
          <p className="text-bold-500 text-truncate mb-0">{row.email}</p>
        )
      },
      {
        name: "Created Date",
        selector: "createdAt",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.createdAt}</p>
        )
      },
      {
        name: "Action",
        selector: "",
        sortable: true,
        cell: row =>(
          <button
          // src={activateImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.doctorId)}
          // style={{width:"30px",cursor:"pointer"}}
          className="btn-success"
        >Unmap</button>
         
          
        )
      }
    
      // {
      //   name: "On Boarding Date",
      //   selector: "boradingDate",
      //   sortable: true,
      //   cell: row => (
      //     <p className="text-bold-500 text-truncate mb-0">{row.info.dateOfOnBoarding}</p>
      //   )
      // },
      // {
      //   name: "Address",
      //   selector: "address",
      //   sortable: true,
      //   cell: row => (
      //     <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
      //       <div className="user-info text-truncate ml-xl-50 ml-0">
      //         {/* <span
      //           title={row.info.address}
      //           className="d-block text-bold-500 text-truncate mb-0">
      //           {row.info.address}
      //         </span> */}
			//   {/* <small title={row.info.district}>{row.info.district},</small> */}
      //         <small title={row.state}>{row.info.state}</small>
      //       </div>
      //     </div>
      //   )
      // }
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
//  handleClick(userId) {

//   if(window.confirm("Are you sure want to Unmapped Doctor !")){
//   let postData="ngoId="+userId+"&ismapped=0&token=dfjkhsdfaksjfh3756237"; 
  
//   let _targetPostURL="https://javixlife.org/api/doctor/updatemapped?=";
//   axios(
//     {
//       method: 'post',
//       url: _targetPostURL,
//       data: postData,
//       headers: {'Content-Type': 'application/x-www-form-urlencoded' }
//       }

//   ).then(res=>{
//     if(res.data.status===1){
//       //alert("Updated Successfully")
//       window.location.reload();

//     }
                              

//   })
//   .catch(e=>{
//   });
// }


handleClick(doctorId, userId) {

  if(window.confirm("Are you sure want to Unmapped Doctor !")){
  axios.post('https://javixlife.org/api/doctor/updatemapped?=', {doctorId:doctorId ,token:'dfjkhsdfaksjfh3756237',ismapped:true, ngoId:"0"})
  .then(res=>{
    console.log(doctorId, "doctorIddoctorId");
    console.log(userId, "ngoIdngoIdngoIdngoId");
    if(res.data.status===1){
      //alert("Updated Successfully")
      window.location.reload();
    }
  })
  .catch(e=>{
  });
}
}
  //alert(_userid)
  //localStorage.setItem("Sid",scrid)
  //document.location='/views/dashboard/screener/profile'
  //this.props.onHeaderClick(this.props.value);
// }
  
componentWillUnmount() { this.mounted = false;}
componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
        
		axios.post('https://javixlife.org/api/doctor/mappedList', {ngoId: localStorage.getItem("userid"), token:'dfjkhsdfaksjfh3756237'})
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
        let startsWithCondition =
        
          item.message.toLowerCase().startsWith(value.toLowerCase()) ||
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())

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
          <CardTitle>Mapped Doctor List</CardTitle>
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
