import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../redux/actions/auth/registerActions"

import axios from 'axios';
class RegisterJWT extends React.Component {
  
  state = {
    txtfname:'',
    txtlname:'',
    txtmob:'',
    email:'',
    password:'',
    confirmPass:'',
    confirmAccept:true,
    myexection:''
  }

  handleRegister = e => {
    e.preventDefault();
    
    let postData="firstName="+this.state.txtfname+
                  "&lastName="+this.state.txtlname+
                  "&password="+this.state.password+
                  "&email="+this.state.email+
                  "&phoneNo="+this.state.txtmob+""+
                  "&roleId=1"+
                  "&userName="+this.state.userName+"";
                  
    let _targetPostURL="http://18.60.238.252:3010/api/auth/register?=";
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
           
           this.setState({myexection:'Successfully Registered !<br/>Verify your account'});
           localStorage.setItem("email",this.state.email)
           document.location="/otp";
           }
          })
          .catch((e)=>{
           console.dir(e)
           if(e.response.data.status===0 || e.response.data.status==="0")
           { 
           
           this.setState({myexection:e.response.data.message});
           }
           

          });
  }

  render() {
    return (
      <Form action="#" onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
        <div style={{color:"#0950cd",fontWeight:"bold"}}>Dcotor Registration Form</div>
        </FormGroup>
        <FormGroup className="form-label-group">
        <div style={{color:"red",fontSize:"11px"}} >{this.state.myexection}</div>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="First Name"
            required
            name="txtfname" id="txtfname"
            value={this.state.txtfname}
            onChange={e => this.setState({ txtfname: e.target.value })}
          />
          <Label>First Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Last Name"
            name="txtlname" id="txtlname"
            required
            value={this.state.txtlname}
            onChange={e => this.setState({ txtlname: e.target.value })}
          />
          <Label>Last Name</Label>
        </FormGroup>

        <FormGroup className="form-label-group">
          <Input
            type="tel"
            placeholder="Mobile No"
            name="txtmob" id="txtmob"
            required
            value={this.state.txtmob}
            onChange={e => this.setState({ txtmob: e.target.value })}
          />
          <Label>Mobile No</Label>
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
            type="userName"
            placeholder="User Name"
            name="userName" id="userName"
            required
            value={this.state.userName}
            onChange={e => this.setState({ userName: e.target.value })}
          />
          <Label>User Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            name="password" id="password"
            required
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPass" id="confirmPass"
            required
            value={this.state.confirmPass}
            onChange={e => this.setState({ confirmPass: e.target.value })}
          />
          <Label>Confirm Password</Label>
        </FormGroup>
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            defaultChecked={true}
            name="confirmAccept" id="confirmAccept"
            onChange={e => this.setState({ confirmAccept: e.target.checked })}
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
      
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              //history.push("/views/auth")
              document.location="/auth/login"
            }}
          >
            Login
          </Button.Ripple>
        </div>
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(RegisterJWT)
