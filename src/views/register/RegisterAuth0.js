import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
//import { history } from "../../history"
import { useAuth0 } from "../../authServices/auth0/auth0Service"
import axios from 'axios';

class RegisterAuth0 extends React.Component {
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
    e.preventDefault()
    let postData="firstName="+this.state.txtfname+
    "&lastName="+this.state.txtlname+
    "&password="+this.state.password+
    "&email="+this.state.email+
    "&phoneNo="+this.state.txtmob+""+
    "&roleId=2"+
    "&userName="+this.state.userName+"";
    
console.log(postData);
let _targetPostURL="http://159.65.148.197:3001/api/auth/register?=";
axios(
{
method: 'post',
url: _targetPostURL,
data: postData,
headers: {'Content-Type': 'application/x-www-form-urlencoded' }
}

).then(res=>{
console.log("In Good way:");
console.log(res.data);
if(res.data.status===1 || res.data.status==="1")
{ 

this.setState({myexection:'Successfully Registered !<br/>Verify your account'});
localStorage.setItem("email",this.state.email)
document.location="/views/otp";
}
})
.catch((e)=>{
console.log("Exception:");
if(e.response.data.status===0 || e.response.data.status==="0")
{ 

this.setState({myexection:e.response.data.message});
}


});

    /*this.props.signupWithFirebase(
      this.state.email,
      this.state.password,
      this.state.name
    )*/
  }

  render() {
    return (
      <Form onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
        <div style={{color:"#cd098e",fontWeight:"bold"}}>Screener Registration Form</div>
        </FormGroup>
       <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="First Name"
            required
            value={this.state.txtfname}
            onChange={e => this.setState({ txtfname: e.target.value })}
          />
          <Label>First Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Last Name"
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
          />
        </FormGroup>
        <div className="d-flex justify-content-between">
         
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
          <Button.Ripple
            onClick={() =>  document.location="/auth/login"}
            color="primary"
            outline
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
export default connect(mapStateToProps, { useAuth0 })(
  RegisterAuth0
)

/*const RegisterAuth0 = (props) => {
  let { isAuthenticated, loginWithRedirect } = useAuth0()
    return (
      <React.Fragment>
      <CardBody className="pt-1 pb-3">
        <Button.Ripple
          color="primary"
          className="mt-1"
          onClick={ e => {
            e.preventDefault()

            if (!isAuthenticated){
              loginWithRedirect()
            }
            else{
              console.log('Already Logged In')
            }
          }}
        >
          Register With Auth0
        </Button.Ripple>
      </CardBody>
    </React.Fragment>
    )
}*/

//export default RegisterAuth0
