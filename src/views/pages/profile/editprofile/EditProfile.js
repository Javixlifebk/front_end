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


import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Check } from "react-feather"

import Spinner from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../../utility/context/Layout"

import DataTable from "../../../tables/data-tables/DataTableCustom"
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
    ngoregno:'',
    regdate:'',
    ngoname:'',
    ownername:'',
    email:'',
    mobile:'',
    dob:'',
    qualification:'',
    specialization:'',
    country:'',
    mstate:'',
    district:'',
    addr:'',
    myexection:'',
    // image:'',
    client_logo:'',
    javixid:'',
    curTime : new Date().toLocaleString()
  }

  

  onChangeHandler=event=>{

    this.setState({
      image: event.target.files[0],
      loaded: 0,
    })

}


onSignHandler=event=>{

  this.setState({
    client_logo: event.target.files[0],
    loaded: 0,
  })

}
// if(ngo){
 findDataById(){
  console.log("useridd",localStorage.getItem("userid"));
  axios.post('https://javixlife.org:3010/api/ngo/ngoFindbyId',{ngoLoginId:localStorage.getItem("userid")})
  .then(response => {
    if(response){
      localStorage.setItem ('javixid',localStorage.getItem("userid"))
    console.log("@@@@@@@@@@@@",response);
   

    window.location = '/dashboard';
    }
})
}

  handleSubmit = e => {

    e.preventDefault()


 

    console.log(localStorage.setItem ('javixid',localStorage.getItem("userid"))); 
    var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else{
        mydate=myCurrentDate.getMonth()+1;
      }

     
      var returnUrl="";
      const formData = new FormData(); 
      // formData.append('image', this.state.image)
      formData.append('client_logo', this.state.client_logo)
      formData.append('ngoId', localStorage.getItem("userid"))
      axios.post("https://javixlife.org:3010/api/logo/addbanner", formData, { 
        // receive two    parameter endpoint url ,form data
    })

          let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mydate + '-' + myCurrentDate.getDate();
          let postData="userId="+localStorage.getItem("userid");
          postData+="&token=dfjkhsdfaksjfh3756237&ngoName="+this.state.ngoname+"&ownerName="+this.state.ownername;
          postData+="&mobileNo="+this.state.mobile+"&email="+this.state.email;
          postData+="&ngoRegistrationNo="+this.state.ngoregno+"&dateOfOnBoarding="+dateOfOnBoarding+"&dateOfRegistration="+this.state.regdate;
          postData+="&country="+this.state.country+"&state="+this.state.mstate;
          postData+="&district="+this.state.district+"&address="+this.state.addr;      
          
          
      let _targetPostURL="https://javixlife.org:3010/api/ngo/addprofile?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{
        returnUrl= res.data['profile-url'];
        if(res.data.status===1){
          alert('Profile Updated Successfully')
          document.location = '/dashboard';
        }
       
      })
      .catch(e=>{
        
      });


  }
 
  componentDidMount(){
    this.findDataById()
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
      <React.StrictMode>
        <React.Fragment >
         
        <Row>
        <Col lg="12" md="12">
      <Card >
        <CardHeader>
          <CardTitle>NGO Profile</CardTitle>
        </CardHeader>
        <CardBody>
             <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">NGO Registration No</Label>
                  <Input
                    type="text"                    
                    name="name"
                    id="nameVertical"
                    placeholder="NGO Registration No"
                    value={this.state.ngoregno}
                    onChange={e => this.setState({ ngoregno: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">NGO Registration Date</Label>
                  <Input
                    type="date"
                    name="name"
                    id="nameVertical"
                    placeholder="NGO Registration Date"
                    value={this.state.regdate}
                    onChange={e => this.setState({ regdate: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">NGO Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameVertical"
                    placeholder="NGO Name"
                    value={this.state.ngoname}
                    onChange={e => this.setState({ ngoname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">NGO Owner Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameVertical"
                    placeholder="NGO Owner Name"
                    value={this.state.ownername}
                    onChange={e => this.setState({ ownername: e.target.value })}
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
                    value={this.state.mobile}
                    onChange={e => this.setState({ mobile: e.target.value })}
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
              <Row>
              {/* <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Upload Logo</Label>
                  <Input
                    type="file"                    
                    name="image"
                    id="imgsignature"
                    placeholder="Upload Signature"                   
                    onChange={this.onChangeHandler}
                    required
                  />
                </FormGroup>
              </Col> */}
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Upload Client Logo</Label>
                  <Input
                    type="file"                    
                    name="client_logo"
                    id="client_logo"
                    placeholder="Upload photo"                   
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
      </React.StrictMode>
    )
  }
}
export default EditProfile
