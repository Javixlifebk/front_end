import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tab
} from "reactstrap"
import classnames from "classnames"
/*import RegisterFirebase from "./RegisterFirebase"
import RegisterAuth0 from "./RegisterAuth0"
import RegisterJWT from "./RegisterJWT"
import RegisterPharmacy from "./RegisterPharmacy"
import Sevika from "./Sevika"*/
import AddAllergey from "./AddAllergey"
import AddHistory from "./AddHistory"
import PatientProfile from "./PatientProfile"
import AddDocuments from "./AddDocuments"
import AddWomanHistory from "./AddWomanHistory"
import AddPersonalHistory from "./AddPersonalHistory"
import AllergyList from "./AllergyList"
import PersonalHistoryList from "./PersonalHistoryList"
import PastHistoryList from "./PastHistoryList"
import WomanHistoryList from "./WomanHistoryList"
import DocumentList from "./DocumentList"
import Encounter from "./Encounters"
import MedicineList from "./MedicineList"
import Modal from "../../../components/reactstrap/modal/Modal"
import personImage from "../../../assets/img/person.jpg"


import "../../../assets/scss/pages/authentication.scss"

class PatientTab extends React.Component {  
  state = {
    activeTab: "1"    
  }
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  render() {
    var _img
    return (
       <div>     
        <Card className="bg-authentication rounded-0 mb-0 w-100">
        <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4 className="mb-0">Patient Info</h4>
                    </CardTitle>
         </CardHeader>
        <Row  className="m-0" style={{background:"white"}}> 
           <Col
          sm="12"
          xl="12"
          lg="12"
          md="12"
          className="d-flex justify-content-center">   
               <Nav tabs className="px-2">
                    <NavItem >
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2"
                        })}
                        onClick={() => {
                          this.toggle("2")
                        }}
                      >
                        Encounters
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3"
                        })}
                        onClick={() => {
                          this.toggle("3")
                        }}
                      >
                        Personal History
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "4"
                        })}
                        onClick={() => {
                          this.toggle("4")
                          
                        }}
                      >
                        Allergies
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "5"
                        })}
                        onClick={() => {
                          this.toggle("5")
                        }}
                      >
                        Medical History
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "6"
                        })}
                        onClick={() => {
                          this.toggle("6")
                        }}
                      >
                        Reproductive History
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "7"
                        })}
                        onClick={() => {
                          this.toggle("7")
                        }}
                      >
                        Rx
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "8"
                        })}
                        onClick={() => {
                          this.toggle("8")
                        }}
                      >
                        Documents
                      </NavLink>
                    </NavItem>
                  </Nav>
                  
                </Col>
                </Row>
                
               <div style={{background:'white',padding:'10px'}}>                  
               
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1" >
                      <PatientProfile/>
                      </TabPane>
                      <TabPane tabId="2">
                      <Encounter/>
                      </TabPane>
                      <TabPane tabId="3">
                      <PersonalHistoryList/>
                      </TabPane>
                      <TabPane tabId="4">
                      <AllergyList/>                     
                      </TabPane>
                      <TabPane tabId="5">
                      <PastHistoryList/>
                      </TabPane>
                      <TabPane tabId="6">
                      <WomanHistoryList/>
                      </TabPane>
                      <TabPane tabId="7">
                      <MedicineList/>
                      </TabPane>
                      <TabPane tabId="8">
                      <DocumentList/>
                      </TabPane>
                    </TabContent>
                    </div> 
                    </Card>       
       </div>
    )
  }
}
export default PatientTab
