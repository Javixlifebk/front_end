(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[37],{1187:function(e,t,a){"use strict";a.r(t);var n=a(11),l=a(15),o=a(66),r=a(13),c=a(12),i=a(0),s=a.n(i),m=a(1169),u=a(1173),d=a(1174),f=a(1175),b=a(1166),g=a(568),p=a.n(g),h=a(233),v=a(40),N=a.n(v),x=a(577),E=a.n(x),w=a(675),k=a.n(w),j=function(e){return s.a.createElement("div",{className:"d-flex flex-wrap justify-content-between"},s.a.createElement("div",{className:"add-new"}),s.a.createElement("div",{className:"position-relative has-icon-left mb-1"},s.a.createElement(m.a,{value:e.value,placeholder:"search",onChange:function(t){return e.handleFilter(t)}}),s.a.createElement("div",{className:"form-control-position"},s.a.createElement(h.a,{size:"15"}))))},C=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(e){var l;return Object(n.a)(this,a),(l=t.call(this,e)).handleFilter=function(e){var t=e.target.value,a=l.state.data,n=l.state.filteredData;l.setState({value:t}),t.length&&(n=a.filter((function(e){var a=e.name.toLowerCase().startsWith(t.toLowerCase()),n=e.name.toLowerCase().includes(t.toLowerCase());return a||(!a&&n?n:null)})),l.setState({filteredData:n}))},l.state={columns:[{name:"Id",selector:"ngoId",sortable:!0,minWidth:"200px",cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.ngoId)}},{name:"Ngo RegNo",selector:"ngoRegNo",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.info.ngoRegistrationNo)}},{name:"Ngo Name",selector:"name",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.name)}},{name:"Ngo Owner",selector:"owner",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.owner)}},{name:"Mobile No",selector:"mobile",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.mobile)}},{name:"Email",selector:"email",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 mb-0"},e.email)}},{name:"Reg.Date",selector:"regDate",sortable:!0,cell:function(e){return s.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.info.dateOfRegistration)}},{name:"Action",selector:"",sortable:!0,cell:function(e){return s.a.createElement("div",null,s.a.createElement("img",{src:E.a,alt:"porfileImg",onClick:function(){return l.handleClick(e.ngoLoginId)},style:{width:"30px",cursor:"pointer"},className:"img-fluid img-border rounded-circle box-shadow-1"}),s.a.createElement("img",{src:k.a,alt:"porfileImg",onClick:function(){return l.handleScreener(e.ngoLoginId)},style:{width:"30px",cursor:"pointer"},className:"img-fluid img-border rounded-circle box-shadow-1"}))}}],data:[],filteredData:[],value:"",recs:[]},l.loadRecs=l.loadRecs.bind(Object(o.a)(l)),l}return Object(l.a)(a,[{key:"loadRecs",value:function(e){this.setState({data:e}),console.log(this.state.recs)}},{key:"handleClick",value:function(e){localStorage.setItem("Ngoid",e),window.location="../../views/dashboard/ngoprofile"}},{key:"handleScreener",value:function(e){localStorage.setItem("Ngoid",e),window.location="../../views/dashboard/screenerlist"}},{key:"componentWillUnmount",value:function(){console.log("WIllUnmount************"),this.mounted=!1}},{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,N.a.post("http://159.65.148.197:3001/api/ngo/ngoList",{email:"jilani.it@gmail.com",status:1}).then((function(t){if(console.log("Returned data:",t.data.status),1===t.data.status){t.data.message;var a=t.data.data.data;console.log(a[0]),e.loadRecs(a)}}))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.columns,n=e.value,l=e.filteredData;return s.a.createElement(u.a,null,s.a.createElement(d.a,null,s.a.createElement(f.a,null,"Enrolled NGO List")),s.a.createElement(b.a,{className:"rdt_Wrapper"},s.a.createElement(p.a,{className:"dataTable-custom",data:n.length?l:t,columns:a,noHeader:!0,pagination:!0,subHeader:!0,subHeaderComponent:s.a.createElement(j,{value:n,handleFilter:this.handleFilter})})))}}]),a}(s.a.Component);t.default=C},577:function(e,t,a){e.exports=a.p+"static/media/viewprofile.08133088.png"},675:function(e,t,a){e.exports=a.p+"static/media/screenerlist.6bd8fb27.png"}}]);
//# sourceMappingURL=37.c40a92ea.chunk.js.map