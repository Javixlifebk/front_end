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

    //console.log(event.target.files[0])
    this.setState({
      fileuploads: event.target.files[0],
      loaded: 0,
    })

}

 
  handleSubmit = e => {
    e.preventDefault()  
    var returnUrl="";
    const formData = new FormData(); 
    formData.append('document', this.state.fileuploads)
    axios.post("http://159.65.148.197:3001/upload/documents", formData, { 
      // receive two    parameter endpoint url ,form data
  })
  .then(res => { // then print response status
   
    returnUrl= res.data.url;
    let postData="citizenId="+localStorage.getItem("citizenId")  
     if(localStorage.getItem("roleId")==="1")
        postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
    else      
    postData+="&token=dfjkhsdfaksjfh3756237"+"&screenerId="+localStorage.getItem("usermasid") ;
    postData+="&status=1" +"&recordUrl="+returnUrl+"&type="+this.state.doctype+"&description="+this.state.fname;
    console.log(postData);
    let _targetPostURL="http://159.65.148.197:3001/api/citizen/addDocuments?=";
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
        alert('Document Updated Successfully')
        window.location='../../views/dashboard/patientview'
      }
    })
    .catch(e=>{
      
      console.log("Exception:"); 
      console.log(e);
    });
  })

 
        
      var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else{
        mydate=myCurrentDate.getMonth()+1;
      }

      let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mydate + '-' + myCurrentDate.getDate();
      this.setState()
     
   

  }
    
  render() {
  
    const documentType = [
      { value: "Prescription", label: "Prescription", color: "#00B8D9", isFixed: true },
      { value: "Reports", label: "Reports", color: "#00B8D9", isFixed: true },
      { value: "X-ray", label: "X-ray", color: "#00B8D9", isFixed: true },
      { value: "CT Scan", label: "CT Scan", color: "#00B8D9", isFixed: true },
      { value: "MRI", label: "MRI", color: "#00B8D9", isFixed: true },
      { value: "Ultrasound", label: "Ultrasound", color: "#00B8D9", isFixed: true },
      { value: "Discharge Summary", label: "Discharge Summary", color: "#00B8D9", isFixed: true },
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
             Attach Patient Documents
            </ModalHeader>
            <ModalBody md="12">
        <Form action="/" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Document Type</Label>
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
                  <Label for="nameVertical">Add note/comment</Label>
                  <Input
                    type="textarea"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Add note/comment"
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
                  <Label for="nameVertical">Attachment</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                    id="nameVertical"
                    placeholder="Attachment"                   
                    onChange={this.onChangeHandler}
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
