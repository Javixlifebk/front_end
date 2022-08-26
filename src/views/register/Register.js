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
  TabPane
} from "reactstrap"
import classnames from "classnames"
import RegisterFirebase from "./RegisterFirebase"
import RegisterAuth0 from "./RegisterAuth0"
import RegisterJWT from "./RegisterJWT"
import RegisterPharmacy from "./RegisterPharmacy"
import Sevika from "./Sevika"
import registerImg from "../../assets/img/pages/register.png"
import ScreenrImg from "../../assets/img/pages/screener.png"
import "../../assets/scss/pages/authentication.scss"

class Register extends React.Component {
  
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
    var _img=registerImg
    return (
      <Row className="m-0 justify-content-center ">
        <Col
          sm="12"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0" style={{background:"white"}}>
              <Col
                lg="5"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img className="mr-1" src={_img} alt="registerImg" />
              </Col>
              <Col lg="7" md="12" className="p-0">
                <Card className="rounded-0 mb-0 p-2">
                  <CardHeader className="pb-1 pt-50">
                    <CardTitle>
                      <h4 className="mb-0">Create Account</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title mb-0">
                    Fill the below form to create a new account.
                  </p>
                  <Nav tabs className="px-2">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1"
                        })}
                        onClick={() => {
                          this.toggle("1")
                        }}
                      >
                        Doctors
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
                        NGO
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3"
                        })}
                        onClick={() => {
                          this.toggle("3")
                          _img=ScreenrImg
                        }}
                      >
                        Screener
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
                        Pharmacy
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
                        Sevika
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <CardBody className="pt-1 pb-50">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <RegisterJWT />
                      </TabPane>
                      <TabPane tabId="2">
                        <RegisterFirebase />
                      </TabPane>
                      <TabPane tabId="3">
                        <RegisterAuth0 />
                      </TabPane>
                      <TabPane tabId="4">
                        <RegisterPharmacy />
                      </TabPane>
                      <TabPane tabId="5">
                        <Sevika />
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Register
