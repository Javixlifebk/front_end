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
// http://159.65.148.197:3001/api/generalsurvey/screeningScreener
function WeeklyScreener() {
  const gridRef = useRef();
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rowData, setUsers] = useState("");

  const columns = [
    {minWidth : 100, headerName: "citizenId", field: "citizenId" ,filter: true },
    {minWidth : 100, headerName: "screenerId", field: "screenerId",filter: true },
    { minWidth : 100, headerName: "caseId", field: "caseId",filter: true },
    { minWidth : 100, headerName: "height", field: "height", filter:true },
    {  minWidth : 130, headerName: 'Citizen Name', field: 'fullname',filter: true },
    {  minWidth : 130, headerName: 'Sanyojika Name', field: 'screenerfullname',filter: true },
    { minWidth : 100, headerName: 'DOB', field: 'DOB',filter: true },
    {  minWidth : 100, headerName: 'Gender',field: 'Gender',filter: true},
    {  minWidth : 100, headerName: 'Age', field: 'Age',filter: true  },
    {  minWidth : 100, headerName: 'Aadhar number', field: 'aadhaar',filter: true  },
    {  minWidth : 100, headerName: 'Mobile number', field: 'Mobile',filter: true  },
    {  minWidth : 100, headerName: 'Address', field: 'address',filter: true  },
    { minWidth : 100, headerName: 'weight', field: 'weight'  },
    {  minWidth : 100, headerName: 'bmi', field: 'bmi' },
    {  minWidth : 100, headerName: 'bpsys', field: 'bpsys'  },
    {  minWidth : 100, headerName: 'bpdia', field: 'bpdia' },
    {  minWidth : 100, headerName: 'spo2', field: 'spo2' },
    {  minWidth : 100, headerName: 'pulse', field: 'pulse' },
    {  minWidth : 100, headerName: 'temperature', field: 'temperature'},
    {  minWidth : 100, headerName: 'Arm', field: 'arm'  },
    {  minWidth : 100, headerName: 'Left Eye Range', field: 'leyeleft'  },
    {  minWidth : 100, headerName: 'Right Eye Range', field: 'reyeright'  },
    // {  minWidth : 100, headerName: 'hemoglobins', field: 'hemoglobins' , filter: true}, 
    {  minWidth : 100, headerName: 'Blood Glucose unit', field: 'unit' },
    {  minWidth : 150, headerName: 'Blood Glucose type', field: 'btype' },
    // {  minWidth : 100, headerName: 'leukocytes', field: 'leukocytes'  },
    // {  minWidth : 100, headerName: 'nitrite', field: 'nitrite'  },
    // {  minWidth : 100, headerName: 'urobilinogen', field: 'urobilinogen'  },
    // {  minWidth : 100, headerName: 'protein', field: 'protein'  },
    // {  minWidth : 100, headerName: 'Blood', field: 'blood'  },
    // {  minWidth : 100, headerName: 'specific Gravity', field: 'specificGravity'  },
    // {  minWidth : 100, headerName: 'ketone', field: 'ketone'  },
    // {  minWidth : 100, headerName: 'bilirubin', field: 'bilirubin'  },
    // {  minWidth : 100, headerName: 'FVC Predicted', field: 'fvc_predicted'  },
    // {  minWidth : 100, headerName: 'FVC Actual', field: 'fvc_actual'  },
    // {  minWidth : 100, headerName: 'FVC Predicted Percent', field: 'fvc_predicted_percent'  },
    // {  minWidth : 100, headerName: 'FEV Predicted', field: 'fev1_predicted'  },
    // {  minWidth : 100, headerName: 'FEV1 Actual', field: 'fev1_actual'  },
    // {  minWidth : 100, headerName: 'FEV1 Predicted Percent', field: 'fev1_predicted_percent'  },
    // {  minWidth : 100, headerName: 'PEF Predicted', field: 'pef_predicted'  },
    // {  minWidth : 100, headerName: 'PEF Predicted Percent', field: 'pef_predicted_percent'  },
    // {  minWidth : 100, headerName: 'FVC1 Predicted', field: 'fvc1_predicted'  },
    // {  minWidth : 100, headerName: 'FVC1 Actual', field: 'fvc1_actual'  },
    // {  minWidth : 100, headerName: 'FVC1 Predicted Percent', field: 'fvc1_predicted_percent'  },
    {  minWidth : 100, headerName: 'cholesterol', field: 'cholesterol'  },
    {  minWidth : 100, headerName: 'hdlcholesterol', field: 'hdlcholesterol'  },
    {  minWidth : 100, headerName: 'triglycerides', field: 'triglycerides'  },
    {  minWidth : 100, headerName: 'ldl', field: 'ldl'  },
    {  minWidth : 100, headerName: 'tcl_hdl', field: 'tcl_hdl'  },
    {  minWidth : 100, headerName: 'ldl_hdl', field: 'ldl_hdl'  },
    {  minWidth : 100, headerName: 'non_hdl', field: 'non_hdl'  },
    {  minWidth : 100, headerName: 'glucose', field: 'glucose'  },
    {  minWidth : 100, headerName: 'type', field: 'type' ,filter: true },
    {
      minWidth : 100, headerName: "Date",
       field: "createdAt",
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

  axios
    .post("http://159.65.148.197:3001/api/generalsurvey/screeningScreener")
    .then((response) => {
      console.log("Returned data:");
      if (response.data.status === 1) {
        var recs = response.data.data.data;
        setUsers(recs);
      }
    }, []);
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

export default WeeklyScreener;
