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
  Label,
  Modal,
  ModalHeader,
  ModalBody
 
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
let today = new Date();
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

class AddAllergy extends React.Component {

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  state = {
    allergies:'',
    lname:'', 
    allergyType:'',
    curTime : today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
  }

  handleSubmit = e => {
    e.preventDefault()   

      var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+myCurrentDate.getMonth()+1;
      }

      let dateOfOnBoarding = mydate + '-' +  mydate + '-' + myCurrentDate.getFullYear();
      this.setState()
      let postData="citizenId="+localStorage.getItem("citizenId");
          if(localStorage.getItem("roleId")==="1")
          postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          else
          postData+="&token=dfjkhsdfaksjfh3756237&screenerId="+localStorage.getItem("usermasid");
          postData+="&allergies="+this.state.allergies+"&allergydate="+this.state.curTime +"&allergyType="+this.state.allergyType;
          postData+="&ngoId="+localStorage.getItem("ngoId")
         
      let _targetPostURL="http://127.0.0.1:3010/api/citizen/addAllergy?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }  
      ).then(res=>{

        if(res.data.status===1){
          alert('Allergy Added Successfully')
          window.location='/dashboard/patientview'
        }
      })
      .catch(e=>{
      });
  }
  handleClick = e => {
    e.preventDefault()   
    alert('Hello');
  }    
  render() {

     const allergyType=[
      { value: "Drug Allergy", label: "Drug Allergy", color: "#00B8D9", isFixed: true },
      { value: "Food Allergy", label: "Food Allergy", color: "#00B8D9", isFixed: true },
      { value: "Other Allergy", label: "Other Allergy", color: "#00B8D9", isFixed: true }
     ]    
      return (
      
        <React.Fragment >
         <hr></hr>
         
        <Row>
        <Col lg="12" md="12">
            <div><h3>  <Button.Ripple
            color="success"
            outline
            onClick={this.toggleModal}
          >
            Add New
          </Button.Ripple></h3></div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
           
            className="modal-dialog-centered"
          >
             <ModalHeader toggle={this.toggleModal}>
              Add Patient Allergies
            </ModalHeader>
            <ModalBody >
           <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Added On</Label>
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Added On"
                    value={this.state.curTime}
                    onChange={e => this.setState({ fname: e.target.value })}
                    required
                    readOnly
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Allergy Type</Label>
                  <Select                 
                  name="colors"
                  options={allergyType}
                  className="React"
                  classNamePrefix="select"               
                  onChange={e => this.setState({ allergyType: e.value })}
                  required
              />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Allergy Name</Label>
                  <Input
                    type="textarea"
                    
                    name="allergies"
                    id="nameVertical"
                    placeholder="Allergy Name"
                    value={this.state.allergies}
                    onChange={e => this.setState({ allergies: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
                       
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
          </ModalBody>
          </Modal>
       
      </Col>
      </Row>
   
      </React.Fragment>
    )
  }
}

export default AddAllergy
