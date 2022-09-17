import React, { useEffect, useState } from 'react'
// import { environment } from '../../api'
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridOverlay,GridToolbarContainer,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
import Button from '@mui/material/Button'
function CustomToolbar() {
  // http://159.65.148.197:3001/api/screening/updateCase
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <GridFilterPanel /> */}
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
function customNoRowsOverlay() {
  return (
      <GridOverlay>
          <div>Loading....</div>
      </GridOverlay>
  )
}

function ReferPatientList() {
  const [rows, setUsers] = useState([])
  const handleClick=(caseId)=> {

    if(window.confirm("Are you sure want to Deactivate User !")){
    let postData="caseId="+caseId+"&status=2"; 
    
    let _targetPostURL="http://159.65.148.197:3001/api/screening/updateCase?=";
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
  const getCaseDetails=(citizenId) =>{
    localStorage.setItem("citizenId",citizenId);
    document.location="/dashboard/doctor/patientlist";  
  }
  useEffect(() => {
		  axios.post('http://159.65.148.197:3001/api/citizen/citizenrefer', {token:'dfjkhsdfaksjfh3756237',isUnrefer:true })
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })

  const columns = [
  //  { field: 'doctorId', headerName: 'Doctor Id', width: 150 },
    
    { field: 'citizenId', headerName: 'citizen Id', width: 150 },
    { field: 'caseId', headerName: ' Case Id', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'fullname', headerName: 'Citizen Name', width: 120},
    { field: 'screenerfullname', headerName: 'screener Name', width: 120},
    { field: 'mobile', headerName: 'mobile', width: 120 },
    // { field: 'dateOfOnBoarding', headerName: 'dateOfOnBoarding', width: 100},
    { field: 'screenerId', headerName: 'ScreenerId', width: 80 },
     { field: 'address', headerName: 'Address', width: 120 },
     {
      field: 'district',
      headerName: 'District',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation() // don't select this row after clicking

          const api = params.api
          const thisRow = {}
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            )

          return alert(JSON.stringify(thisRow, null, 4))
        }
      
      },
    },
    
    { field: 'state', headerName: 'state', width: 120 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   sortable: false,
    //   renderCell: (params) => {
    //     const onClick = (e) => {
    //       e.stopPropagation(); // don't select this row after clicking
  
    //       // const api: GridApi = params.api;
    //       // const thisRow: Record<string, GridCellValue> = {};
  
    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );
  
    //       return alert(JSON.stringify(thisRow, null, 4));
    //     };
  
    //     return <Button onClick={onClick}>Click</Button>;
    //   }
    // },
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button className='btn-success' onClick={() => {getCaseDetails(params.citizenId);handleClick(params.caseId)}}>
            Pick and Prescribe
            </button>
            {/* onClick={() =>this.getCaseDetails(row.citizenId)} */}
            {/* <Button onClick={setModalIsOpenToTrue2}>
              <BallotIcon />
            </Button> */}
          </>
        )
      },
    },
  
  ]

  return (
   
    <>
   
    <div className="bannermain">
      <div className="container">
        <h2 className="font-24-31 font-20-26 font-style-normal font-weight-600 colorformhrading titlewadd">
         Referred Patient List
        </h2>
        <div style={{ height: '75vh', width: '100%' }}>
         
          <DataGrid
            className="pb-3"
            rows={rows}
            columns={columns}
            pageSize={8}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: customNoRowsOverlay
            }}
            getRowId={(rows) => rows._id}
          />
        </div>
      </div>
    </div>
  </>
  )
}

export default ReferPatientList