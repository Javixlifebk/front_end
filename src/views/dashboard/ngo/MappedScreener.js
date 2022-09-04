
import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button,FormGroup, Form
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search,Icon } from "react-feather"
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
    //   {
    //     name: "Screener ID",
    //     selector: "screenerid",
    //     sortable: true,
    //     minWidth: "200px",
    //     cell: row => (
    //       <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            
    //         <div className="user-info text-truncate ml-xl-50 ml-0">
    //           <span
    //             title={row.screenerId}
    //             className="d-block text-bold-500 text-truncate mb-0">
    //             {row.screenerId}
    //           </span>
              
    //         </div>
    //       </div>
    //     )
    //   },
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
      // {
      //   name: "onBoarding.Date",
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
      //         <span
      //           title={row.info.address}
      //           className="d-block text-bold-500 text-truncate mb-0">
      //           {row.info.address}
      //         </span>
			//         <small title={row.info.district}>{row.info.district},</small>
      //         <small title={row.state}>{row.info.state}</small>
      //       </div>
      //     </div>
      //   )
      // },
      {
        name: "Action",
        selector: "",
        sortable: true,
        cell: row =>(
          <button
          // src={activateImg}
          alt="porfileImg"
          onClick={() =>this.handleClick(row.screenerId)}
          // style={{width:"30px",cursor:"pointer"}}
          className="btn-success"
        >Unmapped</button>
         
          
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

// handleClick(scrid) {
 
//   localStorage.setItem("Scrid",scrid)  
//   document.location='../../views/dashboard/ngoscreenerprofile'
//   //this.props.onHeaderClick(this.props.value);
// }


loadRecs(recs)
 {
	 
	 this.setState({data:recs});
	 console.log(this.state.recs);
 }
  
 handleClick(screenerId) {

  if(window.confirm("Are you sure want to Deactivate User !")){
  let postData="screenerId="+screenerId+"&ismapped=0&token=dfjkhsdfaksjfh3756237"; 
  
  let _targetPostURL="http://159.65.148.197:3001/api/ngo/updatescreenermap?=";
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
    console.log("Exception:"); 
    console.log(e);
  });
}
  //alert(_userid)
  //localStorage.setItem("Sid",scrid)
  //document.location='/views/dashboard/screener/profile'
  //this.props.onHeaderClick(this.props.value);
}

componentWillUnmount(){ console.log("WIllUnmount************"); this.mounted = false;}
componentDidMount() {console.log("DID MOUNT ************");
		this.mounted = true;
		//this.setState({data:null});
        
		//axios.post('http://159.65.148.197:3001/api/ngo/screenerList', { userId: '4632746328',ngoId:'0',token:'dfjkhsdfaksjfh3756237' })
    axios.post('http://159.65.148.197:3001/api/ngo/screenermappedlist', {token:'dfjkhsdfaksjfh3756237',issubscreener:0,ismapped:true})
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
state = {
    txscreenerId: ""
   
  }

handleSubmit = e => {
    e.preventDefault()
    alert(this.state.txscreenerId)
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
          <CardTitle>Mapped Screener List</CardTitle>
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
