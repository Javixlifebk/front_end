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
import profileImg from "../../../assets/img/profile/user-uploads/no_camera_sign.png"
import { RowPositionUtils } from "ag-grid-community"
import axios from "axios";

class PatientProfile extends React.Component {
  state = {
        screenerId:'',        
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
        notfound:'',
        pincode:'',
        aadhar:'',
        bgroup:'',
        imageurl:''
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

  componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
		axios.post('https://javixlife.org/api/citizen/citizenList?=', { citizenId: localStorage.getItem("citizenId"),token:'dfjkhsdfaksjfh3756237',ngoId: localStorage.getItem("ngoId") })
		 .then(response => {
      if(response.data.status===1){
        var recs=response.data.data.data;

          console.dir(response)
          //this.state.screenerId=response.data.screenerId
          this.setState({screenerId:recs[0].citizenId});         
          this.setState({fname:recs[0].firstName});
          this.setState({lname:recs[0].lastName});
          this.setState({gender:recs[0].sex});
          this.setState({email:recs[0].email});
          this.setState({mobile:recs[0].mobile});
          this.setState({aadhar:recs[0].aadhaar});
          this.setState({dob:recs[0].info.dateOfBirth});        
          this.setState({country:recs[0].info.country});
          this.setState({mstate:recs[0].info.state});
          this.setState({district:recs[0].info.district});
          this.setState({addr:recs[0].info.address});
          this.setState({pincode:recs[0].info.pincode});
          this.setState({bgroup:recs[0].info.bloodGroup});
          this.setState({imageurl:recs[0].info.photo});
          
        }else{
        }
					
		 }).catch(e=>{
      if(e.response.data.status===0){
        this.state.notfound=0

      }
    });
}

  getImage(imagUrl){
    if(imagUrl===''){
      imagUrl='https://javixlife.org/profile/no-photo-male.jpg';
    }
  return imagUrl;
  }

  handleSubmit = e => {
    e.preventDefault()
   
  
 if(window.confirm("Do you want to edit your profile !")){

  //alert('okay')
  window.location='/dashboard/screditprofile'
  }
  }


  render() {
    return (
      <React.Fragment>
    

    <div id="user-profile">


    <Card>
        <CardHeader>
          <CardTitle>Patient Profile</CardTitle>
         
        </CardHeader>
        <CardBody>
        <Row><Col sm="12" style={{textAlign:"center",color:"red"}}>{this.state.notfound===0?"Not Found Records Found, Edit Profile !":""}</Col></Row>
        <Row>
            <Col sm="4">
              <div>
              <img
                src={this.getImage(this.state.imageurl)}
                alt="porfileImg"
                className="img-fluid img-border rounded-circle box-shadow-1"
              />
              
            </div>
            </Col> 
           
            <Col sm="8">
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Citizen ID:</h6>
                    <p>{this.state.screenerId}</p>
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
                    <h6 className="mb-0">Blood Group:</h6>
                    <p>{this.state.bgroup}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Aadhaar :</h6>
                    <p>{this.state.aadhar}</p>
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
                    <p>{this.state.pincode}</p>
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
                <Col sm="12">
                <FormGroup>
                {this.state.notfound===0?
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={this.handleSubmit}
                  >
                    Update Profile
                  </Button.Ripple>
                  :""}
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

export default PatientProfile
