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
    fname:'',
    doctype:'',
    fileuploads:'',
    curTime : new Date().toLocaleString()
  }

  onChangeHandler=event=>{

    this.setState({
      fileuploads: event.target.files[0],
      loaded: 0,
    })

}

 
  handleSubmit = e => {
    e.preventDefault() 
  
 
  
    let postData="issueNo="+localStorage.getItem("issueNo")
    postData+="&token=dfjkhsdfaksjfh3756237";
    postData+="&comments="+this.state.fname;
    postData+="&status="+this.state.doctype;
    let _targetPostURL="http://143.244.136.145:3010/api/issues/issuesUpdate?=";
    axios(
      {
        method: 'post',
        url: _targetPostURL,
        data: postData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        }

    ).then(res=>{

   
      if(res.data.status===1){
        alert('Issues Status Updated Successfully')
        window.location='/dashboard/admin/issuelistall'
      }
    })
    .catch(e=>{
      
     
    });
  
   

  }
    
  render() {
  
    const documentType = [
      { value: "Select Status", label: "Select Status", color: "#00B8D9", isFixed: true },
      { value: "1", label: "Assigned", color: "#00B8D9", isFixed: true },
      { value: "2", label: "Resolved", color: "#00B8D9", isFixed: true },
      { value: "3", label: "Closed", color: "#00B8D9", isFixed: true }   
     
    ]
          
    return (
     
        <React.Fragment >
         <hr></hr>       
          
        <Form action="/" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Select Status</Label>
                  <Select                 
                  name="colors"
                  options={documentType}
                  className="React"
                  classNamePrefix="select"               
                  onChange={e => this.setState({ doctype: e.value })}
                  required
              />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Comments</Label>
                  <Input
                    type="textarea"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Comments"
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
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
       

     
   
      </React.Fragment>
    )
  }
}

export default AddAllergy
