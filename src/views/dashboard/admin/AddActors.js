import React from "react"
// import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
//import { history } from "../../history"
//import { useAuth0 } from "../../authServices/auth0/auth0Service"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label
 
} from "reactstrap"
import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import Select from "react-select"
import axios from 'axios';
// import { ReceiptRounded } from "@mui/icons-material"

class AddActors extends React.Component {
  state = {
    selectOptions : [],
    id: "",
    name: '',
    ngoId: "",
    ngoLoginId:"",
    owner: '',
    txtfname:'',
    txtlname:'',
    txtmob:'',
    email:'',
    password:'',
    confirmPass:'',
    roleId:'',
    confirmAccept:true,
    myexection:'',
    fileuploads:'',
    siguploads:'',
    errors:'',
    // emailerr:'',
    // usernameerr:''
  }

  


  handleRegister = e => {

    e.preventDefault();
    const formData = new FormData(); 
    formData.append('logo', this.state.fileuploads);
    formData.append('client_logo', this.state.fileuploads);
    let postData="firstName="+this.state.txtfname+
                  "&lastName="+this.state.txtlname+
                  "&password="+this.state.password+
                  "&email="+this.state.email+
                  "&phoneNo="+this.state.txtmob+""+
                  "&roleId="+this.state.roleId+""+
                  "&ngoId="+this.state.ngoLoginId+""+
                  "&userName="+this.state.userName+"";
                  localStorage.setItem ('ngoId',this.state.ngoLoginId)
      // if(this.state.roleId === 3){
      //   this.state.ngoId="Na"
      // }
      
                  
    let _targetPostURL="https://javixlife.org:3010/api/auth/register?=";
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
          //  console.dir(e)
           if(e.response.data.status===0 || e.response.data.status==="0")
           { 
           
          //  this.setState({myexection:e.response.data.messege});
          this.setState({errors:e.response.data.data});  
          // this.setState({emailerr:e.response.data.data[0].msg});
          // this.setState({usernameerr:e.response.data.data[1].msg});
          
           }
           

          });
  }

 
async getOptions(){
  const res = await axios.post('https://javixlife.org:3010/api/ngo/allngoList')
  const data = res.data.data.data
    console.log(data);
  const options = data.map(d => ({
    "value" : d.ngoLoginId,
    "label" : d.name
  }))
  this.setState({selectOptions: options})
}
   handleChange(e){
   this.setState({ngoLoginId:e.value, name:e.label})
  }


//   onChangeHandler=event=>{

//     this.setState({
//       fileuploads: event.target.files[0],
//       loaded: 0,
//     })

// }

// onSignHandler=event=>{
//   this.setState({
//     siguploads: event.target.files[0],
//     loaded: 0,
//   })

// }
  componentDidMount(){
    this.getOptions()
    
}





  render() {
  console.log(this.state.selecOptions)
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

                  this.setState({bgroup:e.value })
                  this.setState({roleId:e.roleId })

              }
            }
                required
              />
 { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='roleId') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
                </FormGroup>
{ this.state.roleId !== 3 ?(
 
      <FormGroup>
         <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
      </div>
      </FormGroup>
):(
  <div></div>
//   <FormGroup>
//   <div>
//  <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
// </div>
// </FormGroup>
)
  }
 
       <FormGroup className="form-label-group">

          <Input
            type="text"
            placeholder="First Name"
            required
            value={this.state.txtfname}
            onChange={e => this.setState({ txtfname: e.target.value })}
          />
          <Label>First Name</Label>
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='firstName') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
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
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='lastName') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
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
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='phoneNo') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
           {/* <span> { this.state.emailerr &&
  <h6 className="error" style={{color:"red"}}> { this.state.emailerr } </h6> }</span> */}
          <Label>Email</Label>
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='email') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
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
           {/* <span> { this.state.usernameerr &&
  <h6 className="error" style={{color:"red"}}> { this.state.usernameerr } </h6> }</span> */}
          <Label>User Name</Label>
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='userName') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
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
          { 
            this.state.errors !='' ? this.state.errors.map((el) => {
              if(el.param ==='password') {
                return <p style={{"color":"red"}}>{el.msg}</p>
              } 
            })
            : ''
          }
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
        {/* <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Upload Photo</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                    id="imgphoto"
                    placeholder="Upload Photo"                   
                    onChange={this.onChangeHandler}
                    required
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Upload Signature</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                    id="imgsignature"
                    placeholder="Upload Signature"                   
                    onChange={this.onSignHandler}
                    required
                  />
                </FormGroup>
              </Col>
              </Row> */}
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

