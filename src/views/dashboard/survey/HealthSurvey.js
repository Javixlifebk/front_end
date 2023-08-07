import React, { useEffect, useState } from 'react'
import '@mui/x-data-grid-generator'
// import Button from '@mui/material/Button'
// import { DataGrid, GridToolbar,GridOverlay } from '@mui/x-data-grid'
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
function HealthSurvey() {

  const [rows, setUsers] = useState([])
  const setexportdata=()=>{
    // fetch('http://18.60.238.252:3010/api/generalsurvey/download',urlexport)
    axios.get('http://18.60.238.252:3010/api/healthsurvey/HealthSurveydownload',{ ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid"),})
     .then(response => {
  
          this.setState({response});
          
     })
     .catch(e=>{
     
    });
  // alert("urlexport");
  }
 
  useEffect(() => {
		  axios.post('http://18.60.238.252:3010/api/healthsurvey/HealthSurveyList',{ngoId: localStorage.getItem("ngoId"),})
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })


  const columns = [
    { field: 'familyId', headerName: 'Family Id', width: 100 },
    { field: 'citizenId', headerName: 'CitizenId'},
    { field: 'screenerfullname', headerName: 'Sevika Name' ,width:200 },
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'aadhaar', headerName: 'Aadhar Number'},
    { field: 'address', headerName: 'Address' ,width: 200},
    {
      field: 'firstName',
      headerName: 'Family Members Name',
      width: 300,
      renderCell: (params) => {
        // let string = "";
        // for(let j=0;j<params.row.citizens.length;j++){
        //   string = string+", "+params.row.citizens[j].firstName+" "+params.row.citizens[j].lastName;
        // }
        // string = string.replace(/^,/, '');

      //  return <p>{params.row.firstName+""+params.row.lastName}</p>
      }

      
    },
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
    { field: 'createdAt', headerName: 'Survey Date'},
  ]

  return (
    <>
    <div className="bannermain">
      <div className="container">
        <h2 className="font-24-31 font-20-26 font-style-normal font-weight-600 colorformhrading titlewadd">
        Health Survey
        </h2>
        <Row><Col sm="6"></Col>
      <Col sm="6 d-flex justify-content-end">
      <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={()=>setexportdata()}
                    href="http://18.60.238.252:3010/exports/csv-healthsurvey.csv"

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
            // components={{ Toolbar: GridToolbar,
            //   NoRowsOverlay: customNoRowsOverlay }}
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

export default HealthSurvey