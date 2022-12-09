import React, { useEffect, useState } from 'react'
// import { environment } from '../../api'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar,GridOverlay,GridToolbarContainer,GridFilterPanel,GridToolbarExport,
  GridToolbarFilterButton,getGridSingleSelectOperators,
  GridCellParams,
  GridColDef,
  GridComparatorFn,
  GridFilterItem,
} from '@mui/x-data-grid'


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

///expand data 

//expand text end

function GeneralSurvey() {
  const [rows, setUsers] = useState([])
  // const filterList=[]
const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
		  axios.post('http://localhost:3010/api/generalsurvey/GeneralSurveyList')
		 .then(response => {
					if(response.data.status===1)
					  {
						  var recs=response.data.data.data;
						  setUsers(recs);
					  }
		 },[]);
 },[])


// console.log("***************",rows.citizens[0]);
  const columns = [
    
    
    { field: 'noOfFamilyMembers', headerName: 'No.of Family Member' },
    { field: 'nameHead', headerName: 'Family Head Name'},
    { field: 'citizenId', headerName: 'CitizenId'},
    { field: 'screenerfullname', headerName: 'Sevika Name' ,width:200},
    { field: 'mobile', headerName: 'Mobile' },
    { field: 'aadhaar', headerName: 'Aadhar Number'},
    { field: 'address', headerName: 'Address' ,width: 200},
    {
      field: 'fullName',
      headerName: 'Family Members Name',
      cellClassName: 'FamilyMember FamilyMember-scroll',
      sx:{'overflowWrap': 'break-word'},
      width: 250,
     height:80,

     "MuiTableRow": {
      "&.root": {
        height: "170px"
      },
    },
      
      renderCell: (params) => {
       
        let string = "";
        for(let j=0;j<params.row.citizens.length;j++){
          string = string+", "+params.row.citizens[j].firstName+" "+params.row.citizens[j].lastName;
        }
        string = string.replace(/^,/, '');

       return <p className=' memberClass'>{string}</p>
       
      
      }

      
    },

    { field: 'ageHead', headerName: 'Age'},
    { field: 'NoOfAdultMales', headerName: 'No.of Adult Males'},
    { field: 'NoOfAdultFemales', headerName: 'No.of Adult Females'},
    { field: 'NoOfChildrenMales', headerName: 'No.of Children Males'},
   
    {
      field: 'NoOfChildrenFemales',
      headerName: 'No.of Children Females',
      sortable: false,
     
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
        General Survey
        </h2>
        {/* <Select onChange={onFilter} value={selectedFilter}>
        <MenuItem value="All">All</MenuItem>
        {rows.map((x) => (
          <MenuItem key={x.screenerfullname} value={x.screenerfullname}>
            {x.screenerfullname}
          </MenuItem>
        ))}
      </Select> */}
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
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word"
            }}
          />
        </div>
      </div>
    </div>
  </>
  )
}

export default GeneralSurvey