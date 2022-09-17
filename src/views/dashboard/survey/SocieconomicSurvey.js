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


function SocieconomicSurvey() {

  const [rows, setUsers] = useState([])
 
  useEffect(() => {
		  axios.post('http://159.65.148.197:3001/api/socioeconomicsurvey/SocioEconomicSurveyList')
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })


  const columns = [
    { field: 'socioeconomicsurveyId', headerName: 'Socioeconomic Survey Id', width: 60 },
    { field: 'noOfEarners', headerName: 'No.Of Earners', width: 150 },
    { field: 'nameOfEarners', headerName: 'Name Of Earners', width: 150 },
    { field: 'Age Of Earners', headerName: 'ageOfEarners', width: 120 },
    { field: 'occupationOfEarners', headerName: 'Occupation Of Earners', width: 150 },
    { field: 'isBankAccount', headerName: 'Is Bank Account', width: 300 },
    { field: 'statusOfHouse', headerName: 'Status Of House', width: 300 },
    { field: 'totalIncome', headerName: 'Total Income', width: 300 },
    { field: 'foodExpense', headerName: 'Food Expense', width: 300 },
    { field: 'healthExpense', headerName: 'Health Expense', width: 300 },
    { field: 'educationExpense', headerName: 'Education Expense', width: 300 },
    { field: 'intoxicationExpense', headerName: 'Intoxication Expense', width: 300 },
    { field: 'conveyanceExpense', headerName: 'Conveyance Expense', width: 300 },
   

    {
      field: 'cultivableLand',
      headerName: 'Cultivable Land',
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
        Socieconomic Survey
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

export default SocieconomicSurvey