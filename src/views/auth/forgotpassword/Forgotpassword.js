import React from "react"
import { Form, FormGroup, Input, Label, Button, Row, Col,Card,CardHeader,
  CardTitle, } from "reactstrap"
//import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
//import { Check } from "react-feather"
//import { connect } from "react-redux"
//import classnames from "classnames"
import "../../../assets/scss/pages/authentication.scss"
import axios from 'axios';
//import { history } from "../../../../../../history"
//import { useAuth0 } from "../../authServices/auth0/auth0Service"
import loginImg from "../../../assets/img/pages/reset-password.png"
import JavixLogo from "../../../assets/img/logo/logo.png"
import LoadingSpinner from "../../register/LoadingSpinner";



class Forgotpassword extends React.Component {
    state = {
      email:'',
      myexection:''
    }
  
    handleRegister = e => {
      e.preventDefault()
      let postData="email="+this.state.email+""
      /*this.setState({ loading: true }, () => {
      axios.get('http://google.co.in/')
        .then(result => this.setState({
          loading: false,
          data: [...result.data],
        }));
        
    });*/              

                    let _targetPostURL="https://javixlife.org/api/auth/forgotpw?=";
                    this.setState({ loading: true }, () => {
                    axios(
                      {
                        method: 'post',
                        url: _targetPostURL,
                        data: postData,                       
                        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                        }
                
                    ).then(res=>{
                          
                          
                           if(res.data.status===1 || res.data.status==="1")
                              { 
                                localStorage.setItem("email",this.state.email);                                
                                this.setState({myexection:'Successfully Confirmed!'});  
                                 document.location="/views/resetpwd";
                              }
                          
                          })
                          .catch(e=>{
                           
                           /*if(e.response.data.status===0 || e.response.data.status==="0")
                              { 
                              
                              this.setState({myexection:e.response.data.message});
                              }*/
                
                          });  
                          
                    });



      /*this.props.signupWithJWT(
        this.state.txtOtp,
        this.state.password,
        this.state.name
      )*/
    }
  
    render() {
      //const { data, loading } = this.state;
      return (
        
        <Row className="m-0 justify-content-center">
          <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          
        <Card className="bg-authentication rounded-0 mb-0 w-100">
          <div style={{textAlign:"center"}}><p><img src={JavixLogo} style={{width:'25%'}} className="rounded mt-2" alt="loginImg" /></p>
                <p>Javix Life Healthcare</p></div>
        <Row className="m-0">
        <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
          <Card className="rounded-0 mb-0 p-2">
            <CardHeader className="pb-1 pt-50" >
              <CardTitle >
                 <h4 className="mb-0">Search Your Account</h4>
              </CardTitle>
              
              </CardHeader>
              
        <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          <div> <p className="px-2 auth-title mb-0">
                    	
              Please enter your email address or phone number to search for your account.
              </p> </div>
        <div style={{color:"red",fontSize:"11px"}} >{this.state.myexection}</div>
        </FormGroup>  
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            name="email" id="email"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Label>Email</Label>
        </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="hidden"
              placeholder="Input OTP"
              required
              value={this.state.txtOtp}
              onChange={e => this.setState({ txtOtp: e.target.value })}
            />
           
          </FormGroup>
  
          <div className="d-flex justify-content-between">
           
            <Button.Ripple color="primary" type="submit">
              Submit
            </Button.Ripple>
            <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  //history.push("/pages/register")
                  document.location="/auth/login"
                }}
              >
                Back to Login
              </Button.Ripple>
           
          </div>
        </Form>
        </Card>
              
              </Col>

         </Row> 
       
        </Card>
        </Col>
        </Row>
      )
    }
  }
  
  
  export default Forgotpassword
  //export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)