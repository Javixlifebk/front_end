(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[50],{1191:function(e,a,t){"use strict";t.r(a);var l=t(11),n=t(15),r=t(66),s=t(13),o=t(12),c=t(0),i=t.n(c),m=t(1169),u=t(543),d=t(1173),f=t(1174),h=t(1175),p=t(1166),b=t(568),v=t.n(b),g=t(233),w=t(40),x=t.n(w),E=t(577),N=t.n(E),C=function(e){return i.a.createElement("div",{className:"d-flex flex-wrap justify-content-between"},i.a.createElement("div",{className:"add-new"}),i.a.createElement("div",{className:"position-relative has-icon-left mb-1"},i.a.createElement(m.a,{value:e.value,placeholder:"search",onChange:function(a){return e.handleFilter(a)}}),i.a.createElement("div",{className:"form-control-position"},i.a.createElement(g.a,{size:"15"}))))},y=function(e){Object(s.a)(t,e);var a=Object(o.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this,e)).handleFilter=function(e){var a=e.target.value,t=n.state.data,l=n.state.filteredData;n.setState({value:a}),a.length&&(l=t.filter((function(e){console.dir(e.userId);var t=e.userId.toLowerCase().startsWith(a.toLowerCase())||e.info.firstName.toLowerCase().startsWith(a.toLowerCase())||e.info.lastName.toLowerCase().startsWith(a.toLowerCase()),l=e.userId.toLowerCase().includes(a.toLowerCase())||e.info.firstName.toLowerCase().includes(a.toLowerCase())||e.info.lastName.toLowerCase().includes(a.toLowerCase());return t||(!t&&l?l:null)})),n.setState({filteredData:l}))},n.state={columns:[{name:"UserId",selector:"userId",sortable:!0,minWidth:"200px",cell:function(e){return i.a.createElement("div",{className:"d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1"},i.a.createElement("div",{className:"user-info text-truncate ml-xl-50 ml-0"},i.a.createElement("span",{title:e.userId,className:"d-block text-bold-500 text-truncate mb-0"},e.userId),i.a.createElement("small",{title:e.pharmacyLoginId},i.a.createElement("a",{href:"#"},e.pharmacyLoginId))))}},{name:"Name",selector:"",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 mb-0"},e.name)}},{name:"Owner",selector:"",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 mb-0"},e.owner)}},{name:"Registration No",selector:"",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 mb-0"},e.pharmacyRegistrationNumber)}},{name:"Mobile",selector:"mobile",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500  mb-0"},e.mobile)}},{name:"Email",selector:"email",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 mb-0"},e.email)}},{name:"Status",selector:"status",sortable:!0,cell:function(e){return i.a.createElement(u.a,{color:0===e.status?"light-danger":"light-success",pill:!0},0===e.status?"Inactive":"Active")}},{name:"Profile",selector:"",sortable:!0,cell:function(e){return i.a.createElement("img",{src:N.a,alt:"porfileImg",onClick:function(){return n.handleClick(e.pharmacyLoginId)},style:{width:"30px",cursor:"pointer"},className:"img-fluid img-border rounded-circle box-shadow-1"})}}],data:[],filteredData:[],value:"",recs:[]},n.loadRecs=n.loadRecs.bind(Object(r.a)(n)),n}return Object(n.a)(t,[{key:"loadRecs",value:function(e){this.setState({data:e}),console.log(this.state.recs)}},{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,x.a.post("http://159.65.148.197:3001/api/pharmacy/pharmacyList",{userId:"rahulpandeyjaiho@gmail.com",token:"dfjkhsdfaksjfh3756237"}).then((function(a){if(console.log("Returned data:",a.data.status),1===a.data.status){a.data.message;var t=a.data.data.data;e.loadRecs(t)}}))}},{key:"handleClick",value:function(e){localStorage.setItem("Phid",e),window.location="../../views/dashboard/pharmacyprofile"}},{key:"render",value:function(){var e=this.state,a=e.data,t=e.columns,l=e.value,n=e.filteredData;return i.a.createElement(d.a,null,i.a.createElement(f.a,null,i.a.createElement(h.a,null,"Pharmacy List")),i.a.createElement(p.a,{className:"rdt_Wrapper"},i.a.createElement(v.a,{className:"dataTable-custom",data:l.length?n:a,columns:t,noHeader:!0,pagination:!0,subHeader:!0,subHeaderComponent:i.a.createElement(C,{value:l,handleFilter:this.handleFilter})})))}}]),t}(i.a.Component);a.default=y},577:function(e,a,t){e.exports=t.p+"static/media/viewprofile.08133088.png"}}]);
//# sourceMappingURL=50.b450e7f4.chunk.js.map