import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  TabContent,
  TabPane
} from "reactstrap"

import loginImg from "../../../assets/img/pages/login.png"
import JavixLogo from "../../../assets/img/logo/logo.png"
import "../../../assets/scss/pages/authentication.scss"
import LoginJWT from "./LoginJWT"
import Footer from "../../../layouts/components/footer/Footer"

class Login extends React.Component {
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
    return (
      <React.Fragment>
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
      
          </Row>
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={JavixLogo} style={{width:"45%"}} className="rounded" alt="loginImg" />
                <p>Javix Life Healthcare</p>
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Login</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Welcome back, please login to your javix account.
                  </p>
                  
                  <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                      <LoginJWT />
                    </TabPane>
                  
                  
                  </TabContent>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Footer/>
      </Row>     
      
      </React.Fragment>
      
    )
  }
}
export default Login
