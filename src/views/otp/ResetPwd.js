import React from "react"
import { Form, FormGroup, Input, Label, Button, Row, Col,Card,CardHeader,
  CardTitle, } from "reactstrap"
//import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
//import { Check } from "react-feather"
//import { connect } from "react-redux"
//import classnames from "classnames"
import "../../assets/scss/pages/authentication.scss"
import axios from 'axios';
//import { history } from "../../../../../../history"
//import { useAuth0 } from "../../authServices/auth0/auth0Service"
import loginImg from "../../assets/img/pages/register.jpg"
import JavixLogo from "../../assets/img/logo/logo_javix.png"


class ResetPwd extends React.Component {
    state = {
      email:'',
      txtKeys: '',
      txtNpwd: '',
      txtCpwd: '',
      myexection:''
    }
  
    handleRegister = e => {
      e.preventDefault()      
      if(this.state.txtNpwd===this.state.txtCpwd){

     this.setState({email:localStorage.getItem("email")}) 

      let postData="email="+localStorage.getItem("email")+
                    "&existpassword="+this.state.txtKeys+"&newpassword="+this.state.txtNpwd;

                    let _targetPostURL="http://javixlife.org:3010/api/auth/updatepw?=";
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
                                this.setState({myexection:'Successfully Confirmed!'});  
                              document.location="/auth/login";
                              }
                          
                          })
                          .catch(e=>{
                      
                           if(e.response.data.status===0 || e.response.data.status==="0")
                              {
                              
                              this.setState({myexection:e.response.data.message});
                              }
                
                          });              

                        }
                        else{
                          this.state.myexection="New Password and Confirm Password Mismatch !";
                        }

      /*this.props.signupWithJWT(
        this.state.txtOtp,
        this.state.password,
        this.state.name
      )*/
    }
  
    render() {
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
        <div style={{textAlign:"center"}}><p><img src={JavixLogo} width="100" alt="loginImg" /></p>
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
                 <h4 className="mb-0">Reset Password</h4>
<br></br>
                 <h6 className="mb-0" style={{color:'green'}}>A validation key is sent to your email !</h6>
              </CardTitle>
              
              </CardHeader>
              
        <Form action="/" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
          
        <div style={{color:"red",fontSize:"11px"}} >{this.state.myexection}</div>
        </FormGroup>  
        <FormGroup className="form-label-group">
          <Input
            type="hidden"
            placeholder="Email"
            name="email" id="email"
            required
            value={localStorage.getItem("_email")}
            onChange={e => this.setState({ email: e.target.value })}
          />
        
        </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="text"
              placeholder="Input Validation Key"
              required
              value={this.state.txtKeys}
              onChange={e => this.setState({ txtKeys: e.target.value })}
            />
            <Label>Input Validation Key</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="Input New Password"
              required
              value={this.state.txtNpwd}
              onChange={e => this.setState({ txtNpwd: e.target.value })}
            />
            <Label>Input New Password</Label>
          </FormGroup>
          <FormGroup className="form-label-group">
            <Input
              type="password"
              placeholder="Input Confirm Password"
              required
              value={this.state.txtCpwd}
              onChange={e => this.setState({ txtCpwd: e.target.value })}
            />
            <Label>Input Confirm Password</Label>
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
                  //document.location="/views/register"
                  //alert("Hello")

                  let postData="email="+localStorage.getItem("email")+""              

                
                  let _targetPostURL="http://javixlife.org:3010/api/auth/resend-verify-otp?=";
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
                              this.setState({myexection:'OTP Resend Successfully !'});  
                            //document.location="/views/auth/login";
                            }
                        
                        })
                        .catch(e=>{
                      
                         if(e.response.data.status===0 || e.response.data.status==="0")
                            { 
                            
                            this.setState({myexection:e.response.data.message});
                            }
              
                        });   
                }}
              >
                Resend OTP
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
  
  
  export default ResetPwd
  //export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)