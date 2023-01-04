import React, { useEffect, useState } from 'react'
import '@mui/x-data-grid-generator'

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  // Input,
  Button
} from "reactstrap"
import { DataGrid, GridToolbar,GridOverlay,GridToolbarContainer,GridToolbarFilterButton } from '@mui/x-data-grid'

import axios from "axios";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarExport printOptions={{ disableToolbarButton: true }} /> */}
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


function SocieconomicSurvey() {

  const [rows, setUsers] = useState([])

  const setexportdata=()=>{
    // fetch('http://javixlife.org:3010/api/generalsurvey/download',urlexport)
    axios.get('http://javixlife.org:3010/api/socioeconomicsurvey/SocioEconomicdownload',{ ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid"),})
     .then(response => {
  
          this.setState({response});
          
     })
     .catch(e=>{
     
    });
  // alert("urlexport");
  }
 
 
  useEffect(() => {
		  axios.post('http://javixlife.org:3010/api/socioeconomicsurvey/SocioEconomicSurveyList',{ngoId: localStorage.getItem("ngoId"),})
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
    { field: 'citizenId', headerName: 'CitizenId'},
    { field: 'screenerfullname', headerName: 'Sevika Name' ,width:200 },
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'aadhaar', headerName: 'Aadhar Number'},
    { field: 'address', headerName: 'Address' ,width: 200},
    {
      field: 'fullName',
      headerName: 'Family Members Name',
      width: 300,
      renderCell: (params) => {
        let string = "";
        for(let j=0;j<params.row.citizens.length;j++){
          string = string+", "+params.row.citizens[j].firstName+" "+params.row.citizens[j].lastName;
        }
        string = string.replace(/^,/, '');

       return <p>{string}</p>
      }

      
    },
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
    { field: 'createdAt', headerName: 'Survey Date'},
  ]

  return (
    <>
    <div className="bannermain">
      <div className="container">
        <h2 className="font-24-31 font-20-26 font-style-normal font-weight-600 colorformhrading titlewadd">
        Socieconomic Survey
        </h2>

        <Row><Col sm="6"></Col>
      <Col sm="6 d-flex justify-content-end">
      <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={()=>setexportdata()}
                    href="http://javixlife.org:3010/exports/csv-socioeconomicsurvey.csv"

                  > Export
                  
                  </Button.Ripple>
      </Col>
      </Row>
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

export default SocieconomicSurvey