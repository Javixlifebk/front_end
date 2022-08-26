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
import { Star, Search } from "react-feather"
import Spinner from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../utility/context/Layout"
import $ from 'jquery';
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

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} placeholder="search" onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

class AddMedicine extends React.Component {

   toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  state = {
    strMedicine:'',
    strDosage:'', 
    strStrength:'',
    spnSUnit:'',   
    spnDUnit:'',
    strPreparation:'',
    strRoute:'',
    strDirection:'',    
    strFrequency:'',
    strDuration:'', 
    strDrUnit:'', 
    strQty:'',
    strTime:'',  
    strSuggestions:'',
    strTests:'',    
    strEvening:'',
    strMedicineType:'',    

    strMdescription:'',
    strTests:'',
    curTime : new Date().toLocaleString(),
    colsMedicine:[],
    colsStrength:[],
    colsSUnit:[],
    colsDosage:[],    
    colsDUnit:[],
    colsPreparation:[],
    colsRoute:[],
    colsDirection:[],    
    colsFrequency:[],
    colsDuration:[],
    colsDrUnit:[],
    colsQty:[],
    columns: [
      
      {
        name: "Medicines",
        selector: "User",
        sortable: true,
        cell: row => (
         <div >
        
         <p>fdg</p>     
          </div>
        )
      },
      {
        name: "Dosage",
        selector: "User",
        sortable: true,
        cell: row => (
         <div >
        
         <p>dfs</p>     
          </div>
        )
      },
     
    ],
    data: [{
      
      name: "Alyss Lillecrop",
    
    },
    {
     
      name: "Shep Pentlow"
     
    }]    
      
    
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
      // get Deleted Rows Index and Remove Rows from; this.state
      var delInds=window["getDeletedRowsIndex"];
      if(delInds!=null && delInds.length>=1)
      {
        for(var i=0;i<delInds.length;i++)
        {
          var di=delInds[i]; // remo
        }
      }
      console.log("Medicine Name " + this.state.colsMedicine);
      var finalMedecine=this.state.colsMedicine.join(",,,");
      var finalStrength=this.state.colsStrength.join(",,,");
      var finalSUnit=this.state.colsSUnit.join(",,,");
      var finalDosages=this.state.colsDosage.join(",,,");      
      var finalDUnit=this.state.colsDUnit.join(",,,"); 
      var finalPreparation=this.state.colsPreparation.join(",,,"); 
      var finalRoute=this.state.colsRoute.join(",,,"); 
      var finalDirection=this.state.colsDirection.join(",,,"); 
      var finalFrequency=this.state.colsFrequency.join(",,,"); 
      var finalDuration=this.state.colsDuration.join(",,,");       
      var finalDrUnit=this.state.colsDrUnit.join(",,,");   
      var finalQty=this.state.colsQty.join(",,,");       
     
      this.state.strPMeal+=",,,";
      let dateOfOnBoarding = mydate + '-' +  mydate + '-' + myCurrentDate.getFullYear();
      this.setState()
      let postData="citizenId="+localStorage.getItem("citizenId")+ "&screenerId=161315136114567577&recordId=0";
          postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
          postData+="&caseId="+ localStorage.getItem("caseId")+"&status=3&medicine="+finalMedecine;
          postData+="&strength="+finalStrength+"&quantity="+finalQty+"&duaration="+finalDuration+ "&direction=" + finalDirection;
          postData+="&frequency="+finalFrequency+"&preparation="+finalPreparation+"&dose="+finalDosages;
          postData+="&route="+finalRoute+"&tests="+this.state.strTests+"&comments="+this.state.strMdescription;
         
         //console.log(postData);


     
      let _targetPostURL="http://localhost:3001/api/doctor/addprescription?=";
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
          alert('Medicine Added Successfully')
          window["medicineInit"]();
          window.location='../../views/dashboard/patientview'
        }
      })
      .catch(e=>{
        console.log("Exception:"); 
        console.log(e);
      });
  }
  handleClick = e => {
    e.preventDefault()   
    alert('Hello');
  } 
  
  addRow = e => {
    e.preventDefault() 
    this.setState({
      colsMedicine: [...this.state.colsMedicine, this.state.strMedicine]
      
    })
    this.setState({
      colsStrength: [...this.state.colsStrength, this.state.strStrength]
      
    })
    this.setState({
      colsSUnit: [...this.state.colsSUnit, this.state.strSUnit]
      
    })
    this.setState({
      colsDosage: [...this.state.colsDosage, this.state.strDosage]
    })
    this.setState({
      colsDUnit: [...this.state.colsDUnit, this.state.strDUnit]
    })

    this.setState({
      colsPreparation: [...this.state.colsPreparation, this.state.strPreparation]
    })

    this.setState({
      colsRoute: [...this.state.colsRoute, this.state.strRoute]
    })
       
    this.setState({
      colsDirection: [...this.state.colsDirection, this.state.strDirection]
    })

    this.setState({
      colsFrequency: [...this.state.colsFrequency, this.state.strFrequency]
    })
 
    this.setState({
      colsDuration: [...this.state.colsDuration, this.state.strDuration]
    })
 
    this.setState({
      colsDrUnit: [...this.state.colsDrUnit, this.state.strDrUnit]
    })
   
    this.setState({
      colsQty: [...this.state.colsQty, this.state.strQty]
    })
  
    /*this.setState({
     
    })*/
    //this.colsMedicine.push(this.strMedicine);
    //this.colsDosage.push(this.strDosage);
    window["addMedicine"](this.state);
  } 
  render() {
    const mealType = [
      { value: "Meal Type", label: "Meal Type", color: "#00B8D9", isFixed: true },

      { value: "Pre Meal", label: "Pre Meal", color: "#00B8D9", isFixed: true },
      { value: "Post Meal", label: "Post Meal", color: "#00B8D9", isFixed: true }    
     
    ]

    const medicinetType = [
      { value: "Medicine Type", label: "Medicine Type", color: "#00B8D9", isFixed: true },
   
      { value: "Tablet", label: "Tablet", color: "#00B8D9", isFixed: true },
      { value: "Capsule", label: "Capsule", color: "#00B8D9", isFixed: true },
      { value: "Teaspoon", label: "Teaspoon", color: "#00B8D9", isFixed: true },
      { value: "Spray", label: "Spray", color: "#00B8D9", isFixed: true },
      { value: "Ointment", label: "Ointment", color: "#00B8D9", isFixed: true }           
     
    ]

    const strSUnit=[
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },

      { value: "mg", label: "mg", color: "#00B8D9", isFixed: true },
      { value: "gm", label: "gm", color: "#00B8D9", isFixed: true },
      { value: "ng", label: "ng", color: "#00B8D9", isFixed: true },
      { value: "mcq", label: "mcq", color: "#00B8D9", isFixed: true },
      { value: "%", label: "%", color: "#00B8D9", isFixed: true },
      { value: "IU", label: "IU", color: "#00B8D9", isFixed: true },
      { value: "IU/ml", label: "IU/ml", color: "#00B8D9", isFixed: true }
    ]

    const strDUnit=[
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },

      { value: "ml", label: "ml", color: "#00B8D9", isFixed: true },
      { value: "unit", label: "unit", color: "#00B8D9", isFixed: true },
      { value: "table spoon", label: "table spoon", color: "#00B8D9", isFixed: true },
      { value: "tea spoon", label: "tea spoon", color: "#00B8D9", isFixed: true }  
    ]

    const strDrUnit=[
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },

      { value: "hours", label: "hours", color: "#00B8D9", isFixed: true },
      { value: "days", label: "days", color: "#00B8D9", isFixed: true },
      { value: "tweeks", label: "weeks", color: "#00B8D9", isFixed: true },
      { value: "years", label: "years", color: "#00B8D9", isFixed: true }  
    ]

    const strPreparation=[
      { value: "Preparation", label: "Preparation", color: "#00B8D9", isFixed: true },
   
      { value: "Tablet", label: "Tablet", color: "#00B8D9", isFixed: true },
      { value: "Capsule", label: "Capsule", color: "#00B8D9", isFixed: true },
      { value: "Softgel", label: "Softgel", color: "#00B8D9", isFixed: true },
      { value: "Injection", label: "Injection", color: "#00B8D9", isFixed: true },
      { value: "Drops", label: "Drops", color: "#00B8D9", isFixed: true }, 
      { value: "Ointment", label: "Ointment", color: "#00B8D9", isFixed: true },
      { value: "Suppository", label: "Suppository", color: "#00B8D9", isFixed: true }        
    ]

    const stRoute=[
      { value: "Route", label: "Route", color: "#00B8D9", isFixed: true },

      { value: "Topical", label: "Topical", color: "#00B8D9", isFixed: true },
      { value: "Oral", label: "Oral", color: "#00B8D9", isFixed: true },
      { value: "Rectal", label: "Rectal", color: "#00B8D9", isFixed: true },
      { value: "Vaginal", label: "Vaginal", color: "#00B8D9", isFixed: true },
      { value: "Urethral", label: "Urethral", color: "#00B8D9", isFixed: true }, 
      { value: "Inhalation", label: "Inhalation", color: "#00B8D9", isFixed: true },
      { value: "Local", label: "Local", color: "#00B8D9", isFixed: true },
      { value: "Chew", label: "Chew", color: "#00B8D9", isFixed: true },
      { value: "Suck", label: "Suck", color: "#00B8D9", isFixed: true },
      { value: "Intrademal", label: "Intrademal", color: "#00B8D9", isFixed: true },
      { value: "Subcutaneous", label: "Subcutaneous", color: "#00B8D9", isFixed: true },
      { value: "Intramuscular", label: "Intramuscular", color: "#00B8D9", isFixed: true },   
      { value: "Intravenous", label: "Intravenous", color: "#00B8D9", isFixed: true },   
      { value: "Nasal", label: "Nasal", color: "#00B8D9", isFixed: true },
      { value: "Ear Drops", label: "Ear Drops", color: "#00B8D9", isFixed: true },   
      { value: "Eye Drops", label: "Eye Drops", color: "#00B8D9", isFixed: true }              
    ]

    const strDirection=[
      { value: "Direction", label: "Direction", color: "#00B8D9", isFixed: true },
  
      { value: "Before meals", label: "Before meals", color: "#00B8D9", isFixed: true },
      { value: "After meals", label: "After meals", color: "#00B8D9", isFixed: true }      
    ]

    const strFrequency=[
      { value: "Frequency", label: "Frequency", color: "#00B8D9", isFixed: true },
  
      { value: "If required", label: "If required", color: "#00B8D9", isFixed: true },
      { value: "Immediately", label: "Immediately", color: "#00B8D9", isFixed: true },
      { value: "Once a day", label: "Once a day", color: "#00B8D9", isFixed: true },
      { value: "Twice daily", label: "Twice daily", color: "#00B8D9", isFixed: true },
      { value: "Thrice daily", label: "Thrice daily", color: "#00B8D9", isFixed: true }, 
      { value: "Four times a day", label: "Four times a day", color: "#00B8D9", isFixed: true },
      { value: "Every hour", label: "Every hour", color: "#00B8D9", isFixed: true },
      { value: "Every night at bedtime", label: "Every night at bedtime", color: "#00B8D9", isFixed: true },
      { value: "Everyday", label: "Everyday", color: "#00B8D9", isFixed: true },
      { value: "Every other day", label: "Every other day", color: "#00B8D9", isFixed: true },
      { value: "Ever four hours", label: "Ever four hours", color: "#00B8D9", isFixed: true },
      { value: "Once a week", label: "Once a week", color: "#00B8D9", isFixed: true },   
      { value: "Three times a week", label: "Three times a week", color: "#00B8D9", isFixed: true }  
             
    ]

    let { data, columns } = this.state
      return (
      
        <React.Fragment >
         <hr></hr>
         <div>
      
           </div>
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
              Add Medicine
            </ModalHeader>
            <ModalBody >
           <Form action="/" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="12">
                <FormGroup>
                  
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Medicine Name"
                    value={this.state.strMedicine}
                    onChange={e => this.setState({ strMedicine: e.target.value })}
                    
                   
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="6">
                <FormGroup>
                  
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Strength"
                    value={this.state.strStrength}
                    onChange={e => this.setState({ strStrength: e.target.value })}
                                       
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                <Select                 
                  name="colors"                  
                  options={strSUnit}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Unit"             
                  onChange={e => this.setState({spnSUnit: e.value })}
                  
              />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="6">
                <FormGroup>
                 
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Dosage"
                    value={this.state.strDosage}
                    onChange={e => this.setState({ strDosage: e.target.value })}
                    
                   
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                <Select                 
                  name="colors"
                  options={strDUnit}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Unit"               
                  onChange={e => this.setState({spnDUnit: e.value })}
                  
              />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="6">
              <FormGroup>
                <Select                 
                  name="colors"
                  options={strPreparation}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Preparation"               
                  onChange={e => this.setState({strPreparation: e.value })}
                  
              />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                <Select                 
                  name="colors"
                  options={stRoute}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Route"               
                  onChange={e => this.setState({strRoute: e.value })}
                  
              />
                </FormGroup>
              </Col>
              </Row> 
              <Row>
              <Col sm="4">
              <FormGroup>
                <Select                 
                  name="colors"
                  options={strDirection}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Direction"               
                  onChange={e => this.setState({strDirection: e.value })}
                  
              />
                </FormGroup>
              </Col>
              
              <Col sm="4">
                <FormGroup>
                <Select                 
                  name="colors"
                  options={strFrequency}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Frequency"               
                  onChange={e => this.setState({strFrequency: e.value })}
                  
              />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="6">
                <FormGroup>
                 
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Duration"
                    value={this.state.strDuration}
                    onChange={e => this.setState({ strDuration: e.target.value })}
                    
                   
                  />
                </FormGroup>
              </Col>
              <Col sm="3">
                <FormGroup>
                <Select                 
                  name="colors"
                  options={strDrUnit}
                  className="React"
                  classNamePrefix="Unit"
                  placeholder="Unit"               
                  onChange={e => this.setState({strDrUnit: e.value })}
                  
              />
                </FormGroup>
              </Col>
              <Col sm="3">
                <FormGroup>
                <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="Qty."
                    value={this.state.strQty}
                    onChange={e => this.setState({ strQty: e.target.value })}
                    
                   
                  />
                </FormGroup>
              </Col>
              </Row> 
              <Row>
                <Col sm="12">
                <div style={{textAlign:'right'}}> 
                    <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">Medcine Name</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody id="tbody">
                
                      </tbody>
                    </table>
                  </div>
                  <button className="btn btn-md btn-primary" 
                    id="addBtn" type="button" onClick={this.addRow} >
                      Add new Row
                  </button>
                </div>
                </Col>
              </Row>              
              
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Other Instructions</Label>
                  <Input
                    type="textarea"                    
                    name="mdescription"
                    id="nameVertical"
                    placeholder="Other Instructions"
                    value={this.state.strMdescription}
                    onChange={e => this.setState({ strMdescription: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Add Tests</Label>
                  <Input
                    type="textarea"
                    
                    name="allergies"
                    id="nameVertical"
                    placeholder="Add Tests"
                    value={this.state.strTests}
                    onChange={e => this.setState({ strTests: e.target.value })}
                    
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

export default AddMedicine
