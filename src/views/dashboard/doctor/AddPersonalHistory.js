import React,{ Suspense } from "react"
import {
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label , 
  Modal,
  ModalHeader,
  ModalBody 
 
} from "reactstrap"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import { Route } from "react-router-dom"


import axios from 'axios';
import Spinner from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../utility/context/Layout"

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

class AddPersonalHistory extends React.Component {

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  state = {
    bornraised:'',
    birthproblem:'', 
    highesteducation:'',
    maritalstatus:'',
    ocupation:'',
    iscurrentlyworking:'',
    hoursweek:'',
    notworking:'',
    isdisability:'',
    disabilitydetails:'',
    legalproblems:'',
    religion:'',
    curTime : new Date().toLocaleString()
  }

  handleSubmit = e => {
    e.preventDefault() 
    
    //alert(this.state.maritalstatus)
      var working=0;
      var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else{
        mydate=myCurrentDate.getMonth()+1;
      }
      if(this.state.notworking==="Yes"){
       working=1
      }

      let dateOfOnBoarding = myCurrentDate.getDate() + '-' +  mydate + '-' + myCurrentDate.getFullYear();
      this.setState()
      let postData="citizenId="+localStorage.getItem("citizenId");
          //postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          if(localStorage.getItem("roleId")==="1")
          postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          else
          postData+="&token=dfjkhsdfaksjfh3756237&screenerId="+localStorage.getItem("usermasid");
          postData+="&bornraised="+this.state.bornraised+"&birthproblem="+this.state.birthproblem;
          postData+="&maritalstatus="+this.state.maritalstatus+"&ocupation="+this.state.ocupation;
          postData+="&notworking="+working+"&legalproblems="+this.state.legalproblems + "&highesteducation=" +this.state.highesteducation;
         
      console.log(postData);
      let _targetPostURL="http://159.65.148.197:3001/api/citizen/addPersonalHistory?=";
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
          alert('Personal History Added Successfully')
          window.location='/dashboard/patientview'
        }
      })
      .catch(e=>{
        console.log("Exception:"); 
        console.log(e);
      });

  }

  
  /*onValueChange = e => {
    e.preventDefault() 
     var  comp=e.target;
       if(comp.checked===true)
         {
           var val=comp.value;
           //alert(val);
         }
     //alert(this.state.highesteducation)
  }*/
    
  render() {
           
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
              Add Patient Personal History
            </ModalHeader>
            <ModalBody >
           <Form action="/" onSubmit={this.handleSubmit}>           
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Birth History</Label>
                  <Input
                    type="textarea"                    
                    name="birthproblem"
                    id="nameVertical"
                    placeholder="Input Value"
                    value={this.state.birthproblem}
                    onChange={e => this.setState({ birthproblem: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              </Row>              

              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Where were born and raised ?</Label>
                  <Input
                    type="textarea"
                    
                    name="bornraised"
                    id="nameVertical"
                    placeholder="Input Value"
                    value={this.state.bornraised}
                    onChange={e => this.setState({ bornraised: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              </Row>


              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">What is your highest education ?</Label>
                  <div>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="High School"
                    color="success"
                    defaultChecked={false}
                    name="highesteducation"
                    value="High School"
                    onChange={e => this.setState({ highesteducation: e.target.value })}
                  />
                  </div>
                

                  <div className="d-inline-block mr-1">
                    <Radio
                      label="College Graduate"
                      value="College Graduate"
                      color="success"
                      defaultChecked={false}
                      name="highesteducation"
               
                      onChange={e => this.setState({ highesteducation: e.target.value })}
                    />
                  </div> 
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Masters"
                      value="Masters"
                      color="success"
                      defaultChecked={false}
                      name="highesteducation"              
                      onChange={e => this.setState({ highesteducation: e.target.value })}
                    />
                  </div> 
                  </div>
                </FormGroup>
              </Col>
              </Row>


              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Marital Status ?</Label>
                  <div>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Never Married"
                    value="Never Married"
                    color="success"
                    defaultChecked={false}
                    name="maritalstatus"
                    onChange={e => this.setState({ maritalstatus: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Married"
                      value="Married"
                      color="success"
                      defaultChecked={false}
                      name="maritalstatus"
                      onChange={e => this.setState({ maritalstatus: e.target.value })}

                    />
                  </div> 

                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Divorced"
                      value="Divorced"
                      color="success"
                      defaultChecked={false}
                      name="maritalstatus"
                      onChange={e => this.setState({ maritalstatus: e.target.value })}
                    />
                  </div> 
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Seperated"
                      value="Seperated"
                      color="success"
                      defaultChecked={false}
                      name="maritalstatus"
                      onChange={e => this.setState({ maritalstatus: e.target.value })}
                    />
                  </div> 
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Widowed"
                      value="Widowed"
                      color="success"
                      defaultChecked={false}
                      name="maritalstatus"
                      onChange={e => this.setState({ maritalstatus: e.target.value })}
                    />
                  </div> 
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="Partnered/Significant other"
                      value="Partnered/Significant other"
                      color="success"
                      defaultChecked={false}
                      name="maritalstatus"
                      onChange={e => this.setState({ maritalstatus: e.target.value })}
                    />
                  </div> 
                  </div>
                </FormGroup>
              </Col>
              </Row>

              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">What is your current or past occupation ?</Label>
                  <Input
                    type="textarea"                    
                    name="ocupation"
                    id="nameVertical"
                    placeholder="Input Value"
                    value={this.state.ocupation}
                    onChange={e => this.setState({ ocupation: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              </Row>

              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Are you currently working ?</Label>
                  <div>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="Yes"
                    color="success"
                    defaultChecked={false}
                    name="notworking"
                    onChange={e => this.setState({ notworking: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="No"
                      color="danger"
                      defaultChecked={false}
                      name="notworking"
                      onChange={e => this.setState({ notworking: e.target.value })}
                    />
                  </div> 

                  <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Have you had legal problems ?</Label>
                  <Input
                    type="text"                    
                    name="legalproblems"
                    id="nameVertical"
                    placeholder="Input Value"
                    value={this.state.legalproblems}
                    onChange={e => this.setState({ legalproblems: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              </Row>

                  </div>
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

export default AddPersonalHistory
