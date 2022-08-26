import React,{ Suspense, lazy } from "react"
import Select from "react-select"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label
 
} from "reactstrap"

import { Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"


import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Check } from "react-feather"

import Spinner from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../utility/context/Layout"

import DataTable from "../../tables/data-tables/DataTableCustom"
import axios from 'axios';

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}



const AppRoute = connect(mapStateToProps)(RouteConfig)
class EditProfile extends React.Component {
  state = {
    fname:'',
    lname:'',
    gender:'',
    email:'',
    mobile:'',
    dob:'',
    qualification:'',
    regno:'',
    medcouncil:'',
    regyear:'',
    experience:'',
    specialization:'',
    country:'',
    mstate:'',
    district:'',
    addr:'',
    myexection:'',
    doctortype:'',
    pincode:'',
    fileuploads:'',
    siguploads:'',
    curTime : new Date().toLocaleString()
  }

  onChangeHandler=event=>{

    //console.log(event.target.files[0])
    this.setState({
      fileuploads: event.target.files[0],
      loaded: 0,
    })

}

onSignHandler=event=>{

  //console.log(event.target.files[0])
  this.setState({
    siguploads: event.target.files[0],
    loaded: 0,
  })

}


  handleSubmit = e => {
    e.preventDefault()   

      var myCurrentDate = new Date();
      let mymonth='';
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mymonth="0"+(myCurrentDate.getMonth()+1);
      }else{
        mymonth=myCurrentDate.getMonth()+1;
      }
      if((myCurrentDate.getDate()+1)<=9){
        mydate="0"+(myCurrentDate.getDate()+1);
      }else{
        mydate=myCurrentDate.getDate()+1;
      }

      var returnUrl="";
      const formData = new FormData(); 
      formData.append('profile', this.state.fileuploads);

      let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mymonth + '-' + mydate;
      let postData="userId="+localStorage.getItem("userid");
          postData+="&token=dfjkhsdfaksjfh3756237&firstName="+this.state.fname+"&lastName="+this.state.lname;
          postData+="&sex="+this.state.gender+"&mobileNo="+this.state.mobile+"&email="+this.state.email;
          postData+="&dateOfBirth="+this.state.dob+"&dateOfOnBoarding="+dateOfOnBoarding+"&qualification="+this.state.qualification;
          postData+="&specialisation="+this.state.specialization+"&country="+this.state.country+"&state="+this.state.mstate;
          postData+="&district="+this.state.district+"&address="+this.state.addr+"&pincode="+this.state.pincode;   
          postData+="&medicalRegNo="+this.state.regno+"&statteMedicalCouncil="+this.state.medcouncil+"&yearOfReg="+this.state.regyear+"&experience="+this.state.experience;   
    
      console.log(postData);
      let _targetPostURL="http://localhost:3001/api/doctor/addprofile?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{

        console.log("In Good way:");
        console.log(res.data);
        if(res.data.status===1){
          alert('Profile Updated Successfully')
          document.location="/views/auth/logout"
        }
      })
      .catch(e=>{
        console.log("Exception:"); 
        console.log(e);
      });

  }
  render() {
    const colourOptions = [
        { value: "India", label: "India", color: "#00B8D9", isFixed: true },
       
      ]

      const medicalCouncil = [
        { value: "0", label: "Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Andhra Pradesh Medical Council", label: "Andhra Pradesh Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Arunachal Pradesh Medical Council", label: "Arunachal Pradesh Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Assam Medical Council", label: "Assam Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Bhopal Medical Council", label: "Assam Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Bihar Medical Council", label: "Assam Medical Council", color: "#00B8D9", isFixed: true },
        { value: "Bombay Medical Council", label: "Bombay Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Chandigarh Medical Council", label: "Chandigarh Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Chattisgarh Medical Council", label: "Chattisgarh Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Delhi Medical Council", label: "Delhi Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Goa Medical Council", label: "Goa Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Gujrat Medical Council", label: "Gujrat Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Haryana Medical Council", label: "Haryana Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Himachal Medical Council", label: "Himachal Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Hyderabad Medical Council", label: "Hyderabad Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Jammu Medical Council", label: "Jammu Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Jharkhand Medical Council", label: "Jharkhand Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Karnataka Medical Council", label: "Karnataka Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Madras Medical Council", label: "Madras Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Mahakoshal Medical Council", label: "Mahakoshal Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Maharastra Medical Council", label: "Maharastra Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Manipur Medical Council", label: "Manipur Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Medial Council of Tanganyika", label: "Medial Council of Tanganyika", color: "#00B8D9", isFixed: true },
        {value:"Mizoram Medical Council", label: "Mizoram Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Mysore Medical Council", label: "Mysore Medical Council", color: "#00B8D9", isFixed: true },
        {value:"NA", label: "NA", color: "#00B8D9", isFixed: true },
        {value:"Nagaland Medical Council", label: "Nagaland Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Orissa Medical Council", label: "Orissa Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Pondicherry Medical Council", label: "Pondicherry Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Punjab Medical Council", label: "Punjab Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Rajasthan Medical Council", label: "Rajasthan Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Sikkim Medical Council", label: "Sikkim Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Tamil Medical Council", label: "Tamil Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Telangana Medical Council", label: "Telangana Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Ravancore Coachin Medical Council,Trivendrum", label: "Ravancore Coachin Medical Council,Trivendrum", color: "#00B8D9", isFixed: true },
        {value:"Tripura State Medical Council", label: "Tripura State Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Uttar Pradesh Medical Council", label: "Uttar Pradesh Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Uttarakhand Medical Council", label: "Uttarakhand Medical Council", color: "#00B8D9", isFixed: true },
        {value:"Vidharba Medical Council", label: "Vidharba Medical Council", color: "#00B8D9", isFixed: true },
        {value:"West Bengal Medical Council", label: "West Bengal Medical Council", color: "#00B8D9", isFixed: true },

       
       
      ]

      const speciaLisation = [
        { value: "0", label: "Select Speciallization", color: "#00B8D9", isFixed: true },
        { value: "Andrologist", label: "Andrologist", color: "#00B8D9", isFixed: true },
        { value: "Cardiac Physician", label: "Cardiac Physician", color: "#00B8D9", isFixed: true },
        { value: "Chest Physician", label: "Chest Physician", color: "#00B8D9", isFixed: true },
        { value: "Cosmetologist", label: "Cosmetologist", color: "#00B8D9", isFixed: true },
        { value: "Dental Surgeon", label: "Dental Surgeon", color: "#00B8D9", isFixed: true },
        { value: "Dermatologist", label: "Dermatologist", color: "#00B8D9", isFixed: true },
        { value: "Diabetologist", label: "Diabetologist", color: "#00B8D9", isFixed: true },
        { value: "Endocrinologist", label: "Endocrinologist", color: "#00B8D9", isFixed: true },
        { value: "ENT", label: "ENT", color: "#00B8D9", isFixed: true },
        { value: "Gastro", label: "Surgeon", color: "#00B8D9", isFixed: true },
        { value: "Gastroenterologist", label: "Gastroenterologist", color: "#00B8D9", isFixed: true },
        { value: "General Physician", label: "General Physician", color: "#00B8D9", isFixed: true },
        { value: "General Surgeon", label: "General Surgeon", color: "#00B8D9", isFixed: true },
        { value: "Interventional Cardiologist", label: "Interventional Cardiologis", color: "#00B8D9", isFixed: true },
        { value: "IVF", label: "IVF", color: "#00B8D9", isFixed: true },
        { value: "Nephrologist", label: "Nephrologist", color: "#00B8D9", isFixed: true },
        { value: "Radiology", label: "Radiology", color: "#00B8D9", isFixed: true },
        { value: "Neuro Surgeon", label: "Neuro Surgeon", color: "#00B8D9", isFixed: true },
        
       
      ]

      const genderOptions = [
        { value: "0", label: "Please Select", color: "#00B8D9", isFixed: true },
        { value: "Male", label: "Male", color: "#00B8D9", isFixed: true },
        { value: "Female", label: "Female", color: "#00B8D9", isFixed: true },
       
      ]

      const typeOptions = [
        { value: "0", label: "Please Select", color: "#00B8D9", isFixed: true },
        { value: "Javix Doctor(JD)", label: "Javix Doctor(JD)", color: "#00B8D9", isFixed: true },
        { value: "NGO Doctor(ND)", label: "NGO Doctor(ND)", color: "#00B8D9", isFixed: true },
        { value: "Honorarium International Doctor(HID)", label: "Honorarium International Doctor(HID)", color: "#00B8D9", isFixed: true },
        { value: "Honorarium Bharatiya Doctor(HBD)", label: "Honorarium Bharatiya Doctor(HBD)", color: "#00B8D9", isFixed: true },
       
      ]

      const stateOptions=[
        {value: "0",label: "Please Select", color: "#00B8D9", isFixed: true },
        {value: "AN",label: "Andaman and Nicobar Islands", color: "#00B8D9", isFixed: true },
        {value: "AP",label: "Andhra Pradesh", color: "#00B8D9", isFixed: true },
        {value: "AR",label: "Arunachal Pradesh", color: "#00B8D9", isFixed: true },
        {value: "AS",label: "Assam", color: "#00B8D9", isFixed: true },
        {value: "BR",label: "Bihar", color: "#00B8D9", isFixed: true },
        {value: "CG",label: "Chandigarh", color: "#00B8D9", isFixed: true },
        {value: "CH",label: "Chhattisgarh", color: "#00B8D9", isFixed: true },
        {value: "Dadra and Nagar Haveli",label: "Dadra and Nagar Haveli", color: "#00B8D9", isFixed: true },
        {value: "Daman and Diu",label: "Daman and Diu", color: "#00B8D9", isFixed: true },
        {value: "Delhi",label: "Delhi", color: "#00B8D9", isFixed: true },
        {value: "Gujarat",label: "Gujarat", color: "#00B8D9", isFixed: true },
        {value: "Haryana",label: "Haryana", color: "#00B8D9", isFixed: true },
        {value: "Himachal Pradesh",label: "Himachal Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Jammu and Kashmir",label: "Jammu and Kashmir", color: "#00B8D9", isFixed: true },
        {value: "Jharkhand",label: "Jharkhand", color: "#00B8D9", isFixed: true },
        {value: "Karnataka",label: "Karnataka", color: "#00B8D9", isFixed: true },
        {value: "Kerala",label: "Kerala", color: "#00B8D9", isFixed: true },
        {value: "Lakshadweep",label: "Lakshadweep", color: "#00B8D9", isFixed: true },
        {value: "Madhya Pradesh",label: "Madhya Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Maharashtra",label: "Maharashtra", color: "#00B8D9", isFixed: true },
        {value: "Manipur",label: "Manipur", color: "#00B8D9", isFixed: true },
        {value: "Meghalaya",label: "Meghalaya", color: "#00B8D9", isFixed: true },
        {value: "Mizoram",label: "Mizoram", color: "#00B8D9", isFixed: true },
        {value: "Odisha",label: "Odisha", color: "#00B8D9", isFixed: true },
        {value: "Puducherry",label: "Puducherry", color: "#00B8D9", isFixed: true },
        {value: "Punjab",label: "Punjab", color: "#00B8D9", isFixed: true },
        {value: "Rajasthan",label: "Rajasthan", color: "#00B8D9", isFixed: true },
        {value: "Sikkim",label: "Sikkim", color: "#00B8D9", isFixed: true },
        {value: "Tamil Nadu",label: "Tamil Nadu", color: "#00B8D9", isFixed: true },
        {value: "Telangana",label: "Telangana", color: "#00B8D9", isFixed: true },
        {value: "Tripura",label: "Tripura", color: "#00B8D9", isFixed: true },
        {value: "Uttar Pradesh",label: "Uttar Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Uttarakhand",label: "Uttarakhand", color: "#00B8D9", isFixed: true },
        {value: "West Bengal",label: "West Bengal", color: "#00B8D9", isFixed: true },

      ]  
    return (
     
        <React.Fragment >
         
        <Row>
        <Col lg="12" md="12">
      <Card >
        <CardHeader>
          <CardTitle>Doctor Profile</CardTitle>
        </CardHeader>
        <CardBody>
        <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">First Name</Label>
                  <Input
                    type="text"
                    
                    name="fname"
                    id="nameVertical"
                    placeholder="First Name"
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Last Name</Label>
                  <Input
                    type="text"
                    name="lname"
                    id="nameVertical"
                    placeholder="Last Name"
                    value={this.state.lname}
                    onChange={e => this.setState({ lname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
             
              <Col sm="2">
                <FormGroup>
                  <Label for="EmailVertical">Gender</Label>
                <Select  
                
                name="colors"
                options={genderOptions}
                className="React"
                classNamePrefix="select"               
                onChange={e => this.setState({ gender: e.value })}
                required
              />
                </FormGroup>
              </Col>
              <Col sm="5">
                <FormGroup>
                  <Label for="EmailVertical">Email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="EmailVertical"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
            
              <Col sm="5">
                <FormGroup>
                  <Label for="">Mobile</Label>
                  <Input
                    type="number"
                    name="mobile"
                    id="mobileVertical"
                    placeholder="Mobile"
                    value={this.state.mobile}
                    onChange={e => this.setState({ mobile: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Date of Birth</Label>
                  <Input
                    type="Date"
                    name="mobile"
                    id="mobileVertical"
                    placeholder="DOB"
                    value={this.state.dob}
                    onChange={e => this.setState({ dob: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Qualification</Label>
                  <Input
                    type="text"
                    name="qualification"
                    id="EmailVertical"
                    placeholder="Qualification"
                    value={this.state.qualification}
                    onChange={e => this.setState({ qualification: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>

              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Medical Registration No</Label>
                  <Input
                    type="text"
                    name="registrationno"
                    id="EmailVertical"
                    placeholder="Medical Registration No"
                    value={this.state.regno}
                    onChange={e => this.setState({ regno: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>

                     
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Doctor Type</Label>

                  <Select       
                
                name="doctortype"
                options={typeOptions}
                className="React"
                classNamePrefix="select"
            
                onChange={e => this.setState({ doctortype: e.value })}
                required
              />
               
                </FormGroup>
              </Col>
             
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">State Medical Council</Label>

                  <Select       
                
                name="medicalcouncil"
                options={medicalCouncil}
                className="React"
                classNamePrefix="select"
            
                onChange={e => this.setState({ medcouncil: e.value })}
                required
              />
               
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Registration Year</Label>
                  <Input
                    type="text"
                    name="regyear"
                    id="EmailVertical"
                    placeholder="Registration Year"
                    value={this.state.regyear}
                    onChange={e => this.setState({ regyear: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Experience</Label>
                  <Input
                    type="text"
                    name="experience"
                    id="EmailVertical"
                    placeholder="Experience"
                    value={this.state.experience}
                    onChange={e => this.setState({ experience: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              
              
              <Col sm="4">
                <FormGroup>
                  <Label for="">Specialization</Label>
                  <Select       
                
                name="spcialization"
                options={speciaLisation}
                className="React"
                classNamePrefix="select"
            
                onChange={e => this.setState({ specialization: e.value })}
                required/>
                  
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Country Name</Label>
                  
                <Select       
                
                name="country"
                options={colourOptions}
                className="React"
                classNamePrefix="select"
            
                onChange={e => this.setState({ country: e.value })}
                required
              />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">State Name</Label>
                  <Select       
                
                name="State"
                options={stateOptions}
                className="React"
                classNamePrefix="select"             
                onChange={e => this.setState({ mstate: e.value })}
                required
              />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">District Name</Label>
                  <Input
                    type="text"
                    name="Email"
                    id="EmailVertical"
                    placeholder="District"
                    value={this.state.district}
                    onChange={e => this.setState({ district: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Pin Code</Label>
                  <Input
                    type="text"
                    name="pincode"
                    id="EmailVertical"
                    placeholder="Pin Code"
                    value={this.state.pincode}
                    onChange={e => this.setState({ pincode: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>         
              <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">Doctor Address</Label>                 
                  <Input
                    type="textarea"                    
                    name="Email"
                    id="EmailVertical"
                    placeholder="Address"
                    value={this.state.addr}
                    onChange={e => this.setState({ addr: e.target.value})}
                    required
                  />
                </FormGroup>
              </Col>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Upload Photo</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                    id="imgphoto"
                    placeholder="Upload Photo"                   
                    onChange={this.onChangeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Upload Signature</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                    id="imgsignature"
                    placeholder="Upload Signature"                   
                    onChange={this.onSignHandler}
                    required
                  />
                </FormGroup>
              </Col>
              </Row>
           
              <Col sm="12">
                <FormGroup>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"                   
                  >
                    Submit
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      </Col>
      </Row>
   
      </React.Fragment>
    )
  }
}
export default EditProfile
