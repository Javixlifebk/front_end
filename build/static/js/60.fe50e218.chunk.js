(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[60],{1199:function(e,a,t){"use strict";t.r(a);var l=t(11),n=t(15),o=t(13),s=t(12),c=(t(95),t(0)),r=t.n(c),i=t(587),u=t(1167),m=t(1171),d=t(1172),p=t(1168),f=t(1170),h=t(1169),v=t(172),g=(t(57),t(26),t(580),t(560),t(173),t(589),t(40)),E=t.n(g),S=function(e){Object(o.a)(t,e);var a=Object(s.a)(t);function t(){var e;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=a.call.apply(a,[this].concat(o))).toggleModal=function(){e.setState((function(e){return{modal:!e.modal}}))},e.state={fname:"",doctype:"",fileuploads:"",curTime:(new Date).toLocaleString()},e.onChangeHandler=function(a){e.setState({fileuploads:a.target.files[0],loaded:0})},e.handleSubmit=function(a){a.preventDefault(),console.log("Status "+e.state.doctype);var t="issueNo="+localStorage.getItem("issueNo");t+="&token=dfjkhsdfaksjfh3756237",t+="&comments="+e.state.fname,t+="&status="+e.state.doctype,console.log(t);E()({method:"post",url:"http://159.65.148.197:3001/api/issues/issuesUpdate?=",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("In Good way:"),console.log(e.data),1===e.data.status&&(alert("Issues Status Updated Successfully"),window.location="../../views/dashboard/issuelistall")})).catch((function(e){console.log("Exception:"),console.log(e)}))},e}return Object(n.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("hr",null),r.a.createElement(u.a,{action:"/",enctype:"multipart/form-data",onSubmit:this.handleSubmit},r.a.createElement(m.a,null,r.a.createElement(d.a,{sm:"12"},r.a.createElement(p.a,null,r.a.createElement(f.a,{for:"nameVertical"},"Select Status"),r.a.createElement(i.a,{name:"colors",options:[{value:"Select Status",label:"Select Status",color:"#00B8D9",isFixed:!0},{value:"1",label:"Assigned",color:"#00B8D9",isFixed:!0},{value:"2",label:"Resolved",color:"#00B8D9",isFixed:!0},{value:"3",label:"Closed",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({doctype:a.value})},required:!0})))),r.a.createElement(m.a,null,r.a.createElement(d.a,{sm:"12"},r.a.createElement(p.a,null,r.a.createElement(f.a,{for:"nameVertical"},"Comments"),r.a.createElement(h.a,{type:"textarea",name:"fname",id:"nameVertical",placeholder:"Comments",value:this.state.fname,onChange:function(a){return e.setState({fname:a.target.value})},required:!0})))),r.a.createElement(m.a,null,r.a.createElement(d.a,{sm:"12"},r.a.createElement(p.a,null,r.a.createElement(v.a.Ripple,{color:"primary",type:"submit",className:"mr-1 mb-1"},"Submit"),r.a.createElement(v.a.Ripple,{outline:!0,color:"warning",type:"reset",className:"mb-1"},"Reset"))))))}}]),t}(r.a.Component);a.default=S}}]);
//# sourceMappingURL=60.fe50e218.chunk.js.map