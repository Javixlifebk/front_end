(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[66],{1250:function(e,a,l){"use strict";l.r(a);var i=l(11),t=l(15),r=l(13),o=l(12),n=l(95),c=l(0),u=l.n(c),s=l(587),d=l(1171),m=l(1172),h=l(1173),v=l(1174),b=l(1175),D=l(1166),x=l(1167),g=l(1168),E=l(1170),C=l(1169),B=l(172),p=l(57),F=l(26),M=(l(580),l(560)),f=l(173),y=(l(589),l(40)),S=l.n(y),N=(Object(F.b)((function(e){return{user:e.auth.login.userRole}}))((function(e){var a=e.component,l=e.fullLayout,i=Object(n.a)(e,["component","fullLayout"]);return u.a.createElement(p.a,Object.assign({},i,{render:function(e){return u.a.createElement(f.a.Consumer,null,(function(i){var t=!0===l?i.fullLayout:"horizontal"===i.state.activeLayout?i.horizontalLayout:i.VerticalLayout;return u.a.createElement(t,Object.assign({},e,{permission:e.user}),u.a.createElement(c.Suspense,{fallback:u.a.createElement(M.a,null)},u.a.createElement(a,e)))}))}}))})),function(e){Object(r.a)(l,e);var a=Object(o.a)(l);function l(){var e;Object(i.a)(this,l);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(e=a.call.apply(a,[this].concat(r))).state={fname:"",lname:"",gender:"",email:"",mobile:"",dob:"",qualification:"",regno:"",medcouncil:"",regyear:"",experience:"",specialization:"",country:"",mstate:"",district:"",addr:"",myexection:"",doctortype:"",pincode:"",fileuploads:"",siguploads:"",curTime:(new Date).toLocaleString()},e.onChangeHandler=function(a){e.setState({fileuploads:a.target.files[0],loaded:0})},e.onSignHandler=function(a){e.setState({siguploads:a.target.files[0],loaded:0})},e.handleSubmit=function(a){a.preventDefault();var l=new Date,i="",t="";i=l.getMonth()+1<=9?"0"+(l.getMonth()+1):l.getMonth()+1,t=l.getDate()+1<=9?"0"+(l.getDate()+1):l.getDate()+1;(new FormData).append("profile",e.state.fileuploads);var r=l.getFullYear()+"-"+i+"-"+t,o="userId="+localStorage.getItem("userid");o+="&token=dfjkhsdfaksjfh3756237&firstName="+e.state.fname+"&lastName="+e.state.lname,o+="&sex="+e.state.gender+"&mobileNo="+e.state.mobile+"&email="+e.state.email,o+="&dateOfBirth="+e.state.dob+"&dateOfOnBoarding="+r+"&qualification="+e.state.qualification,o+="&specialisation="+e.state.specialization+"&country="+e.state.country+"&state="+e.state.mstate,o+="&district="+e.state.district+"&address="+e.state.addr+"&pincode="+e.state.pincode,o+="&medicalRegNo="+e.state.regno+"&statteMedicalCouncil="+e.state.medcouncil+"&yearOfReg="+e.state.regyear+"&experience="+e.state.experience,console.log(o);S()({method:"post",url:"http://159.65.148.197:3001/api/doctor/addprofile?=",data:o,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("In Good way:"),console.log(e.data),1===e.data.status&&(alert("Profile Updated Successfully"),document.location="/views/auth/logout")})).catch((function(e){console.log("Exception:"),console.log(e)}))},e}return Object(t.a)(l,[{key:"render",value:function(){var e=this;return u.a.createElement(u.a.Fragment,null,u.a.createElement(d.a,null,u.a.createElement(m.a,{lg:"12",md:"12"},u.a.createElement(h.a,null,u.a.createElement(v.a,null,u.a.createElement(b.a,null,"Doctor Profile")),u.a.createElement(D.a,null,u.a.createElement(x.a,{action:"/",onSubmit:this.handleSubmit},u.a.createElement(d.a,null,u.a.createElement(m.a,{sm:"6"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"nameVertical"},"First Name"),u.a.createElement(C.a,{type:"text",name:"fname",id:"nameVertical",placeholder:"First Name",value:this.state.fname,onChange:function(a){return e.setState({fname:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"6"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"nameVertical"},"Last Name"),u.a.createElement(C.a,{type:"text",name:"lname",id:"nameVertical",placeholder:"Last Name",value:this.state.lname,onChange:function(a){return e.setState({lname:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"2"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Gender"),u.a.createElement(s.a,{name:"colors",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"Male",label:"Male",color:"#00B8D9",isFixed:!0},{value:"Female",label:"Female",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({gender:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"5"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Email"),u.a.createElement(C.a,{type:"email",name:"Email",id:"EmailVertical",placeholder:"Email",value:this.state.email,onChange:function(a){return e.setState({email:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"5"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:""},"Mobile"),u.a.createElement(C.a,{type:"number",name:"mobile",id:"mobileVertical",placeholder:"Mobile",value:this.state.mobile,onChange:function(a){return e.setState({mobile:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Date of Birth"),u.a.createElement(C.a,{type:"Date",name:"mobile",id:"mobileVertical",placeholder:"DOB",value:this.state.dob,onChange:function(a){return e.setState({dob:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Qualification"),u.a.createElement(C.a,{type:"text",name:"qualification",id:"EmailVertical",placeholder:"Qualification",value:this.state.qualification,onChange:function(a){return e.setState({qualification:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Medical Registration No"),u.a.createElement(C.a,{type:"text",name:"registrationno",id:"EmailVertical",placeholder:"Medical Registration No",value:this.state.regno,onChange:function(a){return e.setState({regno:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Doctor Type"),u.a.createElement(s.a,{name:"doctortype",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"Javix Doctor(JD)",label:"Javix Doctor(JD)",color:"#00B8D9",isFixed:!0},{value:"NGO Doctor(ND)",label:"NGO Doctor(ND)",color:"#00B8D9",isFixed:!0},{value:"Honorarium International Doctor(HID)",label:"Honorarium International Doctor(HID)",color:"#00B8D9",isFixed:!0},{value:"Honorarium Bharatiya Doctor(HBD)",label:"Honorarium Bharatiya Doctor(HBD)",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({doctortype:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"State Medical Council"),u.a.createElement(s.a,{name:"medicalcouncil",options:[{value:"0",label:"Medical Council",color:"#00B8D9",isFixed:!0},{value:"Andhra Pradesh Medical Council",label:"Andhra Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Arunachal Pradesh Medical Council",label:"Arunachal Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Assam Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bhopal Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bihar Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bombay Medical Council",label:"Bombay Medical Council",color:"#00B8D9",isFixed:!0},{value:"Chandigarh Medical Council",label:"Chandigarh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Chattisgarh Medical Council",label:"Chattisgarh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Delhi Medical Council",label:"Delhi Medical Council",color:"#00B8D9",isFixed:!0},{value:"Goa Medical Council",label:"Goa Medical Council",color:"#00B8D9",isFixed:!0},{value:"Gujrat Medical Council",label:"Gujrat Medical Council",color:"#00B8D9",isFixed:!0},{value:"Haryana Medical Council",label:"Haryana Medical Council",color:"#00B8D9",isFixed:!0},{value:"Himachal Medical Council",label:"Himachal Medical Council",color:"#00B8D9",isFixed:!0},{value:"Hyderabad Medical Council",label:"Hyderabad Medical Council",color:"#00B8D9",isFixed:!0},{value:"Jammu Medical Council",label:"Jammu Medical Council",color:"#00B8D9",isFixed:!0},{value:"Jharkhand Medical Council",label:"Jharkhand Medical Council",color:"#00B8D9",isFixed:!0},{value:"Karnataka Medical Council",label:"Karnataka Medical Council",color:"#00B8D9",isFixed:!0},{value:"Madras Medical Council",label:"Madras Medical Council",color:"#00B8D9",isFixed:!0},{value:"Mahakoshal Medical Council",label:"Mahakoshal Medical Council",color:"#00B8D9",isFixed:!0},{value:"Maharastra Medical Council",label:"Maharastra Medical Council",color:"#00B8D9",isFixed:!0},{value:"Manipur Medical Council",label:"Manipur Medical Council",color:"#00B8D9",isFixed:!0},{value:"Medial Council of Tanganyika",label:"Medial Council of Tanganyika",color:"#00B8D9",isFixed:!0},{value:"Mizoram Medical Council",label:"Mizoram Medical Council",color:"#00B8D9",isFixed:!0},{value:"Mysore Medical Council",label:"Mysore Medical Council",color:"#00B8D9",isFixed:!0},{value:"NA",label:"NA",color:"#00B8D9",isFixed:!0},{value:"Nagaland Medical Council",label:"Nagaland Medical Council",color:"#00B8D9",isFixed:!0},{value:"Orissa Medical Council",label:"Orissa Medical Council",color:"#00B8D9",isFixed:!0},{value:"Pondicherry Medical Council",label:"Pondicherry Medical Council",color:"#00B8D9",isFixed:!0},{value:"Punjab Medical Council",label:"Punjab Medical Council",color:"#00B8D9",isFixed:!0},{value:"Rajasthan Medical Council",label:"Rajasthan Medical Council",color:"#00B8D9",isFixed:!0},{value:"Sikkim Medical Council",label:"Sikkim Medical Council",color:"#00B8D9",isFixed:!0},{value:"Tamil Medical Council",label:"Tamil Medical Council",color:"#00B8D9",isFixed:!0},{value:"Telangana Medical Council",label:"Telangana Medical Council",color:"#00B8D9",isFixed:!0},{value:"Ravancore Coachin Medical Council,Trivendrum",label:"Ravancore Coachin Medical Council,Trivendrum",color:"#00B8D9",isFixed:!0},{value:"Tripura State Medical Council",label:"Tripura State Medical Council",color:"#00B8D9",isFixed:!0},{value:"Uttar Pradesh Medical Council",label:"Uttar Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Uttarakhand Medical Council",label:"Uttarakhand Medical Council",color:"#00B8D9",isFixed:!0},{value:"Vidharba Medical Council",label:"Vidharba Medical Council",color:"#00B8D9",isFixed:!0},{value:"West Bengal Medical Council",label:"West Bengal Medical Council",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({medcouncil:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Registration Year"),u.a.createElement(C.a,{type:"text",name:"regyear",id:"EmailVertical",placeholder:"Registration Year",value:this.state.regyear,onChange:function(a){return e.setState({regyear:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Experience"),u.a.createElement(C.a,{type:"text",name:"experience",id:"EmailVertical",placeholder:"Experience",value:this.state.experience,onChange:function(a){return e.setState({experience:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:""},"Specialization"),u.a.createElement(s.a,{name:"spcialization",options:[{value:"0",label:"Select Speciallization",color:"#00B8D9",isFixed:!0},{value:"Andrologist",label:"Andrologist",color:"#00B8D9",isFixed:!0},{value:"Cardiac Physician",label:"Cardiac Physician",color:"#00B8D9",isFixed:!0},{value:"Chest Physician",label:"Chest Physician",color:"#00B8D9",isFixed:!0},{value:"Cosmetologist",label:"Cosmetologist",color:"#00B8D9",isFixed:!0},{value:"Dental Surgeon",label:"Dental Surgeon",color:"#00B8D9",isFixed:!0},{value:"Dermatologist",label:"Dermatologist",color:"#00B8D9",isFixed:!0},{value:"Diabetologist",label:"Diabetologist",color:"#00B8D9",isFixed:!0},{value:"Endocrinologist",label:"Endocrinologist",color:"#00B8D9",isFixed:!0},{value:"ENT",label:"ENT",color:"#00B8D9",isFixed:!0},{value:"Gastro",label:"Surgeon",color:"#00B8D9",isFixed:!0},{value:"Gastroenterologist",label:"Gastroenterologist",color:"#00B8D9",isFixed:!0},{value:"General Physician",label:"General Physician",color:"#00B8D9",isFixed:!0},{value:"General Surgeon",label:"General Surgeon",color:"#00B8D9",isFixed:!0},{value:"Interventional Cardiologist",label:"Interventional Cardiologis",color:"#00B8D9",isFixed:!0},{value:"IVF",label:"IVF",color:"#00B8D9",isFixed:!0},{value:"Nephrologist",label:"Nephrologist",color:"#00B8D9",isFixed:!0},{value:"Radiology",label:"Radiology",color:"#00B8D9",isFixed:!0},{value:"Neuro Surgeon",label:"Neuro Surgeon",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({specialization:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Country Name"),u.a.createElement(s.a,{name:"country",options:[{value:"India",label:"India",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({country:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"State Name"),u.a.createElement(s.a,{name:"State",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"AN",label:"Andaman and Nicobar Islands",color:"#00B8D9",isFixed:!0},{value:"AP",label:"Andhra Pradesh",color:"#00B8D9",isFixed:!0},{value:"AR",label:"Arunachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"AS",label:"Assam",color:"#00B8D9",isFixed:!0},{value:"BR",label:"Bihar",color:"#00B8D9",isFixed:!0},{value:"CG",label:"Chandigarh",color:"#00B8D9",isFixed:!0},{value:"CH",label:"Chhattisgarh",color:"#00B8D9",isFixed:!0},{value:"Dadra and Nagar Haveli",label:"Dadra and Nagar Haveli",color:"#00B8D9",isFixed:!0},{value:"Daman and Diu",label:"Daman and Diu",color:"#00B8D9",isFixed:!0},{value:"Delhi",label:"Delhi",color:"#00B8D9",isFixed:!0},{value:"Gujarat",label:"Gujarat",color:"#00B8D9",isFixed:!0},{value:"Haryana",label:"Haryana",color:"#00B8D9",isFixed:!0},{value:"Himachal Pradesh",label:"Himachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"Jammu and Kashmir",label:"Jammu and Kashmir",color:"#00B8D9",isFixed:!0},{value:"Jharkhand",label:"Jharkhand",color:"#00B8D9",isFixed:!0},{value:"Karnataka",label:"Karnataka",color:"#00B8D9",isFixed:!0},{value:"Kerala",label:"Kerala",color:"#00B8D9",isFixed:!0},{value:"Lakshadweep",label:"Lakshadweep",color:"#00B8D9",isFixed:!0},{value:"Madhya Pradesh",label:"Madhya Pradesh",color:"#00B8D9",isFixed:!0},{value:"Maharashtra",label:"Maharashtra",color:"#00B8D9",isFixed:!0},{value:"Manipur",label:"Manipur",color:"#00B8D9",isFixed:!0},{value:"Meghalaya",label:"Meghalaya",color:"#00B8D9",isFixed:!0},{value:"Mizoram",label:"Mizoram",color:"#00B8D9",isFixed:!0},{value:"Odisha",label:"Odisha",color:"#00B8D9",isFixed:!0},{value:"Puducherry",label:"Puducherry",color:"#00B8D9",isFixed:!0},{value:"Punjab",label:"Punjab",color:"#00B8D9",isFixed:!0},{value:"Rajasthan",label:"Rajasthan",color:"#00B8D9",isFixed:!0},{value:"Sikkim",label:"Sikkim",color:"#00B8D9",isFixed:!0},{value:"Tamil Nadu",label:"Tamil Nadu",color:"#00B8D9",isFixed:!0},{value:"Telangana",label:"Telangana",color:"#00B8D9",isFixed:!0},{value:"Tripura",label:"Tripura",color:"#00B8D9",isFixed:!0},{value:"Uttar Pradesh",label:"Uttar Pradesh",color:"#00B8D9",isFixed:!0},{value:"Uttarakhand",label:"Uttarakhand",color:"#00B8D9",isFixed:!0},{value:"West Bengal",label:"West Bengal",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({mstate:a.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"District Name"),u.a.createElement(C.a,{type:"text",name:"Email",id:"EmailVertical",placeholder:"District",value:this.state.district,onChange:function(a){return e.setState({district:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"4"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Pin Code"),u.a.createElement(C.a,{type:"text",name:"pincode",id:"EmailVertical",placeholder:"Pin Code",value:this.state.pincode,onChange:function(a){return e.setState({pincode:a.target.value})},required:!0}))),u.a.createElement(m.a,{sm:"12"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"EmailVertical"},"Doctor Address"),u.a.createElement(C.a,{type:"textarea",name:"Email",id:"EmailVertical",placeholder:"Address",value:this.state.addr,onChange:function(a){return e.setState({addr:a.target.value})},required:!0}))),u.a.createElement(d.a,null,u.a.createElement(m.a,{sm:"12"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"nameVertical"},"Upload Photo"),u.a.createElement(C.a,{type:"file",name:"fileuploads",id:"imgphoto",placeholder:"Upload Photo",onChange:this.onChangeHandler,required:!0})))),u.a.createElement(d.a,null,u.a.createElement(m.a,{sm:"12"},u.a.createElement(g.a,null,u.a.createElement(E.a,{for:"nameVertical"},"Upload Signature"),u.a.createElement(C.a,{type:"file",name:"fileuploads",id:"imgsignature",placeholder:"Upload Signature",onChange:this.onSignHandler,required:!0})))),u.a.createElement(m.a,{sm:"12"},u.a.createElement(g.a,null,u.a.createElement(B.a.Ripple,{color:"primary",type:"submit",className:"mr-1 mb-1"},"Submit"),u.a.createElement(B.a.Ripple,{outline:!0,color:"warning",type:"reset",className:"mb-1"},"Reset"))))))))))}}]),l}(u.a.Component));a.default=N}}]);
//# sourceMappingURL=66.7b73bb34.chunk.js.map