(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[72],{1203:function(e,t,a){"use strict";a.r(t);var n=a(11),o=a(15),s=a(66),l=a(13),r=a(12),c=a(0),i=a.n(c),u=a(1169),d=a(1173),m=a(1174),f=a(1175),p=a(1166),h=a(568),v=a.n(h),w=a(233),b=a(40),C=a.n(b),L=function(e){return i.a.createElement("div",{className:"d-flex flex-wrap justify-content-between"},i.a.createElement("div",{className:"add-new"}),i.a.createElement("div",{className:"position-relative has-icon-left mb-1"},i.a.createElement(u.a,{value:e.value,placeholder:"search",onChange:function(t){return e.handleFilter(t)}}),i.a.createElement("div",{className:"form-control-position"},i.a.createElement(w.a,{size:"15"}))))},E=function(e){Object(l.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).state={txscreenerId:""},o.handleSubmit=function(e){e.preventDefault(),alert(o.state.txscreenerId)},o.handleFilter=function(e){var t=e.target.value,a=o.state.data,n=o.state.filteredData;o.setState({value:t}),t.length&&(n=a.filter((function(e){var a=e.message.toLowerCase().startsWith(t.toLowerCase())||e.mobile.toLowerCase().startsWith(t.toLowerCase())||e.email.toLowerCase().startsWith(t.toLowerCase())||e.revenue.toLowerCase().startsWith(t.toLowerCase())||e.status.toLowerCase().startsWith(t.toLowerCase()),n=e.name.toLowerCase().includes(t.toLowerCase())||e.date.toLowerCase().includes(t.toLowerCase())||e.email.toLowerCase().includes(t.toLowerCase())||e.revenue.toLowerCase().includes(t.toLowerCase())||e.status.toLowerCase().includes(t.toLowerCase());return a||(!a&&n?n:null)})),o.setState({filteredData:n}))},o.state={columns:[{name:"Name",selector:"name",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.firstName," \xa0",e.lastName)}},{name:"Mobile No",selector:"mobile",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.mobile)}},{name:"Email",selector:"email",sortable:!0,cell:function(e){return i.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},e.email)}},{name:"Action",selector:"",sortable:!0,cell:function(e){return i.a.createElement("button",{alt:"porfileImg",onClick:function(){return o.handleClick(e.screenerId)},className:"btn-success"},"mapped")}}],data:[],filteredData:[],value:"",recs:[]},o.loadRecs=o.loadRecs.bind(Object(s.a)(o)),o}return Object(o.a)(a,[{key:"loadRecs",value:function(e){this.setState({data:e}),console.log(this.state.recs)}},{key:"handleClick",value:function(e){if(window.confirm("Are you sure want to Deactivate User !")){var t="screenerId="+e+"&ismapped=1&token=dfjkhsdfaksjfh3756237";C()({method:"post",url:"http://159.65.148.197:3001/api/ngo/updatescreenermap?=",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){1===e.data.status&&window.location.reload()})).catch((function(e){console.log("Exception:"),console.log(e)}))}}},{key:"componentWillUnmount",value:function(){console.log("WIllUnmount************"),this.mounted=!1}},{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,C.a.post("http://159.65.148.197:3001/api/ngo/screenerunmappedlist",{token:"dfjkhsdfaksjfh3756237",issubscreener:0,ismapped:!1}).then((function(t){if(console.log("Returned data:",t.data.status),1===t.data.status){t.data.message;var a=t.data.data.data;console.log(a[0]),e.loadRecs(a)}}))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.columns,n=e.value,o=e.filteredData;return i.a.createElement(d.a,null,i.a.createElement(m.a,null,i.a.createElement(f.a,null,"Unmapped Screener List")),i.a.createElement(p.a,{className:"rdt_Wrapper"},i.a.createElement(v.a,{className:"dataTable-custom",data:n.length?o:t,columns:a,noHeader:!0,pagination:!0,subHeader:!0,subHeaderComponent:i.a.createElement(L,{value:n,handleFilter:this.handleFilter})})))}}]),a}(i.a.Component);t.default=E}}]);
//# sourceMappingURL=72.36da05d5.chunk.js.map