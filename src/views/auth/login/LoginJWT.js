import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check } from "react-feather"
import { loginWithJWT } from "../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import axios from 'axios';


class LoginJWT extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    myexection:''
  }

  handleLogin = e => {
    e.preventDefault()

    
    let postData="email="+this.state.email+
                 "&password="+this.state.password+"";
                 
    // let _targetPostURL="https://javixlife.org:3010/?=";
    let _targetPostURL="https://javixlife.org:3010/api/auth/login?=";
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
                 let _token=res.data.data.data.token;
                 let ngoId=res.data.data.data.ngoId;
                 let _email=res.data.data.data.email;
                 let _firstName=res.data.data.data.firstName;
                 let _lastName=res.data.data.data.lastName;
                 let _rolid=res.data.data.data.roleId;
                 let _userid=res.data.data.data.userId;
                 let _javixid=res.data.data.data.javixid;
                 localStorage.clear(); 
                 localStorage.setItem("email",_email);
                 localStorage.setItem("firstName",_firstName);
                 localStorage.setItem("lastName",_lastName);
                 localStorage.setItem("ntoken",_token);
                 localStorage.setItem("roleId",_rolid);
                 if(res.data.data.data.roleId != 91) {
                  localStorage.setItem("ngoId",ngoId);
                 }
                 localStorage.setItem("userid",_userid);
                 if(_javixid===null){                
                      localStorage.setItem("javixid","0");
                      localStorage.setItem("usermasid","0");
                }
                 else{
                      localStorage.setItem("javixid",_javixid);
                      localStorage.setItem("usermasid",_javixid);
                    }

                      
                 document.location="/dashboard";
                 /*if(!(_rolid==91 || _rolid==92 || _rolid==93 || _rolid==21)){
                 axios(
                  {
                    method: 'post',
                    url: 'https://javixlife.org:3010/api/login/getjavixid?=',
                    data: 'roleId=' + _rolid + '&userid=' + _userid,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                    }
            
                ).then(resp=>{

                  //console.dir(resp.data.data.data[0].screenerId)
                  if(resp.data.status===1 || resp.data.status==="1"){ 
                    localStorage.setItem("usermasid",resp.data.data.data[0].actorId);                    
                    document.location="/views/dashboard";
                  }
                });
              }else{
                document.location="/views/dashboard";
              }*/

                  //this.setState({myexection:'Logined !, wait...'}); 
                //alert(localStorage.getItem("userid"))
                //sessionStorage.setItem("_email",res.data.data.data.email)
                //document.location="/views/dashboard";
                //alert(res.data.-._id)
                }
          //code
          })
          .catch(e=>{
           if(e.response.data.status===0 || e.response.data.status==="0")
                              { 
                              
                              this.setState({myexection:e.response.data.message});
                              if(e.response.data.message.indexOf("not confirmed")>=0){
                                //sessionStorage.setItem("_email",e.response.data.data.data.email)

                                /************  Resend OTP  ***********/
                                let ipostData="email="+this.state.email+"";
                                let _itargetPostURL="https://javixlife.org:3010/api/auth/resend-verify-otp?=";
                                axios(
                                  {
                                    method: 'post',
                                    url: _itargetPostURL,
                                    data: ipostData,
                                    headers: {'Content-Type': 'application/x-www-form-urlencoded' }
                                    }
                            
                                ).then(res=>{                               
                                document.location="/otp"                                  
                                });
                                 /************  End Resend OTP  ***********/
                                
                              }
                              }

          });
    //this.props.loginWithJWT(this.state)
    //alert("Hello")
    
    /*var URL="https://javixlife.org:3010/api/auth/login"
    
    axios.get(URL, {headers:{'Access-Control-Allow-Origin': '*'}}).then(res=>{
      alert(res.data);
      //code
  });*/
  /*fetch(URL)
  .then(response => response.json())
      /*axios.get(URL)
        .then(res => {
          alert(res.data);
          //const persons = res.data;
          //this.setState({ persons });
        })*/
    
    
    
  }
  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/" onSubmit={this.handleLogin}>
          <FormGroup className="form-label-group">
          <div style={{color:"red",fontSize:"11px"}} >{this.state.myexection}</div>
          </FormGroup> 
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Mail size={15} />
              </div>
              <Label>Email</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={false}
                onChange={this.handleRemember}
              />
              <div className="float-right">
                <Link to="/auth/forgotpassword">Forgot Password?</Link>
              </div>
            </FormGroup>
            <div className="d-flex justify-content-between">
            <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
              {/* <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  //history.push("/pages/register")
                  document.location="/auth/register"
                }}
              >
                Register
              </Button.Ripple> */}
             
            </div>
          </Form>
        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, { loginWithJWT })(LoginJWT)
