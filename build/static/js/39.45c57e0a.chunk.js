(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[39],{1243:function(e,a,t){"use strict";t.r(a);var i=t(52),r=(t(681),t(0)),n=t.n(r),l=t(856),d=(t(858),t(1285)),m=t(859),s=t.n(m),c=t(40),f=t.n(c),h=(t(735),{comparator:function(e,a){if(null==a)return-1;var t=a.split("-"),i=new Date(Number(t[2]),Number(t[1])-1,Number(t[0]));return e.getTime()===i.getTime()?0:i<e?-1:i>e?1:void 0},browserDatePicker:!0});a.default=function(){var e=Object(r.useRef)(),a=Object(r.useState)(),t=Object(i.a)(a,2),m=t[0],c=t[1],o=Object(r.useState)(""),u=Object(i.a)(o,2),p=u[0],N=u[1],b=Object(r.useState)(""),v=Object(i.a)(b,2),g=v[0],W=v[1],E=Object(r.useState)(""),j=Object(i.a)(E,2),O=j[0],x=j[1],D=[{minWidth:100,headerName:"citizenId",field:"citizenId",filter:!0},{minWidth:100,headerName:"screenerId",field:"screenerId",filter:!0},{minWidth:100,headerName:"caseId",field:"caseId",filter:!0},{minWidth:100,headerName:"height",field:"height",filter:!0},{minWidth:130,headerName:"Citizen Name",field:"fullname",filter:!0},{minWidth:130,headerName:"Sanyojika Name",field:"screenerfullname",filter:!0},{minWidth:100,headerName:"DOB",field:"DOB",filter:!0},{minWidth:100,headerName:"Gender",field:"Gender",filter:!0},{minWidth:100,headerName:"Age",field:"Age",filter:!0},{minWidth:100,headerName:"Aadhar number",field:"aadhaar",filter:!0},{minWidth:100,headerName:"Mobile number",field:"Mobile",filter:!0},{minWidth:100,headerName:"Address",field:"address",filter:!0},{minWidth:100,headerName:"weight",field:"weight"},{minWidth:100,headerName:"bmi",field:"bmi"},{minWidth:100,headerName:"bpsys",field:"bpsys"},{minWidth:100,headerName:"bpdia",field:"bpdia"},{minWidth:100,headerName:"spo2",field:"spo2"},{minWidth:100,headerName:"pulse",field:"pulse"},{minWidth:100,headerName:"temperature",field:"temperature"},{minWidth:100,headerName:"Arm",field:"arm"},{minWidth:100,headerName:"Date",field:"createdAt",filter:"agDateColumnFilter",filterParams:h}],y=Object(r.useCallback)((function(){e.current.api.exportDataAsCsv()}),[]);return Object(r.useEffect)((function(){m&&(""!==p&&""!==g&&p>g?(alert("Start Date should be before End Date"),W("")):(m.api.getFilterInstance("createdAt").setModel({type:""!==p&&""!==g?"inRange":""!==p?"greaterThan":""!==g?"lessThan":void 0,dateFrom:p||g,dateTo:g}),m.api.onFilterChanged()))}),[p,g]),f.a.post("http://159.65.148.197:3001/api/generalsurvey/screeningScreener").then((function(e){if(console.log("Returned data:"),1===e.data.status){var a=e.data.data.data;x(a)}}),[]),n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"ag-theme-alpine ",style:{height:400}},n.a.createElement("div",{className:"row d-flex justify-content-end align-items-center"},n.a.createElement("div",{className:"col-sm-6 pb-1"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-sm-6"},n.a.createElement("label",{className:"d-flex"}," From :"),n.a.createElement("input",{type:"date",className:"form-control",value:p,onChange:function(e){return N(e.target.value)}})),n.a.createElement("div",{className:"col-sm-6"},n.a.createElement("label",{className:"d-flex"}," To :"),n.a.createElement("input",{type:"date",className:"form-control",value:g,onChange:function(e){return W(e.target.value)}})))),n.a.createElement("div",{className:"col-sm-2"},n.a.createElement(d.a,{variant:"outlined",startIcon:n.a.createElement(s.a,null),onClick:y},"Export"))),"sevika",n.a.createElement(l.AgGridReact,{className:"pt-5",ref:e,rowData:O,suppressExcelExport:!0,columnDefs:D,defaultColDef:{flex:1},onGridReady:function(e){c(e)},pagination:!0})))}},681:function(e,a,t){}}]);
//# sourceMappingURL=39.45c57e0a.chunk.js.map