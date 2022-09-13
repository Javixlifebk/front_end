import React from "react"
import { Row, Col, Button, Spinner,Card, CardHeader, CardTitle, CardBody,FormGroup } from "reactstrap"

import { MoreHorizontal, Facebook, Instagram, Twitter } from "react-feather"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

/*import ProfileHeader from "./ProfileHeader"
import AboutCard from "./AboutCard"
import SuggestedPages from "./SuggestedPages"
import TwitterFeed from "./TwitterFeeds"
import Posts from "./Posts"
import LatestPhotos from "./LatestPhotos"
import Suggestions from "./Suggestions"
import Polls from "./Polls"*/

import "../../../assets/scss/pages/users-profile.scss"
import profileImg from "../../../assets/img/profile/user-uploads/user-13.jpg"
import { RowPositionUtils } from "ag-grid-community"
import axios from "axios";

class Profile extends React.Component {
  state = {
        doctorId:'',
        fname:'',
        lname:'',
        gender:'',
        email:'',
        mobile:'',
        dob:'',
        qualification:'',
        specialization:'',
        country:'',
        mstate:'',
        district:'',
        addr:'',
        myexection:'',
        imageurl:'',
        signature:''
  } 
  toggleLoading = () => {
    this.setState({
      isLoading: true
    })

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000)
  }

  handleBack() {    
       window.location='/dashboard/admin/doctorlist'    
  }
  handleChangePwd() {
    if(window.confirm("Do You Really Want to change Password !")===true){

    let postData="email=" + localStorage.getItem("doEmail");   
    console.log(postData);
    let _targetPostURL="http://159.65.148.197:3001/api/auth/forgotpw?=";    
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

                alert("Password Changed Successully and Sent to the doctor's email address !") 
               // localStorage.setItem("email",this.state.email);                                
                //this.setState({myexection:'Successfully Confirmed!'});  
                // document.location="/views/resetpwd";
              }
          
          })
          .catch(e=>{
           console.log("Exception:"); 
           console.log(e)   ;
         
          }); 
          
    

  }
 
}
  

 
  hangleChangeProfile() {
    //localStorage.setItem("fname",this.state.fname);
    //localStorage.setItem("lname",this.state.lname);  
    //localStorage.setItem("gender",this.state.gender);  
    //localStorage.setItem("email",this.state.email);  
    //localStorage.setItem("mobile",this.state.mobile);  
    //localStorage.setItem("fname",this.state.fname);  
    //localStorage.setItem("fname",this.state.fname);      
    window.location='/dashboard/admin/doceupdateprofile'
 
}

  

  componentDidMount() {console.log("DID MOUNT ************");
		this.mounted = true;
		//this.setState({data:null});
        
      
		  axios.post('http://159.65.148.197:3001/api/doctor/doctorById?=', {userId:localStorage.getItem("Docid"),token:'dfjkhsdfaksjfh3756237'})
		 .then(response => {
          var recs=response.data.data.data;		
          this.setState({doctorId:recs[0].doctorId});
          this.setState({fname:recs[0].firstName});
          this.setState({lname:recs[0].lastName});
          this.setState({gender:recs[0].sex});
          this.setState({email:recs[0].email});
          this.setState({mobile:recs[0].mobile});
          this.setState({dob:recs[0].info.dateOfBirth});
          this.setState({specialization:recs[0].info.specialisation});
          this.setState({qualification:recs[0].info.qualification});
          this.setState({country:recs[0].info.country});
          this.setState({mstate:recs[0].info.state});
          this.setState({district:recs[0].info.district});
          this.setState({addr:recs[0].info.address});
          this.setState({pincode:recs[0].info.pincode});
          this.setState({imageurl:recs[0].info.photo})
          this.setState({signature:recs[0].signature});
          localStorage.setItem("doEmail",this.state.email)
          //localStorage.removeItem("Docid");
					
		 });// then
} 


  render() {
    return (
    <React.Fragment>        
    <div id="user-profile">
    <Card>
        <CardHeader>
          <CardTitle>Doctor's Profile</CardTitle>
          <Button.Ripple
                    color="success"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={this.handleBack}
                  >
                 Back
                  </Button.Ripple>
        </CardHeader>
        <CardBody>
        <Row>
            <Col sm="4">
            <div>
            <img
              src={this.state.imageurl}
              alt="porfileImg"
              className="img-fluid img-border rounded-circle box-shadow-1"
            />
            <p>Signature</p>
            <img
              src={this.state.signature}
              alt="porfileImg"
              className="img-fluid img-border rounded-circle box-shadow-1"
            />
            </div>
            </Col> 
           
            <Col sm="8">
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">User ID:</h6>
                    <p>{this.state.doctorId}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Name :</h6>
                    <p>{this.state.fname+' ' + this.state.lname}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Mobile No:</h6>
                    <p>{this.state.mobile}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Email :</h6>
                    <p>{this.state.email}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Sex:</h6>
                    <p>{this.state.gender}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">DOB :</h6>
                    <p>{this.state.dob}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Qualification:</h6>
                    <p>{this.state.qualification}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Specialisation :</h6>
                    <p>{this.state.specialization}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="8">
                    <div className="mt-1">
                    <h6 className="mb-0">Address Detail:</h6>
                   
                    </div>
                    </Col>                   
                </Row>

                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Country:</h6>
                    <p>{this.state.country}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">State :</h6>
                    <p>{this.state.mstate}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">District:</h6>
                    <p>{this.state.district}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Pin Code :</h6>
                    <p>{this.state.pinode}</p>
                    </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm="8">
                    <div className="mt-1">
                    <h6 className="mb-0">Address:</h6>
                    <p>{this.state.addr}</p>
                    </div>
                    </Col>                   
                </Row>

                <Row>
                <Col sm="6">
                <FormGroup>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={this.hangleChangeProfile}
                  >
                   Edit Profile
                  </Button.Ripple>
                
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={this.handleChangePwd}
                  >
                  Chanage Password
                  </Button.Ripple>
                
                </FormGroup>
              </Col>
                </Row>


              
            </Col>
                      
            
          </Row>

          

       
        </CardBody>
      </Card>
   
   

    </div>
        
      </React.Fragment>
    )
  }
}

export default Profile
