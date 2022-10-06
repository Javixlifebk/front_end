// import logo from './logo.svg';
import "../../screener/App.css";
import React,{ useCallback,useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios";
import moment from "moment";
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};
var screenerFilterParams = {
  filterOptions: ['contains', 'notContains'],
  textFormatter: (r) => {
    if (r == null) return null;
    return r
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/æ/g, 'ae')
      .replace(/ç/g, 'c')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/ñ/g, 'n')
      .replace(/[òóôõö]/g, 'o')
      .replace(/œ/g, 'oe')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y');
  },
  debounceMs: 200,
  suppressAndOrCondition: true,
};
// http://143.244.136.145:3010/api/generalsurvey/screeningScreener
function WeeklyScreenerSevika() {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowData, setUsers] = useState("");

  const columns = [
    {  minWidth : 120, headerName: "citizenId", field: "citizenId" },
    {  minWidth : 120, headerName: "screenerId", field: "screenerId",filter: true },
    {  minWidth : 120, headerName: "caseId", field: "caseId",filter: true },
    {  minWidth : 120, headerName: "height", field: "height",filter: true },
    {  minWidth : 120, headerName: "pulse", field: "pulse" },
    {  minWidth : 120, headerName: "Citizen Name", field: "fullname" , filter: true
  },
  {  minWidth : 120, headerName: "Mobile Number", field: "Mobile" , filter: true },
    {  minWidth : 120, headerName: "sevika Name", field: "screenerfullname" , filter: true },
    {  minWidth : 120, headerName: "Email", field: "Email" , filter: true },
    {  minWidth : 120, headerName: "Aadhar Number", field: "aadhaar" , filter: true },
    {  minWidth : 120, headerName: "Gender", field: "Gender" , filter: true },
    {  minWidth : 120, headerName: "Address", field: "address" , filter: true },
    { minWidth : 100, headerName: 'weight', field: 'weight'  },
    {  minWidth : 100, headerName: 'bmi', field: 'bmi' },
    {  minWidth : 100, headerName: 'bpsys', field: 'bpsys'  },
    {  minWidth : 100, headerName: 'bpdia', field: 'bpdia' },
    {  minWidth : 100, headerName: 'spo2', field: 'spo2' },
    {  minWidth : 100, headerName: 'pulse', field: 'pulse' },
    {  minWidth : 100, headerName: 'temperature', field: 'temperature'},
    {  minWidth : 100, headerName: 'Arm', field: 'arm'  },
    {  minWidth : 120, headerName: "isSubscreener", field: "issubscreener" , filter: true},
    {
       minWidth : 120, headerName: "Date",
      field: "createdAt",
      //   cellRenderer: (data) => {
      //     return moment(data.createdAt).format('DD-MM-YYYY')
      // },
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
  ];
  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("createdAt");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    axios
    .post("http://143.244.136.145:3010/api/generalsurvey/screenersevika",{issubscreener:1})
    .then((response) => {
      
     
        
      if (response.data.status === 1) {
        var recs = response.data.data.data;
        setUsers(recs);
      }
    },
    
      {
        headers: {
          'Content-Type': 'application/json'
          }
        },
     []);
}, [startDate, endDate]);
  
  return (
    <div className="App">
      {/* <h2 align="center">Ag Grid with React</h2> */}
      {/* <p align="center">Date Range Filtering </p> */}
      <div className="ag-theme-alpine " style={{ height: 400 }}>
     
        <div className="row d-flex justify-content-end align-items-center">
          <div className="col-sm-6 pb-1">
            <div className="row">
              <div className="col-sm-6">
             <label className="d-flex"> From :</label>
               <input
          // style={{ width: 100 }}
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
              </div>
              <div className="col-sm-6">
             <label className="d-flex"> To :</label>
              <input
            // style={{ width: 100 }}
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
              </div>
            </div>
          </div>
         <div className="col-sm-2">
         <Button variant="outlined" startIcon={<ArrowDownwardIcon />} onClick={onBtnExport}>
        Export
      </Button>
         </div>
           
         
        </div>
       
        
        <AgGridReact
        className="pt-5"
            ref={gridRef}
          rowData={rowData}
          suppressExcelExport={true}
          columnDefs={columns}
          defaultColDef={defColumnDefs}
          onGridReady={onGridReady}
          pagination={true}
        />
      </div>
    </div>
  );
}

export default WeeklyScreenerSevika;
