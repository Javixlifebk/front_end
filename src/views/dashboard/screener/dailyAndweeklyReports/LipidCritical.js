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

function LipidCritical() {
  const [rows, setUsers] = useState([])
  useEffect(() => {
		  axios.post('http://localhost:3001/api/screening/lipidCritical')
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
    { field: 'citizenId', headerName: 'citizenId', width: 150 },
    { field: 'FirstName', headerName: 'First Name', width: 120},
    { field: 'LastName', headerName: 'Last Name', width: 120 },
    { field: 'Gender', headerName: 'Gender', width: 100},
    { field: 'ScreenerId', headerName: 'ScreenerId', width: 80 },
    { field: 'ScreenerFirstName', headerName: 'Screener First Name', width: 120 },
    { field: 'Age', headerName: 'Age', width: 120 },
    {
      field: 'ScreenerLastName',
      headerName: 'Screener Last Name',
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
  ]

  return (
    <>
    <div className="bannermain">
      <div className="container">
        <h2 className="font-24-31 font-20-26 font-style-normal font-weight-600 colorformhrading titlewadd">
        Lipid Critical Report
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

export default LipidCritical