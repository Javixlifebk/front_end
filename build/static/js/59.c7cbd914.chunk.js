(this["webpackJsonpcom.javixlife.javixui"]=this["webpackJsonpcom.javixlife.javixui"]||[]).push([[59],{1201:function(e,a,l){"use strict";l.r(a);var t=l(11),i=l(15),o=l(13),r=l(12),n=l(95),c=l(0),s=l.n(c),u=l(587),d=l(1171),m=l(1172),h=l(1173),v=l(1174),b=l(1175),D=l(1166),g=l(1167),x=l(1168),E=l(1170),p=l(1169),C=l(172),f=l(57),B=l(26),F=(l(580),l(560)),M=l(173),y=(l(589),l(40)),S=l.n(y),N=(Object(B.b)((function(e){return{user:e.auth.login.userRole}}))((function(e){var a=e.component,l=e.fullLayout,t=Object(n.a)(e,["component","fullLayout"]);return s.a.createElement(f.a,Object.assign({},t,{render:function(e){return s.a.createElement(M.a.Consumer,null,(function(t){var i=!0===l?t.fullLayout:"horizontal"===t.state.activeLayout?t.horizontalLayout:t.VerticalLayout;return s.a.createElement(i,Object.assign({},e,{permission:e.user}),s.a.createElement(c.Suspense,{fallback:s.a.createElement(F.a,null)},s.a.createElement(a,e)))}))}}))})),function(e){Object(o.a)(l,e);var a=Object(r.a)(l);function l(){var e;Object(t.a)(this,l);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return(e=a.call.apply(a,[this].concat(o))).state={fname:"",lname:"",gender:"",email:"",mobile:"",dob:"",qualification:"",regno:"",medcouncil:"",regyear:"",experience:"",specialization:"",country:"",mstate:"",district:"",addr:"",myexection:"",doctortype:"",pincode:"",fileuploads:"",siguploads:"",curTime:(new Date).toLocaleString()},e.onChangeHandler=function(a){e.setState({fileuploads:a.target.files[0],loaded:0})},e.onSignHandler=function(a){e.setState({siguploads:a.target.files[0],loaded:0})},e.handleSubmit=function(a){a.preventDefault();var l=new Date,t="",i="";t=l.getMonth()+1<=9?"0"+(l.getMonth()+1):l.getMonth()+1,i=l.getDate()+1<=9?"0"+(l.getDate()+1):l.getDate()+1;(new FormData).append("profile",e.state.fileuploads);var o=l.getFullYear()+"-"+t+"-"+i,r="userId="+localStorage.getItem("userid");r+="&token=dfjkhsdfaksjfh3756237&firstName="+e.state.fname+"&lastName="+e.state.lname,r+="&sex="+e.state.gender+"&mobileNo="+e.state.mobile+"&email="+e.state.email,r+="&dateOfBirth="+e.state.dob+"&dateOfOnBoarding="+o+"&qualification="+e.state.qualification,r+="&specialisation="+e.state.specialization+"&country="+e.state.country+"&state="+e.state.mstate,r+="&district="+e.state.district+"&address="+e.state.addr+"&pincode="+e.state.pincode,r+="&medicalRegNo="+e.state.regno+"&statteMedicalCouncil="+e.state.medcouncil+"&yearOfReg="+e.state.regyear+"&experience="+e.state.experience,console.log(r);S()({method:"post",url:"http://159.65.148.197:3001/api/doctor/addprofile?=",data:r,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log("In Good way:"),console.log(e.data),1===e.data.status&&(alert("Profile Updated Successfully"),document.location="/views/auth/logout")})).catch((function(e){console.log("Exception:"),console.log(e)}))},e}return Object(i.a)(l,[{key:"componentDidMount",value:function(){var e=this;console.log("DID MOUNT ************"),this.mounted=!0,S.a.post("http://159.65.148.197:3001/api/doctor/doctorById?=",{userId:localStorage.getItem("Docid"),token:"dfjkhsdfaksjfh3756237"}).then((function(a){var l=a.data.data.data;e.setState({doctorId:l[0].doctorId}),e.setState({fname:l[0].firstName}),e.setState({lname:l[0].lastName}),e.setState({gender:l[0].sex}),e.setState({email:l[0].email}),e.setState({mobile:l[0].mobile}),e.setState({dob:l[0].info.dateOfBirth}),e.setState({specialization:l[0].info.specialisation}),e.setState({qualification:l[0].info.qualification}),e.setState({country:l[0].info.country}),e.setState({mstate:l[0].info.state}),e.setState({district:l[0].info.district}),e.setState({addr:l[0].info.address}),e.setState({pincode:l[0].info.pincode}),e.setState({imageurl:l[0].info.photo}),e.setState({signature:l[0].signature})}))}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,null,s.a.createElement(m.a,{lg:"12",md:"12"},s.a.createElement(h.a,null,s.a.createElement(v.a,null,s.a.createElement(b.a,null,"Doctor Profile")),s.a.createElement(D.a,null,s.a.createElement(g.a,{action:"/",onSubmit:this.handleSubmit},s.a.createElement(d.a,null,s.a.createElement(m.a,{sm:"6"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"nameVertical"},"First Name"),s.a.createElement(p.a,{type:"text",name:"fname",id:"nameVertical",placeholder:"First Name",value:this.state.fname,onChange:function(a){return e.setState({fname:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"6"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"nameVertical"},"Last Name"),s.a.createElement(p.a,{type:"text",name:"lname",id:"nameVertical",placeholder:"Last Name",value:this.state.lname,onChange:function(a){return e.setState({lname:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"2"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Gender"),s.a.createElement(u.a,{name:"colors",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"Male",label:"Male",color:"#00B8D9",isFixed:!0},{value:"Female",label:"Female",color:"#00B8D9",isFixed:!0}],className:"React",isOptionSelected:this.state.gender,classNamePrefix:"select",onChange:function(a){return e.setState({gender:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"5"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Email"),s.a.createElement(p.a,{type:"email",name:"Email",id:"EmailVertical",placeholder:"Email",value:this.state.email,onChange:function(a){return e.setState({email:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"5"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:""},"Mobile"),s.a.createElement(p.a,{type:"number",name:"mobile",id:"mobileVertical",placeholder:"Mobile",value:this.state.mobile,onChange:function(a){return e.setState({mobile:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Date of Birth"),s.a.createElement(p.a,{type:"Date",name:"mobile",id:"mobileVertical",placeholder:"DOB",value:this.state.dob,onChange:function(a){return e.setState({dob:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Qualification"),s.a.createElement(p.a,{type:"text",name:"qualification",id:"EmailVertical",placeholder:"Qualification",value:this.state.qualification,onChange:function(a){return e.setState({qualification:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Medical Registration No"),s.a.createElement(p.a,{type:"text",name:"registrationno",id:"EmailVertical",placeholder:"Medical Registration No",value:this.state.regno,onChange:function(a){return e.setState({regno:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Doctor Type"),s.a.createElement(u.a,{name:"doctortype",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"Javix Doctor(JD)",label:"Javix Doctor(JD)",color:"#00B8D9",isFixed:!0},{value:"NGO Doctor(ND)",label:"NGO Doctor(ND)",color:"#00B8D9",isFixed:!0},{value:"Honorarium International Doctor(HID)",label:"Honorarium International Doctor(HID)",color:"#00B8D9",isFixed:!0},{value:"Honorarium Bharatiya Doctor(HBD)",label:"Honorarium Bharatiya Doctor(HBD)",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({doctortype:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"State Medical Council"),s.a.createElement(u.a,{name:"medicalcouncil",options:[{value:"0",label:"Medical Council",color:"#00B8D9",isFixed:!0},{value:"Andhra Pradesh Medical Council",label:"Andhra Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Arunachal Pradesh Medical Council",label:"Arunachal Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Assam Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bhopal Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bihar Medical Council",label:"Assam Medical Council",color:"#00B8D9",isFixed:!0},{value:"Bombay Medical Council",label:"Bombay Medical Council",color:"#00B8D9",isFixed:!0},{value:"Chandigarh Medical Council",label:"Chandigarh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Chattisgarh Medical Council",label:"Chattisgarh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Delhi Medical Council",label:"Delhi Medical Council",color:"#00B8D9",isFixed:!0},{value:"Goa Medical Council",label:"Goa Medical Council",color:"#00B8D9",isFixed:!0},{value:"Gujrat Medical Council",label:"Gujrat Medical Council",color:"#00B8D9",isFixed:!0},{value:"Haryana Medical Council",label:"Haryana Medical Council",color:"#00B8D9",isFixed:!0},{value:"Himachal Medical Council",label:"Himachal Medical Council",color:"#00B8D9",isFixed:!0},{value:"Hyderabad Medical Council",label:"Hyderabad Medical Council",color:"#00B8D9",isFixed:!0},{value:"Jammu Medical Council",label:"Jammu Medical Council",color:"#00B8D9",isFixed:!0},{value:"Jharkhand Medical Council",label:"Jharkhand Medical Council",color:"#00B8D9",isFixed:!0},{value:"Karnataka Medical Council",label:"Karnataka Medical Council",color:"#00B8D9",isFixed:!0},{value:"Madras Medical Council",label:"Madras Medical Council",color:"#00B8D9",isFixed:!0},{value:"Mahakoshal Medical Council",label:"Mahakoshal Medical Council",color:"#00B8D9",isFixed:!0},{value:"Maharastra Medical Council",label:"Maharastra Medical Council",color:"#00B8D9",isFixed:!0},{value:"Manipur Medical Council",label:"Manipur Medical Council",color:"#00B8D9",isFixed:!0},{value:"Medial Council of Tanganyika",label:"Medial Council of Tanganyika",color:"#00B8D9",isFixed:!0},{value:"Mizoram Medical Council",label:"Mizoram Medical Council",color:"#00B8D9",isFixed:!0},{value:"Mysore Medical Council",label:"Mysore Medical Council",color:"#00B8D9",isFixed:!0},{value:"NA",label:"NA",color:"#00B8D9",isFixed:!0},{value:"Nagaland Medical Council",label:"Nagaland Medical Council",color:"#00B8D9",isFixed:!0},{value:"Orissa Medical Council",label:"Orissa Medical Council",color:"#00B8D9",isFixed:!0},{value:"Pondicherry Medical Council",label:"Pondicherry Medical Council",color:"#00B8D9",isFixed:!0},{value:"Punjab Medical Council",label:"Punjab Medical Council",color:"#00B8D9",isFixed:!0},{value:"Rajasthan Medical Council",label:"Rajasthan Medical Council",color:"#00B8D9",isFixed:!0},{value:"Sikkim Medical Council",label:"Sikkim Medical Council",color:"#00B8D9",isFixed:!0},{value:"Tamil Medical Council",label:"Tamil Medical Council",color:"#00B8D9",isFixed:!0},{value:"Telangana Medical Council",label:"Telangana Medical Council",color:"#00B8D9",isFixed:!0},{value:"Ravancore Coachin Medical Council,Trivendrum",label:"Ravancore Coachin Medical Council,Trivendrum",color:"#00B8D9",isFixed:!0},{value:"Tripura State Medical Council",label:"Tripura State Medical Council",color:"#00B8D9",isFixed:!0},{value:"Uttar Pradesh Medical Council",label:"Uttar Pradesh Medical Council",color:"#00B8D9",isFixed:!0},{value:"Uttarakhand Medical Council",label:"Uttarakhand Medical Council",color:"#00B8D9",isFixed:!0},{value:"Vidharba Medical Council",label:"Vidharba Medical Council",color:"#00B8D9",isFixed:!0},{value:"West Bengal Medical Council",label:"West Bengal Medical Council",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({medcouncil:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Registration Year"),s.a.createElement(p.a,{type:"text",name:"regyear",id:"EmailVertical",placeholder:"Registration Year",value:this.state.regyear,onChange:function(a){return e.setState({regyear:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Experience"),s.a.createElement(p.a,{type:"text",name:"experience",id:"EmailVertical",placeholder:"Experience",value:this.state.experience,onChange:function(a){return e.setState({experience:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:""},"Specialization"),s.a.createElement(u.a,{name:"spcialization",options:[{value:"0",label:"Select Speciallization",color:"#00B8D9",isFixed:!0},{value:"Andrologist",label:"Andrologist",color:"#00B8D9",isFixed:!0},{value:"Cardiac Physician",label:"Cardiac Physician",color:"#00B8D9",isFixed:!0},{value:"Chest Physician",label:"Chest Physician",color:"#00B8D9",isFixed:!0},{value:"Cosmetologist",label:"Cosmetologist",color:"#00B8D9",isFixed:!0},{value:"Dental Surgeon",label:"Dental Surgeon",color:"#00B8D9",isFixed:!0},{value:"Dermatologist",label:"Dermatologist",color:"#00B8D9",isFixed:!0},{value:"Diabetologist",label:"Diabetologist",color:"#00B8D9",isFixed:!0},{value:"Endocrinologist",label:"Endocrinologist",color:"#00B8D9",isFixed:!0},{value:"ENT",label:"ENT",color:"#00B8D9",isFixed:!0},{value:"Gastro",label:"Surgeon",color:"#00B8D9",isFixed:!0},{value:"Gastroenterologist",label:"Gastroenterologist",color:"#00B8D9",isFixed:!0},{value:"General Physician",label:"General Physician",color:"#00B8D9",isFixed:!0},{value:"General Surgeon",label:"General Surgeon",color:"#00B8D9",isFixed:!0},{value:"Interventional Cardiologist",label:"Interventional Cardiologis",color:"#00B8D9",isFixed:!0},{value:"IVF",label:"IVF",color:"#00B8D9",isFixed:!0},{value:"Nephrologist",label:"Nephrologist",color:"#00B8D9",isFixed:!0},{value:"Radiology",label:"Radiology",color:"#00B8D9",isFixed:!0},{value:"Neuro Surgeon",label:"Neuro Surgeon",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({specialization:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Country Name"),s.a.createElement(u.a,{name:"country",options:[{value:"India",label:"India",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({country:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"State Name"),s.a.createElement(u.a,{name:"State",options:[{value:"0",label:"Please Select",color:"#00B8D9",isFixed:!0},{value:"AN",label:"Andaman and Nicobar Islands",color:"#00B8D9",isFixed:!0},{value:"AP",label:"Andhra Pradesh",color:"#00B8D9",isFixed:!0},{value:"AR",label:"Arunachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"AS",label:"Assam",color:"#00B8D9",isFixed:!0},{value:"BR",label:"Bihar",color:"#00B8D9",isFixed:!0},{value:"CG",label:"Chandigarh",color:"#00B8D9",isFixed:!0},{value:"CH",label:"Chhattisgarh",color:"#00B8D9",isFixed:!0},{value:"Dadra and Nagar Haveli",label:"Dadra and Nagar Haveli",color:"#00B8D9",isFixed:!0},{value:"Daman and Diu",label:"Daman and Diu",color:"#00B8D9",isFixed:!0},{value:"Delhi",label:"Delhi",color:"#00B8D9",isFixed:!0},{value:"Gujarat",label:"Gujarat",color:"#00B8D9",isFixed:!0},{value:"Haryana",label:"Haryana",color:"#00B8D9",isFixed:!0},{value:"Himachal Pradesh",label:"Himachal Pradesh",color:"#00B8D9",isFixed:!0},{value:"Jammu and Kashmir",label:"Jammu and Kashmir",color:"#00B8D9",isFixed:!0},{value:"Jharkhand",label:"Jharkhand",color:"#00B8D9",isFixed:!0},{value:"Karnataka",label:"Karnataka",color:"#00B8D9",isFixed:!0},{value:"Kerala",label:"Kerala",color:"#00B8D9",isFixed:!0},{value:"Lakshadweep",label:"Lakshadweep",color:"#00B8D9",isFixed:!0},{value:"Madhya Pradesh",label:"Madhya Pradesh",color:"#00B8D9",isFixed:!0},{value:"Maharashtra",label:"Maharashtra",color:"#00B8D9",isFixed:!0},{value:"Manipur",label:"Manipur",color:"#00B8D9",isFixed:!0},{value:"Meghalaya",label:"Meghalaya",color:"#00B8D9",isFixed:!0},{value:"Mizoram",label:"Mizoram",color:"#00B8D9",isFixed:!0},{value:"Odisha",label:"Odisha",color:"#00B8D9",isFixed:!0},{value:"Puducherry",label:"Puducherry",color:"#00B8D9",isFixed:!0},{value:"Punjab",label:"Punjab",color:"#00B8D9",isFixed:!0},{value:"Rajasthan",label:"Rajasthan",color:"#00B8D9",isFixed:!0},{value:"Sikkim",label:"Sikkim",color:"#00B8D9",isFixed:!0},{value:"Tamil Nadu",label:"Tamil Nadu",color:"#00B8D9",isFixed:!0},{value:"Telangana",label:"Telangana",color:"#00B8D9",isFixed:!0},{value:"Tripura",label:"Tripura",color:"#00B8D9",isFixed:!0},{value:"Uttar Pradesh",label:"Uttar Pradesh",color:"#00B8D9",isFixed:!0},{value:"Uttarakhand",label:"Uttarakhand",color:"#00B8D9",isFixed:!0},{value:"West Bengal",label:"West Bengal",color:"#00B8D9",isFixed:!0}],className:"React",classNamePrefix:"select",onChange:function(a){return e.setState({mstate:a.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"District Name"),s.a.createElement(p.a,{type:"text",name:"Email",id:"EmailVertical",placeholder:"District",value:this.state.district,onChange:function(a){return e.setState({district:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"4"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Pin Code"),s.a.createElement(p.a,{type:"text",name:"pincode",id:"EmailVertical",placeholder:"Pin Code",value:this.state.pincode,onChange:function(a){return e.setState({pincode:a.target.value})},required:!0}))),s.a.createElement(m.a,{sm:"12"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"EmailVertical"},"Doctor Address"),s.a.createElement(p.a,{type:"textarea",name:"Email",id:"EmailVertical",placeholder:"Address",value:this.state.addr,onChange:function(a){return e.setState({addr:a.target.value})},required:!0}))),s.a.createElement(d.a,null,s.a.createElement(m.a,{sm:"12"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"nameVertical"},"Upload Photo"),s.a.createElement(p.a,{type:"file",name:"fileuploads",id:"imgphoto",placeholder:"Upload Photo",onChange:this.onChangeHandler,required:!0})))),s.a.createElement(d.a,null,s.a.createElement(m.a,{sm:"12"},s.a.createElement(x.a,null,s.a.createElement(E.a,{for:"nameVertical"},"Upload Signature"),s.a.createElement(p.a,{type:"file",name:"fileuploads",id:"imgsignature",placeholder:"Upload Signature",onChange:this.onSignHandler,required:!0})))),s.a.createElement(m.a,{sm:"12"},s.a.createElement(x.a,null,s.a.createElement(C.a.Ripple,{color:"primary",type:"submit",className:"mr-1 mb-1"},"Submit"),s.a.createElement(C.a.Ripple,{outline:!0,color:"warning",type:"reset",className:"mb-1"},"Reset"))))))))))}}]),l}(s.a.Component));a.default=N}}]);
//# sourceMappingURL=59.c7cbd914.chunk.js.map