import React, { useEffect, useState } from 'react'
// import { environment } from '../../api'
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridToolbarContainer,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <GridFilterPanel /> */}
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ReferPatientList() {
  const [rows, setUsers] = useState([])
  useEffect(() => {
		  axios.post('http://159.65.148.197:3001/api/citizen/citizenrefer', {token:'dfjkhsdfaksjfh3756237',isUnrefer:true })
		 .then(response => {
					console.log("Returned data:");
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })

  const columns = [
    // { field: 'doctorId', headerName: 'Doctor Id', width: 150 },
    
    { field: 'citizenId', headerName: 'citizen Id', width: 150 },
    { field: 'javixId', headerName: ' citizen Javix Id', width: 120 },
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
  
   

  
  ]

  return (
    <>
    <div className="bannermain">
      <div className="container">
        <h2 className="font-24-31 font-20-26 font-style-normal font-weight-600 colorformhrading titlewadd">
        Patient Refer List
        </h2>
        <div style={{ height: '75vh', width: '100%' }}>
         
          <DataGrid
            className="pb-3"
            rows={rows}
            columns={columns}
            pageSize={8}
            components={{
              Toolbar: CustomToolbar,
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