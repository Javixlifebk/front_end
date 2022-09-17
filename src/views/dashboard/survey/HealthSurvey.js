import React, { useEffect, useState } from 'react'
import '@mui/x-data-grid-generator'
// import Button from '@mui/material/Button'
import { DataGrid, GridToolbar,GridOverlay } from '@mui/x-data-grid'
import axios from "axios";

function customNoRowsOverlay() {
  return (
      <GridOverlay>
          <div>Loading....</div>
      </GridOverlay>
  )
}
function HealthSurvey() {

  const [rows, setUsers] = useState([])
 
  useEffect(() => {
		  axios.post('http://159.65.148.197:3001/api/healthsurvey/HealthSurveyList')
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })


  const columns = [
    { field: 'familyId', headerName: 'Family Id', width: 60 },
    { field: 'drinkingWaterSource', headerName: 'Drinking Water Source', width: 150 },
    { field: 'drinkingWaterDistance', headerName: 'Drinking Water Distance', width: 150 },
    { field: 'DistanceOfSubcenters', headerName: 'Distance Of Subcenters', width: 120 },
    { field: 'DistanceOfPrimaryHealthcenters', headerName: 'Distance Of Primary Health centers', width: 150 },
    { field: 'DistanceOfCommunityHealthcenters', headerName: 'Distance Of Community Health centers', width: 300 },
    { field: 'DistanceOfPathologyLab', headerName: 'Distance Of Pathology Lab', width: 300 },
    { field: 'DistanceOfMedicalStore', headerName: 'Distance Of Medical Store', width: 300 },
    { field: 'StatusOfDeliveryOfChildren', headerName: 'Status Of Delivery Of Children', width: 300 },
    { field: 'StatusOfVaccinationOfChildren', headerName: 'Status Of Vaccination Of Children', width: 300 },
    { field: 'StatusOfFemaleRelatedProblem', headerName: 'Status Of Female Related Problem', width: 300 },
    { field: 'CentrallyIssuedHealthInsurance', headerName: 'Centrally Issued Health Insurance', width: 300 },
    { field: 'StateIssuedHealthInsurance', headerName: 'State Issued Health Insurance', width: 300 },
    { field: 'PersonalHealthInsurance', headerName: 'Personal Health Insurance', width: 300 },

    {
      field: 'DistanceOfDistrictHospitals',
      headerName: 'Distance Of District Hospitals',
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
        Health Survey
        </h2>
        <div style={{ height: '75vh', width: '100%' }}>
         
          <DataGrid
            className="pb-3"
            rows={rows}
            columns={columns}
            pageSize={8}
            components={{ Toolbar: GridToolbar,
              NoRowsOverlay: customNoRowsOverlay }}
              getRowId={(rows) => rows._id}
          />
        </div>
      </div>
    </div>
  </>
  )
}

export default HealthSurvey