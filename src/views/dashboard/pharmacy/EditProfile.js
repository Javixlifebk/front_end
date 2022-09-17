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
    pharmacyName:'',
    ownerName:'',
    mobileNo:'',
    email:'',
    pharmacyRegistrationNo:'',
    dateOfRegistration:'',
    dateOfOnBoarding:'',
    country:'',
    mstate:'',
    district:'',
    addr:'',
    myexection:'',
    curTime : new Date().toLocaleString()
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
          postData+="&token=dfjkhsdfaksjfh3756237&pharmacyName="+this.state.pharmacyName+"&ownerName="+this.state.ownerName;
          postData+="&mobileNo="+this.state.mobileNo+"&email="+this.state.email;
          postData+="&pharmacyRegistrationNo="+this.state.pharmacyRegistrationNo+"&dateOfOnBoarding="+dateOfOnBoarding+"&dateOfRegistration="+this.state.dateOfRegistration;
          postData+="&country="+this.state.country+"&state="+this.state.mstate;
          postData+="&district="+this.state.district+"&address="+this.state.addr;      
   
          
      let _targetPostURL="http://159.65.148.197:3001/api/pharmacy/addprofile?=";
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
          window.location="/dashboard/pharmacyviewprofile"
        }
      })
      .catch(e=>{
   
      });


  }
  render() {
    const colourOptions = [
        { value: "India", label: "India", color: "#00B8D9", isFixed: true },
       
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
          <CardTitle>Pharmacy Profile</CardTitle>
        </CardHeader>
        <CardBody>
             <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Pharmacy Name</Label>
                  <Input
                    type="text"                    
                    name="name"
                    id="nameVertical"
                    placeholder="Pharmacy"
                    value={this.state.pharmacyName}
                    onChange={e => this.setState({ pharmacyName: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Pharmacy Owner Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameVertical"
                    placeholder="Pharmacy Owner Name"
                    value={this.state.ownerName}
                    onChange={e => this.setState({ ownerName: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Registration No</Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameVertical"
                    placeholder="Registration No"
                    value={this.state.pharmacyRegistrationNo}
                    onChange={e => this.setState({ pharmacyRegistrationNo: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Pharmacy Registration Date</Label>
                  <Input
                    type="date"
                    name="name"
                    id="nameVertical"
                    placeholder="NGO Registration Date"
                    value={this.state.dateOfRegistration}
                    onChange={e => this.setState({ dateOfRegistration: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
            
          
              <Col sm="6">
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
            
              <Col sm="6">
                <FormGroup>
                  <Label for="">Mobile</Label>
                  <Input
                    type="number"
                    name="mobile"
                    id="mobileVertical"
                    placeholder="Mobile"
                    value={this.state.mobileNo}
                    onChange={e => this.setState({ mobileNo: e.target.value })}
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
                
                name="colors"
                options={stateOptions}
                className="React"
                classNamePrefix="select"
                value={this.state.state}
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
         
              <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">NGO Address</Label>
                 
                  <Input
                    type="textarea"                    
                    name="addr"
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
