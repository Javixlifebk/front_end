import React, { useEffect, useState } from 'react'
// import { environment } from '../../api'
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridOverlay,GridToolbarContainer,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
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
function customNoRowsOverlay() {
  return (
      <GridOverlay>
          <div>Loading....</div>
      </GridOverlay>
  )
}

function GeneralSurvey() {
  const [rows, setUsers] = useState([])
  useEffect(() => {
		  axios.post('http://143.244.136.145:3010/api/generalsurvey/GeneralSurveyList')
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })

  const columns = [
    { field: 'noOfFamilyMembers', headerName: 'No.of Family Member', width: 60 },
    { field: 'nameHead', headerName: 'Family Head Name', width: 150 },
    { field: 'ageHead', headerName: 'Age', width: 150 },
    { field: 'NoOfAdultMales', headerName: 'No.of Adult Males', width: 120 },
    { field: 'NoOfAdultFemales', headerName: 'No.of Adult Females', width: 150 },
    { field: 'NoOfChildrenMales', headerName: 'No.of Children Males', width: 300 },
    {
      field: 'NoOfChildrenFemales',
      headerName: 'No.of Children Females',
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
        General Survey
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

export default GeneralSurvey