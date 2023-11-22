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
        ngoId:'',
        fname:'',
        lname:'',
        gender:'',
        email:'',
        mobile:'',
        owner:'',
        ngoRegistrationNo:'',
        dateOfRegistration:'',
        dateOfOnBoarding:'',
        country:'',
        mstate:'',
        district:'',
        addr:'',
        myexection:'',
        notfound:''
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

  handleSubmit = e => {
    e.preventDefault()
   
  
 if(window.confirm("Do you want to edit your profile !")){

  //alert('okay')
  window.location='/dashboard/pharmacyeditprofile'
  }
  }

  componentDidMount() {
		this.mounted = true;
		//this.setState({data:null});
        
		axios.post('https://javixlife.org/api/pharmacy/pharmacyById?=', { userId:localStorage.getItem("userid"),token:'dfjkhsdfaksjfh3756237' })
		 .then(response => {
          if(response.data.status===1){
          var recs=response.data.data.data;		
          this.setState({ngoId:recs[0].pharmacyId});
          this.setState({fname:recs[0].name});
          //this.setState({lname:recs[0].lastName});
          this.setState({gender:recs[0].sex});
          this.setState({email:recs[0].email});
          this.setState({mobile:recs[0].mobile});
          this.setState({owner:recs[0].owner});
          this.setState({ngoRegistrationNo:recs[0].info.pharmacyRegistrationNo});
          this.setState({dateOfRegistration:recs[0].info.dateOfRegistration});
          this.setState({dateOfOnBoarding:recs[0].info.dateOfOnBoarding});
          this.setState({country:recs[0].info.country});
          this.setState({mstate:recs[0].info.state});
          this.setState({district:recs[0].info.district});
          this.setState({addr:recs[0].info.address});
          this.state.notfound=1;
          }else{
           
          }
					
		 })
     .catch(e=>{
     
      if(e.response.data.status===0){
        this.state.notfound=0

      }
    });
} 


  render() {

    
    return (
   <React.Fragment>
        
    <div id="user-profile">


    <Card>
        <CardHeader>
          <CardTitle>Pharmacy Profile</CardTitle>
          <MoreHorizontal size={15} className="cursor-pointer" />
        </CardHeader>
        <CardBody>
          <Row><Col sm="12" style={{textAlign:"center",color:"red"}}>{this.state.notfound===0?"Not Found Records Found, Edit Profile !":""}</Col></Row>
        <Row>
          
            <Col sm="4">
            <img
              src={profileImg}
              alt="porfileImg"
              className="img-fluid img-border rounded-circle box-shadow-1"
            />
            </Col> 
           
            <Col sm="8">
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">User ID:</h6>
                    <p>{this.state.ngoId}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Name :</h6>
                    <p>{this.state.fname}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Moble No:</h6>
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
                    <h6 className="mb-0">Registration No:</h6>
                    <p>{this.state.ngoRegistrationNo}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0"> Owner :</h6>
                    <p>{this.state.owner}</p>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">Registration Date:</h6>
                    <p>{this.state.dateOfRegistration}</p>
                    </div>
                    </Col>
                    <Col sm="4">
                    <div className="mt-1">
                    <h6 className="mb-0">On Boarding Date :</h6>
                    <p>{this.state.dateOfOnBoarding}</p>
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
                    <p></p>
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

export default Profile
