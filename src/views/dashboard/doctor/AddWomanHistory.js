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

import Radio from "../../../components/@vuexy/radio/RadioVuexy"
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

class AddWomanHistory extends React.Component {
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  state = {
    ageoffirstperiod:'',
    pregnancies:'',
    miscarriages:'',
    abortions:'',
    menopauseage:'',
    isregularperiods:'',
    children:'',
    lastmenstrualperiod:'',
    numberofdaysbleeding:'',
    intervalbetweenperiods:'',
    flow:'',
    painwithmenstruation:'',
    useofmedicationforpain:'',
    misseddays:'',
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
      var period=0;
      if(this.state.isregularperiods==="Yes"){
        period=1
       }

      let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mydate + '-' + myCurrentDate.getDate();
      this.setState()
      let postData="citizenId="+localStorage.getItem("citizenId");
          //postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          if(localStorage.getItem("roleId")==="1")
          postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          else
          postData+="&token=dfjkhsdfaksjfh3756237&screenerId="+localStorage.getItem("usermasid");
          postData+="&ageoffirstperiod="+this.state.ageoffirstperiod+"&pregnancies="+this.state.pregnancies;
          postData+="&miscarriages="+this.state.miscarriages+"&abortions="+this.state.abortions+"&children="+this.state.children;
          postData+="&menopauseage="+this.state.menopauseage+"&isregular="+period+"&lastmenstrualperiod="+this.state.lastmenstrualperiod;
          postData+="&numberofdaysbleeding="+this.state.numberofdaysbleeding+"&intervalbetweenperiods="+this.state.intervalbetweenperiods+"&flow="+this.state.flow;
          postData+="&painwithmenstruation="+this.state.painwithmenstruation+"&useofmedicationforpain="+this.state.useofmedicationforpain+"&misseddays="+this.state.misseddays;
   
          
      let _targetPostURL="http://143.244.136.145:3001/api/citizen/addWomenHistory?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{

        if(res.data.status===1){
          alert('Reproductory History Added Successfully')
          document.location="/dashboard/patientview"
          
        }
      })
      .catch(e=>{
      });

  }
    
  render() {
  
    const documentType = [
      { value: "Referrals", label: "Referrals", color: "#00B8D9", isFixed: true },
      { value: "Registration Forms", label: "Registration Forms", color: "#00B8D9", isFixed: true },
      { value: "HIPPA Forms", label: "HIPPA Forms", color: "#00B8D9", isFixed: true },
      { value: "Medication Lists", label: "Medication Lists", color: "#00B8D9", isFixed: true },
      { value: "Clinic Lab Sheets", label: "Clinic Lab Sheets", color: "#00B8D9", isFixed: true },
      { value: "Blood Gluecose Logs", label: "Blood Gluecose Logs", color: "#00B8D9", isFixed: true },
      { value: "Food Diaries", label: "Food Diaries", color: "#00B8D9", isFixed: true },
      { value: "Other Assessment Forms", label: "Other Assessment Forms", color: "#00B8D9", isFixed: true },
      { value: "Other", label: "Other", color: "#00B8D9", isFixed: true }
     
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
            lg="12"
            className="modal-dialog-centered"
          >
             <ModalHeader toggle={this.toggleModal}>
             Reproductive History
            </ModalHeader>
            <ModalBody md="12">
        <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Age of First Period</Label>
                  <Input
                    type="number"                    
                    name="ageoffirstperiod"
                    id="ageoffirstperiod"
                    placeholder="Input Value"
                    value={this.state.ageoffirstperiod}
                    onChange={e => this.setState({ ageoffirstperiod: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Number of Pregnancies</Label>
                  <Input
                    type="number"                    
                    name="pregnancies"
                    id="pregnancies"
                    placeholder="Input Value"
                    value={this.state.pregnancies}
                    onChange={e => this.setState({ pregnancies: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Number of Miscarriages or Abortions</Label>
                  <Input
                    type="number"                    
                    name="miscarriages"
                    id="miscarriages"
                    placeholder="Input Value"
                    value={this.state.miscarriages}
                    onChange={e => this.setState({ miscarriages: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Number of Children</Label>
                  <Input
                    type="number"                    
                    name="children"
                    id="children"
                    placeholder="Input Value"
                    value={this.state.children}
                    onChange={e => this.setState({ children: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
           

            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Have you reached menopause ? If so what age?</Label>
                  <Input
                    type="text"                    
                    name="menopauseage"
                    id="menopauseage"
                    placeholder="Input Value"
                    value={this.state.menopauseage}
                    onChange={e => this.setState({ menopauseage: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
              <h3>Periods History </h3>
            </Col>
            </Row>

            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Last menstrual period?</Label>
                  <Input
                    type="text"                    
                    name="lastmenstrualperiod"
                    id="lastmenstrualperiod"
                    placeholder="Input Value"
                    value={this.state.lastmenstrualperiod}
                    onChange={e => this.setState({ lastmenstrualperiod: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>

            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Number of days bleeding?</Label>
                  <Input
                    type="text"                    
                    name="numberofdaysbleeding"
                    id="numberofdaysbleeding"
                    placeholder="Input Value"
                    value={this.state.numberofdaysbleeding}
                    onChange={e => this.setState({ numberofdaysbleeding: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Interval between periods?</Label>
                  <Input
                    type="text"                    
                    name="intervalbetweenperiods"
                    id="intervalbetweenperiods"
                    placeholder="Input Value"
                    value={this.state.intervalbetweenperiods}
                    onChange={e => this.setState({intervalbetweenperiods: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical"> Regular or irregular ?</Label>
                  <div>
                  <Radio
                    label="Yes"
                    value="Yes"
                    color="success"
                    defaultChecked={false}
                    name="isregularperiods"
                    onChange={e => this.setState({ isregularperiods: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="No"
                      color="danger"
                      defaultChecked={false}
                      name="isregularperiods"
                      onChange={e => this.setState({ isregularperiods: e.target.value })}
                    />
                  </div>
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">•	Flow- low/normal/high ?</Label>
                  <Input
                    type="text"                    
                    name="flow"
                    id="flow"
                    placeholder="Input Value"
                    value={this.state.flow}
                    onChange={e => this.setState({flow: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Pain with menstruation ?</Label>
                  <Input
                    type="text"                    
                    name="flow"
                    id="flow"
                    placeholder="Input Value"
                    value={this.state.painwithmenstruation}
                    onChange={e => this.setState({painwithmenstruation: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Use of medication for pain ?</Label>
                  <Input
                    type="text"                    
                    name="useofmedicationforpain"
                    id="useofmedicationforpain"
                    placeholder="Input Value"
                    value={this.state.useofmedicationforpain}
                    onChange={e => this.setState({useofmedicationforpain: e.target.value })}
                    />
                </FormGroup>
              </Col>             
            </Row>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Missed days of school or work due to period  ?</Label>
                  <Input
                    type="text"                    
                    name="misseddays"
                    id="misseddays"
                    placeholder="Input Value"
                    value={this.state.misseddays}
                    onChange={e => this.setState({misseddays: e.target.value })}
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

export default AddWomanHistory
