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
    specialization:'',
    country:'',
    mstate:'',
    district:'',
    addr:'',
    pincode:'',
    myexection:'',
    curTime : new Date().toLocaleString()
  }
  findDataById(){
    console.log("useridd",localStorage.getItem("screenerId"));
    console.log("screenerId",localStorage.getItem("screenerId"));
    axios.post('https://javixlife.org/api/ngo/screenerListById',{'screenerLoginId':localStorage.getItem("userid")})
    .then(response => {
      if(response){
        localStorage.setItem ('javixid',localStorage.getItem("userid"))
        localStorage.setItem ("screenerId",response.data.data.data[0].screenerId)
      console.log("@@@@@@@@@@@@",response.data.data.data[0].screenerId);
     
  
      window.location = '/dashboard';
      }
  })
  }
  
  componentDidMount(){
    this.findDataById()
  }
  
  handleSubmit = e => {
      e.preventDefault() 

      var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else{
        mydate=myCurrentDate.getMonth()+1;
      }

      let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mydate + '-' + myCurrentDate.getDate();
      let postData="userId="+localStorage.getItem("userid");
      
          postData+="&token=dfjkhsdfaksjfh3756237&firstName="+this.state.fname+"&lastName="+this.state.lname;
          postData+="&sex="+this.state.gender+"&mobileNo="+this.state.mobile+"&email="+this.state.email;
          postData+="&dateOfBirth="+this.state.dob+"&dateOfOnBoarding="+dateOfOnBoarding+"&qualification="+this.state.qualification;
          postData+="&specialisation="+this.state.specialization+"&country="+this.state.country+"&state="+this.state.mstate;
          postData+="&district="+this.state.district+"&pincode="+this.state.pincode+"&address="+this.state.addr;      
          postData+="&ngoId="+localStorage.getItem("ngoId");
      let _targetPostURL="https://javixlife.org/api/ngo/screener/addprofile?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{

      
        if(res.data.status===1){
          alert('Profile Updated Successfully')
          window.location='/dashboard'
        }
      })
      .catch(e=>{
       
      });

  }
    
  render() {
    const colourOptions = [
        { value: "India", label: "India", color: "#00B8D9", isFixed: true },
       
      ]

      const genderOptions = [
        { value: "Male", label: "Male", color: "#00B8D9", isFixed: true },
        { value: "Female", label: "Female", color: "#00B8D9", isFixed: true },
       
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
          <CardTitle>Screener Profile</CardTitle>
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
                  <Label for="">Specialization</Label>
                  <Input
                    type="text"
                    name="spcialization"
                    id="mobileVertical"
                    placeholder="Specialization"
                    value={this.state.specialization}
                    onChange={e => this.setState({ specialization: e.target.value })}
                    required
                  />
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
                    name="district"
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
                  <Label for="EmailVertical">Screener Address</Label>                 
                  <Input
                    type="textarea"                    
                    name="Email"
                    id="EmailVertical"
                    placeholder="Address"
                    value={this.state.addr}
                    onChange={e => this.setState({ addr: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>            
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
