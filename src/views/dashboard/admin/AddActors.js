import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
//import { history } from "../../history"
//import { useAuth0 } from "../../authServices/auth0/auth0Service"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import Select from "react-select"
import axios from 'axios';

class AddActors extends React.Component {
  state = {
    txtfname:'',
    txtlname:'',
    txtmob:'',
    email:'',
    password:'',
    confirmPass:'',
    roleId:'',
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
    "&roleId="+this.state.roleId+""+
    "&userName="+this.state.userName+"";
    

let _targetPostURL="http://143.244.136.145:3010/api/auth/register?=";
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
document.location="/views/otp";
}
})
.catch((e)=>{

if(e.response.data.status===0 || e.response.data.status==="0")
{ 

//this.setState({myexection:e.response.data.message});

var i=0;
//alert(e.response.data.data.length);
//console.dir(e.response.data.data)
for(i=0;i<e.response.data.data.length;i++){
  alert(e.response.data.data[i].msg);
}
}


});

  }

  render() {

    const bloodGroup = [
        { value: "Select Actors", label: "Select Actors", color: "#00B8D9", isFixed: true },
        { value: "Doctor", label: "Doctor", color: "#00B8D9", isFixed: true,roleId:1 },
        { value: "NGO", label: "NGO", color: "#00B8D9", isFixed: true,roleId:3 },
        { value: "Screener", label: "Screener", color: "#00B8D9", isFixed: true,roleId:2 },      
        { value: "Sevika", label: "Sevika", color: "#00B8D9", isFixed: true,roleId:21 },
        { value: "Pharmacy", label: "Pharmacy", color: "#00B8D9", isFixed: true,roleId:4 }
       
      ]

    return (
      <Form onSubmit={this.handleRegister}>
        <FormGroup className="form-label-group">
        <div style={{color:"#cd098e",fontWeight:"bold"}}>Actors Registration Form</div>
        </FormGroup>
        <FormGroup>
                                    
                <Select                  
                name="actors"
                options={bloodGroup}
                className="React"
                classNamePrefix="select"            
                onChange={e =>{ 

                  this.setState({ bgroup: e.value })
                  this.setState({roleId:e.roleId })

              }
            }
                required
              />
              
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
            type="text"
            placeholder="Mobile No"
            maxLength={10}
            pattern="[+-]?\d+(?:[.,]\d+)?"
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
    AddActors
)

