(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[23],{1184:function(e,t,a){"use strict";a.r(t);var n=a(11),l=a(15),s=a(13),r=a(12),c=a(0),i=a.n(c),o=a(1171),d=a(1172),m=a(1173),u=a(1174),g=a(1175),h=a(1166),p=a(733),E=(a(635),a(734),a(742),a(621)),y=a.n(E),v=a(40),x=a.n(v),A=a(622),S=["#7367F0","#28C76F","#EA5455","#FF9F43","#1E1E1E"],f=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,s=new Array(l),r=0;r<l;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={doctors:0,ngos:0,screeners:0,pharmacies:0,screening:0,sevikas:0,options:{colors:e.props.themeColors,plotOptions:{bar:{horizontal:!1,endingShape:"rounded",columnWidth:"55%"}},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},legend:{offsetY:-10},xaxis:{categories:["Javix Actors"]},yaxis:{title:{text:"Actors Counts"}},fill:{opacity:1},tooltip:{y:{formatter:function(e){return e}}}}},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),console.log("Javix ID="+localStorage.getItem("javixid")),null!==localStorage.getItem("javixid")&&"0"!==localStorage.getItem("javixid")||console.log("Javix ID="+localStorage.getItem("javixid")),this.mounted=!0,x.a.post("http://159.65.148.197:3001/api/graph/getlist",{userId:localStorage.getItem("userid"),token:"dfjkhsdfaksjfh3756237"}).then((function(t){if(1===t.data.status){t.data.data.data[2];e.setState({screeners:t.data.data.data[0].Screeners}),e.setState({doctors:t.data.data.data[1].Doctors}),e.setState({ngos:t.data.data.data[2].NGO}),e.setState({pendingadvancescreener:t.data.data.data[5].Sevika}),e.setState({advancescreener:t.data.data.data[4].Sanyojika}),e.setState({citizen:t.data.data.data[6].Citizen}),e.setState({pharmacies:t.data.data.data[7].Pharmacy}),e.setState({screening:t.data.data.data[8].Screening}),e.setState({sevika:t.data.data.data[10].Sevikas}),e.setState({prescription:t.data.data.data[3].Prescription}),e.setState({NonPrescription:t.data.data.data[9].NonPrescription})}else console.log("Not Found")})).catch((function(t){console.log("Exception:"),e.state.notfound=0})),x.a.post("http://159.65.148.197:3001/api/screening/getCaseDetails").then((function(t){console.dir("Data Length="+t.data.data.data.length),1===t.data.status&&e.setState({tcases:t.data.data.data.length})})).catch((function(t){console.log("Exception:"),console.log(t.response.data),0===t.response.data.status&&(e.state.notfound=0)})),x.a.post("http://159.65.148.197:3001/api/screening/getCaseDetails",{status:"2"}).then((function(t){console.dir("Data Length="+t.data.data.data.length),1===t.data.status&&e.setState({picked:t.data.data.data.length})})).catch((function(t){console.log("Exception:"),e.state.notfound=0})),x.a.post("http://159.65.148.197:3001/api/screening/getCaseDetails",{status:"1"}).then((function(t){console.dir("Data Length="+t.data.data.data.length),1===t.data.status&&e.setState({prescribed:t.data.data.data.length})})).catch((function(t){console.log("Exception:"),console.log(t.response.data),0===t.response.data.status&&(e.state.notfound=0)}))}},{key:"getCaseDetails",value:function(e){"Total"===e?(localStorage.setItem("_status","1"),localStorage.setItem("caseType","Total Cases"),document.location="/views/dashboard/admin/ScreeningCaseDetails"):"Picked"==e?(localStorage.setItem("_status","2"),localStorage.setItem("caseType","Pending Cases"),document.location="/views/dashboard/admin/ScreeningCaseDetails"):"Prescribed"==e&&(localStorage.setItem("_status","3"),localStorage.setItem("caseType","Completed Cases"),document.location="/views/dashboard/admin/ScreeningCaseDetails")}},{key:"render",value:function(){var e={labels:["Doctors","Screener","NGO","Sevikas","Screening","Pharmacy","Citizen","Sanyojika","Sevika"],datasets:[{label:"Total Actors Count",data:[this.state.doctors,this.state.screeners,this.state.ngos,this.state.sevika,this.state.screening,this.state.pendingadvancescreener,this.state.advancescreener,this.state.citizen,this.state.pharmacies],backgroundColor:S}]},t=[{name:"Doctors",data:[this.state.doctors]},{name:"Screener",data:[this.state.screeners]},{name:"NGO",data:[this.state.ngos]},{name:"Sevika",data:[this.state.sevika]},{name:"Citizen",data:[this.state.citizen]},{name:"Screening",data:[this.state.screening]},{name:"Pharmacy",data:[this.state.pharmacies]},{name:"Prescription",data:[this.state.prescription]},{name:"Non Prescription",data:[this.state.NonPrescription]},{name:"Advance screening",data:[this.state.advancescreener]},{name:"pending Advance screening",data:[this.state.pendingadvancescreener]}];return i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{className:"match-height"},i.a.createElement(d.a,null,i.a.createElement(p.a,null))),i.a.createElement(o.a,{className:"match-height",style:{textAlign:"center"}},i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/doctorlist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Doctors")),i.a.createElement("h5",null,this.state.doctors)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/ngolist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"NGO")),i.a.createElement("h5",null,this.state.ngos)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/screenerlist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Screeners")),i.a.createElement("h5",null,this.state.screeners)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/sevikalist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Sevikas")),i.a.createElement("h5",null,this.state.sevika)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/citizenlist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Citizen")),i.a.createElement("h5",null,this.state.citizen)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center",cursor:"pointer"}},i.a.createElement(m.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/citizenlist"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Screening")),i.a.createElement("h5",null,this.state.screening)))),i.a.createElement(d.a,{lg:"2"},i.a.createElement(m.a,{style:{cursor:"pointer"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Pharmacies")),i.a.createElement("h5",null,this.state.pharmacies)))),i.a.createElement(d.a,{lg:"2"},i.a.createElement(m.a,{style:{cursor:"pointer"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/PrescriptionList"}},i.a.createElement("h5",null,"Prescription")),i.a.createElement("h5",null,this.state.prescription)))),i.a.createElement(d.a,{lg:"2"},i.a.createElement(m.a,{style:{cursor:"pointer"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/nonprescriptionList"}},i.a.createElement("h5",null,"Non-Prescription")),i.a.createElement("h5",null,this.state.NonPrescription)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center"}},i.a.createElement(m.a,{style:{cursor:"pointer"}},i.a.createElement(u.a,null,i.a.createElement(g.a,{style:{textAlign:"center"}})),i.a.createElement(h.a,{style:{textAlign:"center"},onClick:function(){document.location="/views/dashboard/admin/PendingadvancedScreening"}},i.a.createElement("span",{style:{textAlign:"center"}},i.a.createElement("h5",null,"Advanced Screening Pending Cases")),i.a.createElement("h5",null,this.state.pendingadvancescreener)))),i.a.createElement(d.a,{lg:"2",style:{textAlign:"center"}},i.a.createElement(m.a,{style:{cursor:"pointer"}},i.a.createElement(u.a,null,i.a.createElement(g.a,null)),i.a.createElement(h.a,{style:{textAlign:"center"}},i.a.createElement("span",{style:{textAlign:"center",cursor:"pointer"},onClick:function(){document.location="/views/dashboard/admin/AdvancedScreening"}},i.a.createElement("h5",null,"Advanced Screening Total Cases")),i.a.createElement("h5",null,this.state.advancescreener))))),i.a.createElement(o.a,{className:"match-height",style:{textAlign:"center"}},i.a.createElement(d.a,null,i.a.createElement(m.a,null,i.a.createElement(u.a,null,i.a.createElement(g.a,null,"Pie Chart")),i.a.createElement(h.a,null,i.a.createElement(A.Pie,{data:e,options:{responsive:!0,responsiveAnimationDuration:500,maintainAspectRatio:!1,title:{display:!0,text:"Javix Users"}},height:300})))),i.a.createElement(d.a,null,i.a.createElement(m.a,null,i.a.createElement(u.a,null,i.a.createElement(g.a,null,"Bar Chart")),i.a.createElement(h.a,null,i.a.createElement(y.a,{options:this.state.options,series:t,type:"bar",height:350}))))))}}]),a}(i.a.Component);t.default=f},733:function(e,t,a){"use strict";var n=a(11),l=a(15),s=a(13),r=a(12),c=a(0),i=a.n(c),o=a(1173),d=a(1166),m=(a(626),a(627),function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return i.a.createElement(o.a,{className:"bg-analytics text-white sales-card"},i.a.createElement(d.a,{className:"text-center"},i.a.createElement("div",{className:"award-info text-center"},i.a.createElement("h1",{className:"mb-2 text-white"},"     ",i.a.createElement("div",null,"Welcome ",localStorage.getItem("firstName")+" "+localStorage.getItem("lastName"))))))}}]),a}(i.a.Component));t.a=m},734:function(e,t,a){"use strict";var n=a(11),l=a(15),s=a(13),r=a(12),c=a(0),i=a.n(c),o=a(1173),d=a(1174),m=a(1175),u=a(1166),g=a(622),h={labels:["Doctors","NGO","Screener","Pharmacy","Patients"],datasets:[{label:"My First dataset",data:[2478,5267,734,784,433],backgroundColor:["#7367F0","#28C76F","#EA5455","#FF9F43","#1E1E1E"]}]},p={responsive:!0,responsiveAnimationDuration:500,maintainAspectRatio:!1,title:{display:!0,text:"Predicted Javix Users in 2021"}};i.a.Component},742:function(e,t,a){"use strict";var n=a(11),l=a(15),s=a(13),r=a(12),c=a(0),i=a.n(c),o=a(1173),d=a(1174),m=a(1175),u=a(1166),g=a(622),h={labels:["Doctors","NGO","Screener","Pharmacy","Patients"],datasets:[{label:"Population (millions)",data:[2478,5267,734,784,433],backgroundColor:["#7367F0","#28C76F","#EA5455","#FF9F43","#1E1E1E"],borderColor:"transparent"}]},p={elements:{rectangle:{borderWidth:2,borderSkipped:"left"}},responsive:!0,responsiveAnimationDuration:500,scales:{xAxes:[{display:!0,gridLines:{color:"#dae1e7"},scaleLabel:{display:!0}}],yAxes:[{display:!0,gridLines:{color:"#dae1e7"},scaleLabel:{display:!0},ticks:{stepSize:1e3}}]},maintainAspectRatio:!1,title:{display:!0,text:"Predicted Javix Users in 2021"},legend:{display:!1}};i.a.Component}}]);
//# sourceMappingURL=23.b5ee2ae1.chunk.js.map