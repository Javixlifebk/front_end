(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[47],{1200:function(e,t,a){"use strict";a.r(t);var s=a(11),l=a(15),n=a(66),r=a(13),o=a(12),c=a(0),i=a.n(c),u=a(1169),d=a(1173),m=a(1174),f=a(1175),b=a(1166),v=a(568),h=a.n(v),p=a(233),x=(a(675),a(40)),E=a.n(x),N=function(e){return i.a.createElement("div",{className:"d-flex flex-wrap justify-content-between"},i.a.createElement("div",{className:"add-new"}),i.a.createElement("div",{className:"position-relative has-icon-left mb-1"},i.a.createElement(u.a,{value:e.value,placeholder:"search",onChange:function(t){return e.handleFilter(t)}}),i.a.createElement("div",{className:"form-control-position"},i.a.createElement(p.a,{size:"15"}))))},w=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(e){var l;return Object(s.a)(this,a),(l=t.call(this,e)).handleFilter=function(e){var t=e.target.value,a=l.state.data,s=l.state.filteredData;l.setState({value:t}),t.length&&(s=a.filter((function(e){var a=e.userId.toLowerCase().startsWith(t.toLowerCase())||e.issue.toLowerCase().startsWith(t.toLowerCase()),s=e.userId.toLowerCase().includes(t.toLowerCase())||e.issue.toLowerCase().includes(t.toLowerCase());return a||(!a&&s?s:null)})),l.setState({filteredData:s}))},l.state={action:{0:"New Issue",1:"Assigned",2:"Resolved",3:"Closed"},columns:[{name:"Issue No",selector:"ID",sortable:!0,minWidth:"200px",cell:function(e){return i.a.createElement("div",{className:"d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1"},i.a.createElement("div",{className:"user-info text-truncate ml-xl-50 ml-0"},i.a.createElement("small",{title:e.issueNo},i.a.createElement("a",{href:"#"},e.issueNo))))}},{name:"By User",selector:"User",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.userId)}},{name:"Subject",selector:"subject",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 mb-0"},e.issue)}},{name:"Issue",selector:"issue",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500  mb-0"},e.issueDetails)}},{name:"Date",selector:"date",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500  mb-0"},e.createdAt)}},{name:"Status",selector:"satus",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500  mb-0"},l.state.action[e.status])}},{name:"Comments",selector:"",sortable:!0,cell:function(e){return i.a.createElement("div",null,i.a.createElement("p",{className:"text-bold-500  mb-0"},e.Comments))}}],data:[],filteredData:[],value:"",recs:[]},l.loadRecs=l.loadRecs.bind(Object(n.a)(l)),l}return Object(l.a)(a,[{key:"loadRecs",value:function(e){this.setState({data:e}),console.log(this.state.recs)}},{key:"handleScreener",value:function(e){localStorage.setItem("issueNo",e),window.location="../../views/dashboard/issueaddressing"}},{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,E.a.post("http://159.65.148.197:3001/api/issues/issuesAll",{userId:"rakesh",status:"2"}).then((function(t){if(console.log("Returned data:",t.data.status),1===t.data.status){t.data.message;var a=t.data.data.data;e.loadRecs(a)}}))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.columns,s=e.value,l=e.filteredData;return i.a.createElement(d.a,null,i.a.createElement(m.a,null,i.a.createElement(f.a,null,"Addressed Issue List")),i.a.createElement(b.a,{className:"rdt_Wrapper"},i.a.createElement(h.a,{className:"dataTable-custom",data:s.length?l:t,columns:a,noHeader:!0,pagination:!0,subHeader:!0,subHeaderComponent:i.a.createElement(N,{value:s,handleFilter:this.handleFilter})})))}}]),a}(i.a.Component);t.default=w},675:function(e,t,a){e.exports=a.p+"static/media/screenerlist.6bd8fb27.png"}}]);
//# sourceMappingURL=47.12669511.chunk.js.map