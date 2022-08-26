import React from "react"
import { Card, CardBody, Button, Row, Col, Input,Form } from "reactstrap"
import underMaintenance from "../../assets/img/pages/maintenance-2.png"

class Maintenance extends React.Component {
  handleLogin = e => {
    e.preventDefault()

    //alert("Hello")
    document.location="/"

  }
  render() {
    return (
      <Row className="m-0">
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <img
                src={underMaintenance}
                alt="underMaintenance"
                className="img-fluid align-self-center mt-75"
              />
               <div><h1> Welcome Mr {localStorage.getItem("email")}</h1></div>
              <h1 className="font-large-2 my-1">Syncing Soon!</h1>
              <p className="px-2 mb-0" style={{fontSize:"22px"}}>
                We are working on dashboard
              </p>
            
             <Form action="/" onSubmit={this.handleLogin}>
             <div>
              <Button.Ripple
                type="submit"
               
                color="primary"
                size="lg"
                className="mt-1"
                
              >
               Logout
              </Button.Ripple>
              </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Maintenance
