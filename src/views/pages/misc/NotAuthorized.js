import React from "react"
import { Card, CardBody, Button, Row, Col } from "reactstrap"
import notAuthImg from "../../../assets/img/pages/not-authorized.png"
import JavixLogo from "../../../assets/img/logo/logo_javix.png"

class NotAuthorized extends React.Component {
  render() {
    return (
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={notAuthImg}
                alt="notAuthImg"
                
                className="img-fluid align-self-center mt-75"
              />
              <img
                src={JavixLogo}
                alt="notAuthImg"
                className="img-fluid align-self-center mt-75"
              />
              <h1 className="font-large-2 my-2">Test Welcome to Javix Life Healthcare!</h1>
              <p className="pt-2 mb-0">
              Intelligent Diagnostic With Instant Reporting. Get your health checkup done now with our unique &amp; world class technology!
              </p>
              
              <Button.Ripple
                tag="a"
                href="./auth/login"
                color="primary"
                size="lg"
                className="mt-2"
              >
               Click to Login
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default NotAuthorized
