import React,{ Suspense, lazy } from "react"
import Select from "react-select"
import {
  Card,
  CardHeader,
  h6,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Table,
  Modal,
  ModalHeader,
  ModalBody 
  
 
} from "reactstrap"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
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

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  state = {
    diabetes:'',
    high_bp:'',
    high_cholestrol:'',
    goiter:'',
    cancer:'',
    leukemia:'',
    psoriasis:'',
    agina:'',
    type_of_cancer:'',
    heart_problems:'',
    heart_murmur:'',
    pneumonia:'',
    pulmonary_embolism:'',
    asthma:'',
    emphysema:'',
    stroke:'',
    epilepsy:'',
    cataracts:'',
    kidney_disease:'',
    kidney_stones:'',
    chrohns_disease:'',
    colitis:'',
    anemia:'',
    jaundice:'',
    hepatitis:'',
    stomach:'',
    rheumatic_fever:'',
    tuberculosis:'',
    hiv_aids:'',
    other:'',
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
      this.setState()
      let postData="citizenId="+localStorage.getItem("citizenId");
      //postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
      if(localStorage.getItem("roleId")==="1")
      postData+="&token=dfjkhsdfaksjfh3756237&doctorId="+localStorage.getItem("usermasid");
      else
      postData+="&token=dfjkhsdfaksjfh3756237&screenerId="+localStorage.getItem("usermasid");
      postData+="&diabetes="+this.state.diabetes+"&high_bp="+this.state.high_bp;
      postData+="&high_cholestrol="+this.state.high_cholestrol+"&goiter="+this.state.goiter;
      postData+="&cancer="+this.state.cancer+"&leukemia="+this.state.leukemia;
      postData+="&psoriasis="+this.state.psoriasis+"&agina="+this.state.agina;
      postData+="&heart_problems="+this.state.heart_problems+"&type_of_cancer="+this.state.type_of_cancer;
      postData+="&heart_murmur="+this.state.heart_murmur+"&pneumonia="+this.state.pneumonia;

      postData+="&pulmonary_embolism="+this.state.pulmonary_embolism+"&asthma="+this.state.asthma;
      postData+="&emphysema="+this.state.emphysema+"&stroke="+this.state.stroke;
      postData+="&epilepsy="+this.state.epilepsy+"&cataracts="+this.state.cataracts;
      postData+="&kidney_disease="+this.state.kidney_disease+"&kidney_stones="+this.state.kidney_stones;
      postData+="&chrohns_disease="+this.state.chrohns_disease+"&colitis="+this.state.colitis;

      postData+="&anemia="+this.state.anemia+"&jaundice="+this.state.jaundice;
      postData+="&hepatitis="+this.state.hepatitis+"&stomach="+this.state.stomach;
      postData+="&rheumatic_fever="+this.state.rheumatic_fever+"&tuberculosis="+this.state.tuberculosis;
      postData+="&hiv_aids="+this.state.hiv_aids+"&other="+this.state.other;
          
      let _targetPostURL="http://143.244.136.145:3010/api/citizen/addHistory?=";
      axios(
        {
          method: 'post',
          url: _targetPostURL,
          data: postData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          }
  
      ).then(res=>{

        if(res.data.status===1){
          alert('Past History Updated Successfully')
          window.location='/dashboard/patientview'
        }
      })
      .catch(e=>{
      });

  }
    
  render() {
  

          
    return (
     
        <React.Fragment >
            <hr></hr>
   
      <Card>
      <div><h3>  <Button.Ripple
            color="success"
            outline
            onClick={this.toggleModal}
          >
            Add New
          </Button.Ripple></h3></div>
        <CardBody> 
      
        <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
           
            className="modal-dialog-centered"
          >
             <ModalHeader toggle={this.toggleModal}>
              Add Patient Past History
            </ModalHeader>
            <ModalBody >
        <Form action="/" onSubmit={this.handleSubmit}>         
        <Table responsive borderless>
          <tbody>
            <tr>
              <td>
                <div><h6>Diabetes</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="diabetes"
                    onChange={e => this.setState({ diabetes: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="diabetes"
                      onChange={e => this.setState({ diabetes: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>High Blood Pressure</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="high_bp"
                    onChange={e => this.setState({ high_bp: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="high_bp"
                      onChange={e => this.setState({ high_bp: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>High Cholesterol</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="high_cholestrol"
                    onChange={e => this.setState({ high_cholestrol: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="high_cholestrol"
                      onChange={e => this.setState({ high_cholestrol: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Goiter</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="goiter"
                    onChange={e => this.setState({ goiter: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="goiter"
                      onChange={e => this.setState({ goiter: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
            </tr>  


               <tr>
              <td>
                <div><h6>Cancer</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="cancer"
                    onChange={e => this.setState({ cancer: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="cancer"
                      onChange={e => this.setState({ cancer: e.target.value })}
                    />
                  </div> 
                  <div><Input type="text" 
                  placeholder="Type of Cancer" 
                  name="type_of_cancer"
                  value={this.state.type_of_cancer}
                  onChange={e => this.setState({ type_of_cancer: e.target.value })}
                  /></div>
              </div>
              </td>
              <td>
                <div><h6>Leukemia</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="leukemia"
                    onChange={e => this.setState({ leukemia: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="leukemia"
                      onChange={e => this.setState({ leukemia: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Psoriasis</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="psoriasis"
                    onChange={e => this.setState({ psoriasis: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="psoriasis"
                      onChange={e => this.setState({ psoriasis: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Angina</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="Angina"
                    onChange={e => this.setState({ agina: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="agina"
                      onChange={e => this.setState({ agina: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr>



            <tr>
              <td>
                <div><h6>Heart Problem</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="heart_problems"
                    onChange={e => this.setState({ heart_problems: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="heart_problems"
                      onChange={e => this.setState({ heart_problems: e.target.value })}
                    />
                  </div> 
                  
              </div>
              </td>
              <td>
                <div><h6>Heart Murmur</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="heart_murmur"
                    onChange={e => this.setState({ heart_murmur: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="heart_murmur"
                      onChange={e => this.setState({ heart_murmur: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Pneumonia</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="pneumonia"
                    onChange={e => this.setState({ pneumonia: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="pneumonia"
                      onChange={e => this.setState({ pneumonia: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Pulmonary Embolism</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="pulmonary_embolism"
                    onChange={e => this.setState({ pulmonary_embolism: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="pulmonary_embolism"
                      onChange={e => this.setState({ pulmonary_embolism: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr>


            <tr>
              <td>
                <div><h6>Asthma</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="asthma"
                    onChange={e => this.setState({ asthma: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="asthma"
                      onChange={e => this.setState({ asthma: e.target.value })}
                    />
                  </div> 
                  
              </div>
              </td>
              <td>
                <div><h6>Emphysema</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="emphysema"
                    onChange={e => this.setState({ emphysema: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="emphysema"
                      onChange={e => this.setState({ emphysema: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Stroke</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="stroke"
                    onChange={e => this.setState({ stroke: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="stroke"
                      onChange={e => this.setState({ stroke: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Epilepsy</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="epilepsy"
                    onChange={e => this.setState({ epilepsy: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="epilepsy"
                      onChange={e => this.setState({ epilepsy: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr> 


             <tr>
              <td>
                <div><h6>Cataract</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="cataracts"
                    onChange={e => this.setState({ cataracts: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="cataracts"
                      onChange={e => this.setState({ cataracts: e.target.value })}
                    />
                  </div> 
                  
              </div>
              </td>
              <td>
                <div><h6>Kidney Disease</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="kidney_disease"
                    onChange={e => this.setState({ kidney_disease: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="kidney_disease"
                      onChange={e => this.setState({ kidney_disease: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Kidney Stone</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="kidney_stones"
                    onChange={e => this.setState({ kidney_stones: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="kidney_stones"
                      onChange={e => this.setState({ kidney_stones: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Crohn’s Disease</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="chrohns_disease"
                    onChange={e => this.setState({ chrohns_disease: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="chrohns_disease"
                      onChange={e => this.setState({ chrohns_disease: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr> 

            
             <tr>
              <td>
                <div><h6>Colitis</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="colitis"
                    onChange={e => this.setState({ colitis: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="colitis"
                      onChange={e => this.setState({ colitis: e.target.value })}
                    />
                  </div> 
                  
              </div>
              </td>
              <td>
                <div><h6>Anemia</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="anemia"
                    onChange={e => this.setState({ anemia: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="anemia"
                      onChange={e => this.setState({ anemia: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Jaundice</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="jaundice"
                    onChange={e => this.setState({ jaundice: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="jaundice"
                      onChange={e => this.setState({ jaundice: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>Hepatitis</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="hepatitis"
                    onChange={e => this.setState({ hepatitis: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="hepatitis"
                      onChange={e => this.setState({ hepatitis: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr> 

            
             <tr>
              <td>
                <div><h6>Stomach</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="stomach"
                    onChange={e => this.setState({ stomach: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="stomach"
                      onChange={e => this.setState({ stomach: e.target.value })}
                    />
                  </div> 
                  
              </div>
              </td>
              <td>
                <div><h6>Rheumatic Fever</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="rheumatic_fever"
                    onChange={e => this.setState({ rheumatic_fever: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="rheumatic_fever"
                      onChange={e => this.setState({ rheumatic_fever: e.target.value })}
                    />
                  </div> 
              </div>
              </td>

              <td>
                <div><h6>Tuberculosis</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="tuberculosis"
                    onChange={e => this.setState({ tuberculosis: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="tuberculosis"
                      onChange={e => this.setState({ tuberculosis: e.target.value })}
                    />
                  </div> 
              </div>
              </td>
              <td>
                <div><h6>HIV/AIDS</h6>
                  <div className="d-inline-block mr-1">
                  <Radio
                    label="Yes"
                    value="1"
                    color="success"
                    defaultChecked={false}
                    name="hiv_aids"
                    onChange={e => this.setState({ hiv_aids: e.target.value })}
                  />
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio
                      label="No"
                      value="0"
                      color="danger"
                      defaultChecked={false}
                      name="hiv_aids"
                      onChange={e => this.setState({ hiv_aids: e.target.value })}
                    />
                  </div>
                   
              </div>
              </td>
            </tr> 
            <tr>
              <td colSpan="4">
              <div><h6>OTHER</h6>
              <div>
              <Input
                    type="textarea"
                    color="success"                  
                    name="other"
                    value={this.state.other}
                    onChange={e => this.setState({ other: e.target.value })}
                  />
              </div>
              </div>


              </td>
            </tr> 
            <tr>
              <td colSpan="4">

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
              </td>
            </tr>                                  
         
          </tbody>      
          </Table>
          </Form> 
          
          </ModalBody>
          </Modal>
        </CardBody>
      </Card>
      </React.Fragment>
    )
  }
}
export default EditProfile
