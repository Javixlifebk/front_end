(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[76],{1259:function(e,a,t){"use strict";t.r(a);var l=t(11),r=t(15),n=t(13),i=t(12),o=t(95),c=t(0),s=t.n(c),m=t(587),u=t(1171),d=t(1172),h=t(1173),v=t(1174),E=t(1175),b=t(1166),p=t(1167),g=t(1168),f=t(1170),y=t(1169),D=t(172),x=t(57),B=t(26),N=(t(580),t(560)),F=t(173),P=(t(589),t(40)),R=t.n(P),w=(Object(B.b)((function(e){return{user:e.auth.login.userRole}}))((function(e){var a=e.component,t=e.fullLayout,l=Object(o.a)(e,["component","fullLayout"]);return s.a.createElement(x.a,Object.assign({},l,{render:function(e){return s.a.createElement(F.a.Consumer,null,(function(l){var r=!0===t?l.fullLayout:"horizontal"===l.state.activeLayout?l.horizontalLayout:l.VerticalLayout;return s.a.createElement(r,Object.assign({},e,{permission:e.user}),s.a.createElement(c.Suspense,{fallback:s.a.createElement(N.a,null)},s.a.createElement(a,e)))}))}}))})),function(e){Object(n.a)(t,e);var a=Object(i.a)(t);function t(){var e;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return(e=a.call.apply(a,[this].concat(n))).state={pharmacyName:"",ownerName:"",mobileNo:"",email:"",pharmacyRegistrationNo:"",dateOfRegistration:"",dateOfOnBoarding:"",country:"",mstate:"",district:"",addr:"",myexection:"",curTime:(new Date).toLocaleString()},e.handleSubmit=function(a){a.preventDefault();var t=new Date,l="";l=t.getMonth()+1<=9?"0"+(t.getMonth()+1):t.getMonth()+1;var r=t.getFullYear()+"-"+l+"-"+t.getDate(),n="userId="+localStorage.getItem("userid");n+="&token=dfjkhsdfaksjfh3756237&pharmacyName="+e.state.pharmacyName+"&ownerName="+e.state.ownerName,n+="&mobileNo="+e.state.mobileNo+"&email="+e.state.email,n+="&pharmacyRegistrationNo="+e.state.pharmacyRegistrationNo+"&dateOfOnBoarding="+r+"&dateOfRegistration="+e.state.dateOfRegistration,n+="&country="+e.state.country+"&state="+e.state.mstate,n+="&district="+e.state.district+"&address="+e.state.addr,console.log(n);R()({method:"post",url:"http://159.65.148.197:3001/api/pharmacy/addprofile?=",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("In Good way:"),console.log(e.data),1===e.data.status&&(alert("Profile Updated Successfully"),window.location="../../views/dashboard/pharmacyviewprofile")})).catch((function(e){console.log("Exception:"),console.log(e.response.data)}))},e}return Object(r.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(u.a,null,s.a.createElement(d.a,{lg:"12",md:"12"},s.a.createElement(h.a,null,s.a.createElement(v.a,null,s.a.createElement(E.a,null,"Pharmacy Profile")),s.a.createElement(b.a,null,s.a.createElement(p.a,{action:"/",onSubmit:this.handleSubmit},s.a.createElement(u.a,null,s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"nameVertical"},"Pharmacy Name"),s.a.createElement(y.a,{type:"text",name:"name",id:"nameVertical",placeholder:"Pharmacy",value:this.state.pharmacyName,onChange:function(a){return e.setState({pharmacyName:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"nameVertical"},"Pharmacy Owner Name"),s.a.createElement(y.a,{type:"text",name:"name",id:"nameVertical",placeholder:"Pharmacy Owner Name",value:this.state.ownerName,onChange:function(a){return e.setState({ownerName:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"nameVertical"},"Registration No"),s.a.createElement(y.a,{type:"text",name:"name",id:"nameVertical",placeholder:"Registration No",value:this.state.pharmacyRegistrationNo,onChange:function(a){return e.setState({pharmacyRegistrationNo:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"nameVertical"},"Pharmacy Registration Date"),s.a.createElement(y.a,{type:"date",name:"name",id:"nameVertical",placeholder:"NGO Registration Date",value:this.state.dateOfRegistration,onChange:function(a){return e.setState({dateOfRegistration:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"EmailVertical"},"Email"),s.a.createElement(y.a,{type:"email",name:"Email",id:"EmailVertical",placeholder:"Email",value:this.state.email,onChange:function(a){return e.setState({email:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"6"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:""},"Mobile"),s.a.createElement(y.a,{type:"number",name:"mobile",id:"mobileVertical",placeholder:"Mobile",value:this.state.mobileNo,onChange:function(a){return e.setState({mobileNo:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"4"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"EmailVertical"},"Country Name"),s.a.createElement(m.a,{name:"country",options:[{value:"India",label:"India",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({country:a.value})},required:!0}))),s.a.createElement(d.a,{sm:"4"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"EmailVertical"},"State Name"),s.a.createElement(m.a,{name:"colors",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"AN",label:"Andaman and Nicobar Islands",color:"#00B8D9",isFixed:!0},{value:"AP",label:"Andhra Pradesh",color:"#00B8D9",isFixed:!0},{value:"AR",label:"Arunachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"AS",label:"Assam",color:"#00B8D9",isFixed:!0},{value:"BR",label:"Bihar",color:"#00B8D9",isFixed:!0},{value:"CG",label:"Chandigarh",color:"#00B8D9",isFixed:!0},{value:"CH",label:"Chhattisgarh",color:"#00B8D9",isFixed:!0},{value:"Dadra and Nagar Haveli",label:"Dadra and Nagar Haveli",color:"#00B8D9",isFixed:!0},{value:"Daman and Diu",label:"Daman and Diu",color:"#00B8D9",isFixed:!0},{value:"Delhi",label:"Delhi",color:"#00B8D9",isFixed:!0},{value:"Gujarat",label:"Gujarat",color:"#00B8D9",isFixed:!0},{value:"Haryana",label:"Haryana",color:"#00B8D9",isFixed:!0},{value:"Himachal Pradesh",label:"Himachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"Jammu and Kashmir",label:"Jammu and Kashmir",color:"#00B8D9",isFixed:!0},{value:"Jharkhand",label:"Jharkhand",color:"#00B8D9",isFixed:!0},{value:"Karnataka",label:"Karnataka",color:"#00B8D9",isFixed:!0},{value:"Kerala",label:"Kerala",color:"#00B8D9",isFixed:!0},{value:"Lakshadweep",label:"Lakshadweep",color:"#00B8D9",isFixed:!0},{value:"Madhya Pradesh",label:"Madhya Pradesh",color:"#00B8D9",isFixed:!0},{value:"Maharashtra",label:"Maharashtra",color:"#00B8D9",isFixed:!0},{value:"Manipur",label:"Manipur",color:"#00B8D9",isFixed:!0},{value:"Meghalaya",label:"Meghalaya",color:"#00B8D9",isFixed:!0},{value:"Mizoram",label:"Mizoram",color:"#00B8D9",isFixed:!0},{value:"Odisha",label:"Odisha",color:"#00B8D9",isFixed:!0},{value:"Puducherry",label:"Puducherry",color:"#00B8D9",isFixed:!0},{value:"Punjab",label:"Punjab",color:"#00B8D9",isFixed:!0},{value:"Rajasthan",label:"Rajasthan",color:"#00B8D9",isFixed:!0},{value:"Sikkim",label:"Sikkim",color:"#00B8D9",isFixed:!0},{value:"Tamil Nadu",label:"Tamil Nadu",color:"#00B8D9",isFixed:!0},{value:"Telangana",label:"Telangana",color:"#00B8D9",isFixed:!0},{value:"Tripura",label:"Tripura",color:"#00B8D9",isFixed:!0},{value:"Uttar Pradesh",label:"Uttar Pradesh",color:"#00B8D9",isFixed:!0},{value:"Uttarakhand",label:"Uttarakhand",color:"#00B8D9",isFixed:!0},{value:"West Bengal",label:"West Bengal",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",value:this.state.state,onChange:function(a){return e.setState({mstate:a.value})},required:!0}))),s.a.createElement(d.a,{sm:"4"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"EmailVertical"},"District Name"),s.a.createElement(y.a,{type:"text",name:"district",id:"EmailVertical",placeholder:"District",value:this.state.district,onChange:function(a){return e.setState({district:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"12"},s.a.createElement(g.a,null,s.a.createElement(f.a,{for:"EmailVertical"},"NGO Address"),s.a.createElement(y.a,{type:"textarea",name:"addr",id:"EmailVertical",placeholder:"Address",value:this.state.addr,onChange:function(a){return e.setState({addr:a.target.value})},required:!0}))),s.a.createElement(d.a,{sm:"12"},s.a.createElement(g.a,null,s.a.createElement(D.a.Ripple,{color:"primary",type:"submit",className:"mr-1 mb-1"},"Submit"),s.a.createElement(D.a.Ripple,{outline:!0,color:"warning",type:"reset",className:"mb-1"},"Reset"))))))))))}}]),t}(s.a.Component));a.default=w}}]);
//# sourceMappingURL=76.96ec2fce.chunk.js.map