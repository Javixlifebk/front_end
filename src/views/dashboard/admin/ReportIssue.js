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
class ReportIssue extends React.Component {
  state = {
    subject:'',
    issuedetails:'',      
    myexection:''
   
  }
  handleSubmit = e => {
    e.preventDefault()   

      
      
      let postData="userId="+localStorage.getItem("userid") + "&issue=" + this.state.subject + "&issueDetails=" + this.state.issuedetails;
         
          
      
      let _targetPostURL="http://159.65.148.197:3001/api/issues/addIssue?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{

       
        if(res.data.status===1){
          alert('Issue Raised Successfully');
          document.location="/dashboard/issuelist";
        }
      })
      .catch(e=>{
    
      });

  }
  render() {
    
      const issueOptions = [
        { value: "0", label: "Please Select", color: "#00B8D9", isFixed: true },
        { value: "Citizen Photo not working", label: "Citizen Photo not working", color: "#00B8D9", isFixed: true },
        { value: "Problem in edit profile", label: "Problem in edit profile", color: "#00B8D9", isFixed: true },
        { value: "Screener not able to map user", label: "I am not able to map user", color: "#00B8D9", isFixed: true },
        { value: "I am not able to login through mobile app", label: "I am not able to login through mobile app", color: "#00B8D9", isFixed: true }
       
      ]

      
    return (
     
        <React.Fragment >
         
        <Row>
        <Col lg="12" md="12">
        <Card >
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
        </CardHeader>
        <CardBody>
        <Form action="/" onSubmit={this.handleSubmit}>
            <Row>         
            
           
            <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">Subject</Label>
                <Select  
                
                name="subject"
                options={issueOptions}
                className="React"
                classNamePrefix="select"               
                onChange={e => this.setState({ subject: e.value })}
                required
              />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">Issue Details</Label>
                 
                  <Input
                    type="textarea"
                    
                    name="issuedetails"
                    id="EmailVertical"
                    placeholder="Describe Issue"
                    value={this.state.addr}
                    onChange={e => this.setState({ issuedetails: e.target.value })}
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
export default ReportIssue
