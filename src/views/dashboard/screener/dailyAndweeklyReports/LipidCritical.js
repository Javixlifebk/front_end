import React, { useEffect, useState } from 'react'
// import { environment } from '../../api'
import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridToolbarContainer,GridOverlay,GridFilterPanel,GridToolbarExport,GridToolbarFilterButton } from '@mui/x-data-grid'
import axios from "axios";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <GridFilterPanel /> */}
      <GridToolbarFilterButton />
      {/* <GridOverlay>
     <div>Loading ....</div>
 </GridOverlay> */}
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

function LipidCritical() {
  const [rows, setUsers] = useState([])
  useEffect(() => {
		  axios.post('http://159.65.148.197:3001/api/screening/lipidCritical')
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 })

  const columns = [
    { field: 'citizenId', headerName: 'citizenId', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    { field: 'fullname', headerName: 'Citizen Name', width: 120},
    { field: 'DOB', headerName: 'DOB', width: 120 },
    { field: 'Gender', headerName: 'Gender', width: 100},
    { field: 'ScreenerId', headerName: 'ScreenerId', width: 80 },
     { field: 'issubscreenertype', headerName: 'Role', width: 120 },
     {
      field: 'Screenerfullname',
      headerName: 'Screener Name',
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
    { field: 'caseId', headerName: 'caseId', width: 120 },
    { field: 'Age', headerName: 'Age', width: 120 },
    { field: 'height', headerName: 'height', width: 120 },
    { field: 'weight', headerName: 'weight', width: 120 },
    { field: 'bmi', headerName: 'bmi', width: 120 },
    { field: 'bpsys', headerName: 'bpsys', width: 120 },
    { field: 'bpdia', headerName: 'bpdia', width: 120 },
    { field: 'spo2', headerName: 'spo2', width: 120 },
    { field: 'pulse', headerName: 'pulse', width: 120 },
    { field: 'temperature', headerName: 'temperature', width: 120 },
    { field: 'arm', headerName: 'Arm', width: 120 },
    { field: 'leye', headerName: 'Left Eye Range', width: 120 },
    { field: 'reye', headerName: 'Right Eye Range', width: 120 },
    { field: 'hemoglobins', headerName: 'hemoglobins', width: 120 },
    { field: 'unit', headerName: 'Blood Glucose unit', width: 120 },
    { field: 'type', headerName: 'Blood Glucose type', width: 120 },
    { field: 'leukocytes', headerName: 'Blood Glucose Leukocytes', width: 120 },
    { field: 'nitrite', headerName: 'nitrite', width: 120 },
    { field: 'urobilinogen', headerName: 'urobilinogen', width: 120 },
    { field: 'protein', headerName: 'protein', width: 120 },
    { field: 'blood', headerName: 'blood', width: 120 },
    { field: 'specificGravity', headerName: 'specificGravity', width: 120 },
    { field: 'ketone', headerName: 'ketone', width: 120 },
    { field: 'bilirubin', headerName: 'bilirubin', width: 120 },
    { field: 'glucose', headerName: 'glucose', width: 120 },
    { field: 'fvc_predicted', headerName: 'FVC Predicted', width: 120 },
    { field: 'fvc_actual', headerName: 'FVC Actual', width: 120 },
    { field: 'fvc_predicted_percent', headerName: 'FVC Predicted Percent', width: 120 },
    { field: 'fev1_predicted', headerName: ' FEV Predicted', width: 120 },
    { field: 'fev1_actual', headerName: 'FEV1 Actual', width: 120 },
    { field: 'fev1_predicted_percent', headerName: ' FEV1 Predicted Percent', width: 120 },
    { field: 'pef_predicted', headerName: 'PEF Predicted', width: 120 },
    { field: 'pef_actual', headerName: 'PEF Actual', width: 120 },
    { field: 'pef_predicted_percent', headerName: 'PEF Predicted Percent', width: 120 },
    { field: 'fvc1_predicted', headerName: 'FVC1 Predicted', width: 120 },
    { field: 'fvc1_actual', headerName: 'FVC1 Actual', width: 120 },
    { field: 'fvc1_predicted_percent', headerName: 'FVC1 Predicted Percent', width: 120 },
    { field: 'cholesterol', headerName: 'Cholesterol', width: 120 },
    { field: 'hdlcholesterol', headerName: 'HdlCholesterol', width: 120 },
    { field: 'triglycerides', headerName: 'Triglycerides', width: 120 },
    { field: 'ldl', headerName: 'ldl', width: 120 },
    { field: 'tcl_hdl', headerName: 'tcl hdl', width: 120 },
    { field: 'ldl_hdl', headerName: 'ldl hdl', width: 120 },
    { field: 'non_hdl', headerName: 'non_hdl', width: 120 },
    // { field: 'glucose', headerName: 'glucose hdl', width: 120 },
    { field: 'type', headerName: 'type', width: 120 },
   
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

export default LipidCritical