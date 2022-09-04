(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[45],{1193:function(e,t,a){"use strict";a.r(t);var l=a(11),n=a(15),s=a(66),r=a(13),o=a(12),i=a(0),c=a.n(i),u=a(1169),d=a(543),m=a(1173),f=a(1174),A=a(1175),p=a(1166),h=a(568),v=a.n(h),w=a(233),g=a(40),B=a.n(g),I=a(616),C=a.n(I),E=function(e){return c.a.createElement("div",{className:"d-flex flex-wrap justify-content-between"},c.a.createElement("div",{className:"add-new"}),c.a.createElement("div",{className:"position-relative has-icon-left mb-1"},c.a.createElement(u.a,{value:e.value,placeholder:"search",onChange:function(t){return e.handleFilter(t)}}),c.a.createElement("div",{className:"form-control-position"},c.a.createElement(w.a,{size:"15"}))))},x=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleFilter=function(e){var t=e.target.value,a=n.state.data,l=n.state.filteredData;n.setState({value:t}),t.length&&(l=a.filter((function(e){console.dir(e.userId);var a=e.userId.toLowerCase().startsWith(t.toLowerCase())||e.info.firstName.toLowerCase().startsWith(t.toLowerCase())||e.info.lastName.toLowerCase().startsWith(t.toLowerCase()),l=e.userId.toLowerCase().includes(t.toLowerCase())||e.info.firstName.toLowerCase().includes(t.toLowerCase())||e.info.lastName.toLowerCase().includes(t.toLowerCase());return a||(!a&&l?l:null)})),n.setState({filteredData:l}))},n.state={Role:{1:"Doctor",2:"Screener",3:"NGO",4:"Pharmacy",5:"Pathalogy",6:"Citizen",91:"System Admin",92:"Doctor Admin",99:"Controller Admin",21:"Sevika"},columns:[{name:"User Id",selector:"userId",sortable:!0,minWidth:"200px",cell:function(e){return c.a.createElement("div",{className:"d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1"},c.a.createElement("div",{className:"user-info text-truncate ml-xl-50 ml-0"},c.a.createElement("span",{title:e.userId,className:"d-block text-bold-500 text-truncate mb-0"},e.userId),c.a.createElement("small",{title:e.email},c.a.createElement("a",{href:"#"},e.email))))}},{name:"User Role",selector:"roleId",sortable:!0,cell:function(e){return c.a.createElement("p",{className:"text-bold-500 text-truncate mb-0"},n.state.Role[e.roleId])}},{name:"Status",selector:"status",sortable:!0,cell:function(e){return c.a.createElement(d.a,{color:0===e.status?"light-danger":"light-success",pill:!0},0===e.status?"Inactive":"Active")}},{name:"Name",selector:"",sortable:!0,cell:function(e){return c.a.createElement("p",{className:"text-bold-500 mb-0"},e.info.firstName,"\xa0",e.info.lastName)}},{name:"Blocked",selector:"isBlocked",sortable:!0,cell:function(e){return c.a.createElement(d.a,{color:!0===e.info.isBlocked?"light-danger":"light-success",pill:!0},!0===e.info.isBlocked?"Yes":"No")}},{name:"Expired",selector:"",sortable:!0,cell:function(e){return c.a.createElement(d.a,{color:!0===e.info.isExpired?"light-danger":"light-success",pill:!0},!0===e.info.isExpired?"expired":"No")}},{name:"Active",selector:"",sortable:!0,cell:function(e){return c.a.createElement(d.a,{color:!0===e.info.isUnActive?"light-danger":"light-success",pill:!0},!0===e.info.isUnActive?"Inactive":"Active")}},{name:"Action",selector:"",sortable:!0,cell:function(e){return c.a.createElement("img",{src:C.a,alt:"porfileImg",onClick:function(){return n.handleClick(e.userId)},style:{width:"30px",cursor:"pointer"},className:"img-fluid img-border rounded-circle box-shadow-1"})}}],data:[],filteredData:[],value:"",recs:[]},n.loadRecs=n.loadRecs.bind(Object(s.a)(n)),n}return Object(n.a)(a,[{key:"handleClick",value:function(e){if(window.confirm("Are you sure want to Activate User !")){var t="forUserId="+e+"&status=1&isBlocked=0&isExpired=0&isUnActive=0&token=dfjkhsdfaksjfh3756237";B()({method:"post",url:"http://159.65.148.197:3001/api/auth/approve?=",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){1===e.data.status&&window.location.reload()})).catch((function(e){console.log("Exception:"),console.log(e)}))}}},{key:"loadRecs",value:function(e){this.setState({data:e}),console.log(this.state.recs)}},{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,B.a.post("http://159.65.148.197:3001/api/auth/authlist",{email:"jilani.it@gmail.com",status:0}).then((function(t){if(1===t.data.status){t.data.message;var a=t.data.data.data;e.loadRecs(a)}}))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.columns,l=e.value,n=e.filteredData;return c.a.createElement(m.a,null,c.a.createElement(f.a,null,c.a.createElement(A.a,null,"Inactive User List")),c.a.createElement(p.a,{className:"rdt_Wrapper"},c.a.createElement(v.a,{className:"dataTable-custom",data:l.length?n:t,columns:a,noHeader:!0,pagination:!0,subHeader:!0,subHeaderComponent:c.a.createElement(E,{value:l,handleFilter:this.handleFilter})})))}}]),a}(c.a.Component);t.default=x},616:function(e,t){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=45.e5370ef1.chunk.js.map