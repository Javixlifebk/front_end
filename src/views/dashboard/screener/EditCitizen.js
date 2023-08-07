import React,{ Suspense, lazy } from "react"
import Select from "react-select"
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

import { Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"


import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Check } from "react-feather"

import Spinner from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../utility/context/Layout"

import DataTable from "../../tables/data-tables/DataTableCustom"
import axios from 'axios';
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)
class EditCitizen extends React.Component {
  state = {
    fname:'',
    citizenLoginId:'',
    lname:'',
    gender:'',
    email:'',
    email_old:'',
    mobile:'',
    mobile_old:'',
    dob:'',
    qualification:'',
    specialization:'',
    country:'',
    mstate:'',
    district:'',
    addr:'',
    bgroup:'',
    aadhaar:'',
    aadhaar_old:'',
    myexection:'',
    pincode:'',
    fileuploads:'',
    curTime : new Date().toLocaleString()
  }

  
  onChangeHandler=event=>{

    this.setState({
      fileuploads: event.target.files[0],
      loaded: 0,
    })

}

componentDidMount() {
this.mounted = true;
//this.setState({data:null});
    
axios.post('https://javixlife.org:3010/api/citizen/citizenById?=', { citizenId:localStorage.getItem("citizenId"),token:'dfjkhsdfaksjfh3756237' })
 .then(response => {
  if(response.data.status===1){
    var recs=response.data.data.data;

      //console.dir(response)
      //this.state.screenerId=response.data.screenerId
      this.setState({screenerId:recs[0].screenerId});
      this.setState({citizenLoginId:recs[0].citizenLoginId});  
      this.setState({aadhaar_old:recs[0].aadhaar});       
      this.setState({fname:recs[0].firstName});
      this.setState({lname:recs[0].lastName});
      this.setState({gender:recs[0].sex});
      this.setState({email:recs[0].email});
      this.setState({email_old:recs[0].email});
      this.setState({mobile:recs[0].mobile});
      this.setState({mobile_old:recs[0].mobile});
      this.setState({dob:recs[0].info.dateOfBirth});
      this.setState({specialization:recs[0].info.specialisation});
      this.setState({qualification:recs[0].info.qualification});
      this.setState({country:recs[0].info.country});
      this.setState({addr:recs[0].info.addr});
      this.setState({mstate:recs[0].info.state});
      this.setState({district:recs[0].info.district});
      this.setState({pincode:recs[0].info.pincode});
      this.setState({addr:recs[0].info.address});
      this.setState({photo:recs[0].info.photo});
      this.setState({bgroup:recs[0].info.bloodGroup});
      
    }else{
    }
      
 }).catch(e=>{
 
  if(e.response.data.status===0){
    this.state.notfound=0

  }
});
}

  handleSubmit = e => {
    e.preventDefault()   

      var myCurrentDate = new Date();
      let mydate='';
      if((myCurrentDate.getMonth()+1)<=9){
        mydate="0"+(myCurrentDate.getMonth()+1);
      }else{
        mydate=myCurrentDate.getMonth()+1;
      }

      var returnUrl="";
      const formData = new FormData(); 
      formData.append('profile', this.state.fileuploads)
      axios.post("https://javixlife.org:3010/upload/profile", formData, { 
        // receive two    parameter endpoint url ,form data
    })
    .then(res => {
        returnUrl= res.data['profile-url'];
        

        if(this.state.email===undefined)
        
        this.state.email="";

        
      
        let dateOfOnBoarding = myCurrentDate.getFullYear() + '-' + mydate + '-' + myCurrentDate.getDate();
        let postData="screenerId="+localStorage.getItem("usermasid")+"&citizenLoginId="+this.state.citizenLoginId;
            postData+="&token=dfjkhsdfaksjfh3756237&firstName="+this.state.fname+"&lastName="+this.state.lname;

            if(this.state.email!=this.state.email_old){
              postData+="&email="+this.state.email;
            }
            if(this.state.mobile!=this.state.mobile_old){
              postData+="&mobileNo="+this.state.mobile;
            }
            postData+="&sex="+this.state.gender;
            postData+="&dateOfBirth="+this.state.dob+"&dateOfOnBoarding="+dateOfOnBoarding+"&bloodGroup="+this.state.bgroup;
            postData+="&country="+this.state.country+"&state="+this.state.mstate;
            postData+="&district="+this.state.district+"&pincode="+this.state.pincode+"&address="+this.state.addr+"&photo="+this.state.photo;      
     
            
        let _targetPostURL="https://javixlife.org:3010/api/citizen/updateCitizen";
        axios(
          {
            method: 'post',
            url: _targetPostURL,
            data: postData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded' }
            }
    
        ).then(res=>{
  
       
          if(res.data.status===1){
            alert('Profile Updated Successfully')
            window.location='/dashboard/citizenlist'
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            if(error.response.status===400){
              let msg="";
              for(var i=0;i<error.response.data.data.length;i++){
                msg=msg + "\r\n"+ error.response.data.data[i].msg;
                
              }
              alert(msg);
              return;
            }
           
          } else if (error.request) {
            // The request was made but no response was received
          } else {
            // Something happened in setting up the request that triggered an Error
          }
        
        });

    });
   
  }
    
  render() {
    const colourOptions = [
        { value: "India", label: "India", color: "#00B8D9", isFixed: true },
       
      ]

  const districts={  
    "states":[  
       {  
          "state":"Andhra Pradesh",
          "districts":[  
             "Anantapur",
             "Chittoor",
             "East Godavari",
             "Guntur",
             "Krishna",
             "Kurnool",
             "Nellore",
             "Prakasam",
             "Srikakulam",
             "Visakhapatnam",
             "Vizianagaram",
             "West Godavari",
             "YSR Kadapa"
          ]
       },
       {  
          "state":"Arunachal Pradesh",
          "districts":[  
             "Tawang",
             "West Kameng",
             "East Kameng",
             "Papum Pare",
             "Kurung Kumey",
             "Kra Daadi",
             "Lower Subansiri",
             "Upper Subansiri",
             "West Siang",
             "East Siang",
             "Siang",
             "Upper Siang",
             "Lower Siang",
             "Lower Dibang Valley",
             "Dibang Valley",
             "Anjaw",
             "Lohit",
             "Namsai",
             "Changlang",
             "Tirap",
             "Longding"
          ]
       },
       {  
          "state":"Assam",
          "districts":[  
             "Baksa",
             "Barpeta",
             "Biswanath",
             "Bongaigaon",
             "Cachar",
             "Charaideo",
             "Chirang",
             "Darrang",
             "Dhemaji",
             "Dhubri",
             "Dibrugarh",
             "Goalpara",
             "Golaghat",
             "Hailakandi",
             "Hojai",
             "Jorhat",
             "Kamrup Metropolitan",
             "Kamrup",
             "Karbi Anglong",
             "Karimganj",
             "Kokrajhar",
             "Lakhimpur",
             "Majuli",
             "Morigaon",
             "Nagaon",
             "Nalbari",
             "Dima Hasao",
             "Sivasagar",
             "Sonitpur",
             "South Salmara-Mankachar",
             "Tinsukia",
             "Udalguri",
             "West Karbi Anglong"
          ]
       },
       {  
          "state":"Bihar",
          "districts":[  
             "Araria",
             "Arwal",
             "Aurangabad",
             "Banka",
             "Begusarai",
             "Bhagalpur",
             "Bhojpur",
             "Buxar",
             "Darbhanga",
             "East Champaran (Motihari)",
             "Gaya",
             "Gopalganj",
             "Jamui",
             "Jehanabad",
             "Kaimur (Bhabua)",
             "Katihar",
             "Khagaria",
             "Kishanganj",
             "Lakhisarai",
             "Madhepura",
             "Madhubani",
             "Munger (Monghyr)",
             "Muzaffarpur",
             "Nalanda",
             "Nawada",
             "Patna",
             "Purnia (Purnea)",
             "Rohtas",
             "Saharsa",
             "Samastipur",
             "Saran",
             "Sheikhpura",
             "Sheohar",
             "Sitamarhi",
             "Siwan",
             "Supaul",
             "Vaishali",
             "West Champaran"
          ]
       },
       {  
          "state":"Chandigarh (UT)",
          "districts":[  
             "Chandigarh"
          ]
       },
       {  
          "state":"Chhattisgarh",
          "districts":[  
             "Balod",
             "Baloda Bazar",
             "Balrampur",
             "Bastar",
             "Bemetara",
             "Bijapur",
             "Bilaspur",
             "Dantewada (South Bastar)",
             "Dhamtari",
             "Durg",
             "Gariyaband",
             "Janjgir-Champa",
             "Jashpur",
             "Kabirdham (Kawardha)",
             "Kanker (North Bastar)",
             "Kondagaon",
             "Korba",
             "Korea (Koriya)",
             "Mahasamund",
             "Mungeli",
             "Narayanpur",
             "Raigarh",
             "Raipur",
             "Rajnandgaon",
             "Sukma",
             "Surajpur  ",
             "Surguja"
          ]
       },
       {  
          "state":"Dadra and Nagar Haveli (UT)",
          "districts":[  
             "Dadra & Nagar Haveli"
          ]
       },
       {  
          "state":"Daman and Diu (UT)",
          "districts":[  
             "Daman",
             "Diu"
          ]
       },
       {  
          "state":"Delhi (NCT)",
          "districts":[  
             "Central Delhi",
             "East Delhi",
             "New Delhi",
             "North Delhi",
             "North East  Delhi",
             "North West  Delhi",
             "Shahdara",
             "South Delhi",
             "South East Delhi",
             "South West  Delhi",
             "West Delhi"
          ]
       },
       {  
          "state":"Goa",
          "districts":[  
             "North Goa",
             "South Goa"
          ]
       },
       {  
          "state":"Gujarat",
          "districts":[  
             "Ahmedabad",
             "Amreli",
             "Anand",
             "Aravalli",
             "Banaskantha (Palanpur)",
             "Bharuch",
             "Bhavnagar",
             "Botad",
             "Chhota Udepur",
             "Dahod",
             "Dangs (Ahwa)",
             "Devbhoomi Dwarka",
             "Gandhinagar",
             "Gir Somnath",
             "Jamnagar",
             "Junagadh",
             "Kachchh",
             "Kheda (Nadiad)",
             "Mahisagar",
             "Mehsana",
             "Morbi",
             "Narmada (Rajpipla)",
             "Navsari",
             "Panchmahal (Godhra)",
             "Patan",
             "Porbandar",
             "Rajkot",
             "Sabarkantha (Himmatnagar)",
             "Surat",
             "Surendranagar",
             "Tapi (Vyara)",
             "Vadodara",
             "Valsad"
          ]
       },
       {  
          "state":"Haryana",
          "districts":[  
             "Ambala",
             "Bhiwani",
             "Charkhi Dadri",
             "Faridabad",
             "Fatehabad",
             "Gurgaon",
             "Hisar",
             "Jhajjar",
             "Jind",
             "Kaithal",
             "Karnal",
             "Kurukshetra",
             "Mahendragarh",
             "Mewat",
             "Palwal",
             "Panchkula",
             "Panipat",
             "Rewari",
             "Rohtak",
             "Sirsa",
             "Sonipat",
             "Yamunanagar"
          ]
       },
       {  
          "state":"Himachal Pradesh",
          "districts":[  
             "Bilaspur",
             "Chamba",
             "Hamirpur",
             "Kangra",
             "Kinnaur",
             "Kullu",
             "Lahaul &amp; Spiti",
             "Mandi",
             "Shimla",
             "Sirmaur (Sirmour)",
             "Solan",
             "Una"
          ]
       },
       {  
          "state":"Jammu and Kashmir",
          "districts":[  
             "Anantnag",
             "Bandipore",
             "Baramulla",
             "Budgam",
             "Doda",
             "Ganderbal",
             "Jammu",
             "Kargil",
             "Kathua",
             "Kishtwar",
             "Kulgam",
             "Kupwara",
             "Leh",
             "Poonch",
             "Pulwama",
             "Rajouri",
             "Ramban",
             "Reasi",
             "Samba",
             "Shopian",
             "Srinagar",
             "Udhampur"
          ]
       },
       {  
          "state":"Jharkhand",
          "districts":[  
             "Bokaro",
             "Chatra",
             "Deoghar",
             "Dhanbad",
             "Dumka",
             "East Singhbhum",
             "Garhwa",
             "Giridih",
             "Godda",
             "Gumla",
             "Hazaribag",
             "Jamtara",
             "Khunti",
             "Koderma",
             "Latehar",
             "Lohardaga",
             "Pakur",
             "Palamu",
             "Ramgarh",
             "Ranchi",
             "Sahibganj",
             "Seraikela-Kharsawan",
             "Simdega",
             "West Singhbhum"
          ]
       },
       {  
          "state":"Karnataka",
          "districts":[  
             "Bagalkot",
             "Ballari (Bellary)",
             "Belagavi (Belgaum)",
             "Bengaluru (Bangalore) Rural",
             "Bengaluru (Bangalore) Urban",
             "Bidar",
             "Chamarajanagar",
             "Chikballapur",
             "Chikkamagaluru (Chikmagalur)",
             "Chitradurga",
             "Dakshina Kannada",
             "Davangere",
             "Dharwad",
             "Gadag",
             "Hassan",
             "Haveri",
             "Kalaburagi (Gulbarga)",
             "Kodagu",
             "Kolar",
             "Koppal",
             "Mandya",
             "Mysuru (Mysore)",
             "Raichur",
             "Ramanagara",
             "Shivamogga (Shimoga)",
             "Tumakuru (Tumkur)",
             "Udupi",
             "Uttara Kannada (Karwar)",
             "Vijayapura (Bijapur)",
             "Yadgir"
          ]
       },
       {  
          "state":"Kerala",
          "districts":[  
             "Alappuzha",
             "Ernakulam",
             "Idukki",
             "Kannur",
             "Kasaragod",
             "Kollam",
             "Kottayam",
             "Kozhikode",
             "Malappuram",
             "Palakkad",
             "Pathanamthitta",
             "Thiruvananthapuram",
             "Thrissur",
             "Wayanad"
          ]
       },
       {  
          "state":"Lakshadweep (UT)",
          "districts":[  
             "Agatti",
             "Amini",
             "Androth",
             "Bithra",
             "Chethlath",
             "Kavaratti",
             "Kadmath",
             "Kalpeni",
             "Kilthan",
             "Minicoy"
          ]
       },
       {  
          "state":"Madhya Pradesh",
          "districts":[  
             "Agar Malwa",
             "Alirajpur",
             "Anuppur",
             "Ashoknagar",
             "Balaghat",
             "Barwani",
             "Betul",
             "Bhind",
             "Bhopal",
             "Burhanpur",
             "Chhatarpur",
             "Chhindwara",
             "Damoh",
             "Datia",
             "Dewas",
             "Dhar",
             "Dindori",
             "Guna",
             "Gwalior",
             "Harda",
             "Hoshangabad",
             "Indore",
             "Jabalpur",
             "Jhabua",
             "Katni",
             "Khandwa",
             "Khargone",
             "Mandla",
             "Mandsaur",
             "Morena",
             "Narsinghpur",
             "Neemuch",
             "Panna",
             "Raisen",
             "Rajgarh",
             "Ratlam",
             "Rewa",
             "Sagar",
             "Satna",
             "Sehore",
             "Seoni",
             "Shahdol",
             "Shajapur",
             "Sheopur",
             "Shivpuri",
             "Sidhi",
             "Singrauli",
             "Tikamgarh",
             "Ujjain",
             "Umaria",
             "Vidisha"
          ]
       },
       {  
          "state":"Maharashtra",
          "districts":[  
             "Ahmednagar",
             "Akola",
             "Amravati",
             "Aurangabad",
             "Beed",
             "Bhandara",
             "Buldhana",
             "Chandrapur",
             "Dhule",
             "Gadchiroli",
             "Gondia",
             "Hingoli",
             "Jalgaon",
             "Jalna",
             "Kolhapur",
             "Latur",
             "Mumbai City",
             "Mumbai Suburban",
             "Nagpur",
             "Nanded",
             "Nandurbar",
             "Nashik",
             "Osmanabad",
             "Palghar",
             "Parbhani",
             "Pune",
             "Raigad",
             "Ratnagiri",
             "Sangli",
             "Satara",
             "Sindhudurg",
             "Solapur",
             "Thane",
             "Wardha",
             "Washim",
             "Yavatmal"
          ]
       },
       {  
          "state":"Manipur",
          "districts":[  
             "Bishnupur",
             "Chandel",
             "Churachandpur",
             "Imphal East",
             "Imphal West",
             "Jiribam",
             "Kakching",
             "Kamjong",
             "Kangpokpi",
             "Noney",
             "Pherzawl",
             "Senapati",
             "Tamenglong",
             "Tengnoupal",
             "Thoubal",
             "Ukhrul"
          ]
       },
       {  
          "state":"Meghalaya",
          "districts":[  
             "East Garo Hills",
             "East Jaintia Hills",
             "East Khasi Hills",
             "North Garo Hills",
             "Ri Bhoi",
             "South Garo Hills",
             "South West Garo Hills ",
             "South West Khasi Hills",
             "West Garo Hills",
             "West Jaintia Hills",
             "West Khasi Hills"
          ]
       },
       {  
          "state":"Mizoram",
          "districts":[  
             "Aizawl",
             "Champhai",
             "Kolasib",
             "Lawngtlai",
             "Lunglei",
             "Mamit",
             "Saiha",
             "Serchhip"
          ]
       },
       {  
          "state":"Nagaland",
          "districts":[  
             "Dimapur",
             "Kiphire",
             "Kohima",
             "Longleng",
             "Mokokchung",
             "Mon",
             "Peren",
             "Phek",
             "Tuensang",
             "Wokha",
             "Zunheboto"
          ]
       },
       {  
          "state":"Odisha",
          "districts":[  
             "Angul",
             "Balangir",
             "Balasore",
             "Bargarh",
             "Bhadrak",
             "Boudh",
             "Cuttack",
             "Deogarh",
             "Dhenkanal",
             "Gajapati",
             "Ganjam",
             "Jagatsinghapur",
             "Jajpur",
             "Jharsuguda",
             "Kalahandi",
             "Kandhamal",
             "Kendrapara",
             "Kendujhar (Keonjhar)",
             "Khordha",
             "Koraput",
             "Malkangiri",
             "Mayurbhanj",
             "Nabarangpur",
             "Nayagarh",
             "Nuapada",
             "Puri",
             "Rayagada",
             "Sambalpur",
             "Sonepur",
             "Sundargarh"
          ]
       },
       {  
          "state":"Puducherry (UT)",
          "districts":[  
             "Karaikal",
             "Mahe",
             "Pondicherry",
             "Yanam"
          ]
       },
       {  
          "state":"Punjab",
          "districts":[  
             "Amritsar",
             "Barnala",
             "Bathinda",
             "Faridkot",
             "Fatehgarh Sahib",
             "Fazilka",
             "Ferozepur",
             "Gurdaspur",
             "Hoshiarpur",
             "Jalandhar",
             "Kapurthala",
             "Ludhiana",
             "Mansa",
             "Moga",
             "Muktsar",
             "Nawanshahr (Shahid Bhagat Singh Nagar)",
             "Pathankot",
             "Patiala",
             "Rupnagar",
             "Sahibzada Ajit Singh Nagar (Mohali)",
             "Sangrur",
             "Tarn Taran"
          ]
       },
       {  
          "state":"Rajasthan",
          "districts":[  
             "Ajmer",
             "Alwar",
             "Banswara",
             "Baran",
             "Barmer",
             "Bharatpur",
             "Bhilwara",
             "Bikaner",
             "Bundi",
             "Chittorgarh",
             "Churu",
             "Dausa",
             "Dholpur",
             "Dungarpur",
             "Hanumangarh",
             "Jaipur",
             "Jaisalmer",
             "Jalore",
             "Jhalawar",
             "Jhunjhunu",
             "Jodhpur",
             "Karauli",
             "Kota",
             "Nagaur",
             "Pali",
             "Pratapgarh",
             "Rajsamand",
             "Sawai Madhopur",
             "Sikar",
             "Sirohi",
             "Sri Ganganagar",
             "Tonk",
             "Udaipur"
          ]
       },
       {  
          "state":"Sikkim",
          "districts":[  
             "East Sikkim",
             "North Sikkim",
             "South Sikkim",
             "West Sikkim"
          ]
       },
       {  
          "state":"Tamil Nadu",
          "districts":[  
             "Ariyalur",
             "Chennai",
             "Coimbatore",
             "Cuddalore",
             "Dharmapuri",
             "Dindigul",
             "Erode",
             "Kanchipuram",
             "Kanyakumari",
             "Karur",
             "Krishnagiri",
             "Madurai",
             "Nagapattinam",
             "Namakkal",
             "Nilgiris",
             "Perambalur",
             "Pudukkottai",
             "Ramanathapuram",
             "Salem",
             "Sivaganga",
             "Thanjavur",
             "Theni",
             "Thoothukudi (Tuticorin)",
             "Tiruchirappalli",
             "Tirunelveli",
             "Tiruppur",
             "Tiruvallur",
             "Tiruvannamalai",
             "Tiruvarur",
             "Vellore",
             "Viluppuram",
             "Virudhunagar"
          ]
       },
       {  
          "state":"Telangana",
          "districts":[  
             "Adilabad",
             "Bhadradri Kothagudem",
             "Hyderabad",
             "Jagtial",
             "Jangaon",
             "Jayashankar Bhoopalpally",
             "Jogulamba Gadwal",
             "Kamareddy",
             "Karimnagar",
             "Khammam",
             "Komaram Bheem Asifabad",
             "Mahabubabad",
             "Mahabubnagar",
             "Mancherial",
             "Medak",
             "Medchal",
             "Nagarkurnool",
             "Nalgonda",
             "Nirmal",
             "Nizamabad",
             "Peddapalli",
             "Rajanna Sircilla",
             "Rangareddy",
             "Sangareddy",
             "Siddipet",
             "Suryapet",
             "Vikarabad",
             "Wanaparthy",
             "Warangal (Rural)",
             "Warangal (Urban)",
             "Yadadri Bhuvanagiri"
          ]
       },
       {  
          "state":"Tripura",
          "districts":[  
             "Dhalai",
             "Gomati",
             "Khowai",
             "North Tripura",
             "Sepahijala",
             "South Tripura",
             "Unakoti",
             "West Tripura"
          ]
       },
       {  
          "state":"Uttarakhand",
          "districts":[  
             "Almora",
             "Bageshwar",
             "Chamoli",
             "Champawat",
             "Dehradun",
             "Haridwar",
             "Nainital",
             "Pauri Garhwal",
             "Pithoragarh",
             "Rudraprayag",
             "Tehri Garhwal",
             "Udham Singh Nagar",
             "Uttarkashi"
          ]
       },
       {  
          "state":"Uttar Pradesh",
          "districts":[  
             "Agra",
             "Aligarh",
             "Allahabad",
             "Ambedkar Nagar",
             "Amethi (Chatrapati Sahuji Mahraj Nagar)",
             "Amroha (J.P. Nagar)",
             "Auraiya",
             "Azamgarh",
             "Baghpat",
             "Bahraich",
             "Ballia",
             "Balrampur",
             "Banda",
             "Barabanki",
             "Bareilly",
             "Basti",
             "Bhadohi",
             "Bijnor",
             "Budaun",
             "Bulandshahr",
             "Chandauli",
             "Chitrakoot",
             "Deoria",
             "Etah",
             "Etawah",
             "Faizabad",
             "Farrukhabad",
             "Fatehpur",
             "Firozabad",
             "Gautam Buddha Nagar",
             "Ghaziabad",
             "Ghazipur",
             "Gonda",
             "Gorakhpur",
             "Hamirpur",
             "Hapur (Panchsheel Nagar)",
             "Hardoi",
             "Hathras",
             "Jalaun",
             "Jaunpur",
             "Jhansi",
             "Kannauj",
             "Kanpur Dehat",
             "Kanpur Nagar",
             "Kanshiram Nagar (Kasganj)",
             "Kaushambi",
             "Kushinagar (Padrauna)",
             "Lakhimpur - Kheri",
             "Lalitpur",
             "Lucknow",
             "Maharajganj",
             "Mahoba",
             "Mainpuri",
             "Mathura",
             "Mau",
             "Meerut",
             "Mirzapur",
             "Moradabad",
             "Muzaffarnagar",
             "Pilibhit",
             "Pratapgarh",
             "RaeBareli",
             "Rampur",
             "Saharanpur",
             "Sambhal (Bhim Nagar)",
             "Sant Kabir Nagar",
             "Shahjahanpur",
             "Shamali (Prabuddh Nagar)",
             "Shravasti",
             "Siddharth Nagar",
             "Sitapur",
             "Sonbhadra",
             "Sultanpur",
             "Unnao",
             "Varanasi"
          ]
       },
       {  
          "state":"West Bengal",
          "districts":[  
             "Alipurduar",
             "Bankura",
             "Birbhum",
             "Burdwan (Bardhaman)",
             "Cooch Behar",
             "Dakshin Dinajpur (South Dinajpur)",
             "Darjeeling",
             "Hooghly",
             "Howrah",
             "Jalpaiguri",
             "Kalimpong",
             "Kolkata",
             "Malda",
             "Murshidabad",
             "Nadia",
             "North 24 Parganas",
             "Paschim Medinipur (West Medinipur)",
             "Purba Medinipur (East Medinipur)",
             "Purulia",
             "South 24 Parganas",
             "Uttar Dinajpur (North Dinajpur)"
          ]
       }
    ]
 };

      const bloodGroup = [
        { value: "Blood Group", label: "Blood Group", color: "#00B8D9", isFixed: true },
        { value: "A Positive", label: "A Positive", color: "#00B8D9", isFixed: true },
        { value: "A Negative", label: "A Negative", color: "#00B8D9", isFixed: true },
        { value: "B Positive", label: "B Positive", color: "#00B8D9", isFixed: true },
        { value: "B Negative", label: "B Negative", color: "#00B8D9", isFixed: true },
        { value: "AB Positive", label: "AB Positive", color: "#00B8D9", isFixed: true },
        { value: "AB Negative", label: "AB Negative", color: "#00B8D9", isFixed: true },
        { value: "O Positive", label: "O Positive", color: "#00B8D9", isFixed: true },
        { value: "O Negative", label: "O Negative", color: "#00B8D9", isFixed: true },
      ]

      const genderOptions = [
        { value: "Male", label: "Male", color: "#00B8D9", isFixed: true },
        { value: "Female", label: "Female", color: "#00B8D9", isFixed: true },
       
      ]

      const stateOptions=[
        {value: "0",label: "Please Select", color: "#00B8D9", isFixed: true },
        {value: "AN",label: "Andaman and Nicobar Islands", color: "#00B8D9", isFixed: true },
        {value: "AP",label: "Andhra Pradesh", color: "#00B8D9", isFixed: true },
        {value: "AR",label: "Arunachal Pradesh", color: "#00B8D9", isFixed: true },
        {value: "AS",label: "Assam", color: "#00B8D9", isFixed: true },
        {value: "BR",label: "Bihar", color: "#00B8D9", isFixed: true },
        {value: "CG",label: "Chandigarh", color: "#00B8D9", isFixed: true },
        {value: "CH",label: "Chhattisgarh", color: "#00B8D9", isFixed: true },
        {value: "Dadra and Nagar Haveli",label: "Dadra and Nagar Haveli", color: "#00B8D9", isFixed: true },
        {value: "Daman and Diu",label: "Daman and Diu", color: "#00B8D9", isFixed: true },
        {value: "Delhi",label: "Delhi", color: "#00B8D9", isFixed: true },
        {value: "Gujarat",label: "Gujarat", color: "#00B8D9", isFixed: true },
        {value: "Haryana",label: "Haryana", color: "#00B8D9", isFixed: true },
        {value: "Himachal Pradesh",label: "Himachal Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Jammu and Kashmir",label: "Jammu and Kashmir", color: "#00B8D9", isFixed: true },
        {value: "Jharkhand",label: "Jharkhand", color: "#00B8D9", isFixed: true },
        {value: "Karnataka",label: "Karnataka", color: "#00B8D9", isFixed: true },
        {value: "Kerala",label: "Kerala", color: "#00B8D9", isFixed: true },
        {value: "Lakshadweep",label: "Lakshadweep", color: "#00B8D9", isFixed: true },
        {value: "Madhya Pradesh",label: "Madhya Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Maharashtra",label: "Maharashtra", color: "#00B8D9", isFixed: true },
        {value: "Manipur",label: "Manipur", color: "#00B8D9", isFixed: true },
        {value: "Meghalaya",label: "Meghalaya", color: "#00B8D9", isFixed: true },
        {value: "Mizoram",label: "Mizoram", color: "#00B8D9", isFixed: true },
        {value: "Odisha",label: "Odisha", color: "#00B8D9", isFixed: true },
        {value: "Puducherry",label: "Puducherry", color: "#00B8D9", isFixed: true },
        {value: "Punjab",label: "Punjab", color: "#00B8D9", isFixed: true },
        {value: "Rajasthan",label: "Rajasthan", color: "#00B8D9", isFixed: true },
        {value: "Sikkim",label: "Sikkim", color: "#00B8D9", isFixed: true },
        {value: "Tamil Nadu",label: "Tamil Nadu", color: "#00B8D9", isFixed: true },
        {value: "Telangana",label: "Telangana", color: "#00B8D9", isFixed: true },
        {value: "Tripura",label: "Tripura", color: "#00B8D9", isFixed: true },
        {value: "Uttar Pradesh",label: "Uttar Pradesh", color: "#00B8D9", isFixed: true },
        {value: "Uttarakhand",label: "Uttarakhand", color: "#00B8D9", isFixed: true },
        {value: "West Bengal",label: "West Bengal", color: "#00B8D9", isFixed: true },

      ]
          
    return (
     
        <React.Fragment >
         
        <Row>
        <Col lg="12" md="12">
      <Card >
        <CardHeader>
          <CardTitle>Edit Citizen</CardTitle>
        </CardHeader>
        <CardBody>
        <Form action="/" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
            <Row>
            <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">First Name</Label>
                  <Input
                    type="text"                    
                    name="fname"
                    id="nameVertical"
                    placeholder="First Name"
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="nameVertical">Last Name</Label>
                  <Input
                    type="text"
                    name="lname"
                    id="nameVertical"
                    placeholder="Last Name"
                    value={this.state.lname}
                    onChange={e => this.setState({ lname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
             
              <Col sm="3">
              <FormGroup>
                  <Label for="nameVertical">Aadhaar</Label>
                  <Input
                    type="text"                    
                    name="aadhar"
                    id="nameVertical"
                    value={this.state.aadhaar_old}
                    disabled
                    
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="EmailVertical">Gender</Label>
                <Select  
                
                name="colors"
                options={genderOptions}
                className="React"
                classNamePrefix="select"   
                value={{ label: this.state.gender, value: this.state.gender }}
                defaultValue={{ label: this.state.gender, value: this.state.gender }}         
                onChange={e => this.setState({ gender: e.value })}
                required
              />
                </FormGroup>
              </Col>
              <Col sm="3">
                <FormGroup>
                  <Label for="EmailVertical">Date of Birth</Label>
                  <Input
                    type="text"
                    name="mobile"
                    id="mobileVertical"
                    placeholder="DOB"
                    value={this.state.dob}
                    onChange={e => this.setState({ dob: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="EmailVertical"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
            
              <Col sm="3">
                <FormGroup>
                  <Label for="">Mobile</Label>
                  <Input
                    type="phone"
                    name="mobile"
                    maxLength="10"
                    id="mobileVertical"
                    placeholder="Mobile"
                    value={this.state.mobile}
                    onChange={e => this.setState({ mobile: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
           
              
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Blood Group</Label>                  
                <Select  
                
                name="bgroup"
                options={bloodGroup}
                className="React"
                classNamePrefix="select"  
                defaultValue={{ label: this.state.bgroup, value: this.state.bgroup }}            
                onChange={e => this.setState({ bgroup: e.value })}
                              />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Country Name</Label>
                  
                <Select       
                
                name="country"
                options={colourOptions}
                className="React"
                classNamePrefix="select"
                value={{ label: this.state.country, value: this.state.country }}
                defaultValue={{ label: this.state.country, value: this.state.country }}
                onChange={e => this.setState({ country: e.value })}
                
              />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">State Name</Label>
                  <Select       
                
                name="State"
                options={stateOptions}
                className="React"
                classNamePrefix="select"
                value={{ label: this.state.mstate, value: this.state.mstate }}
                defaultValue={{ label: this.state.mstate, value: this.state.mstate }}
                onChange={e => this.setState({ mstate: e.value })}
                
              />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">District Name</Label>
                  <Input
                    type="text"
                    name="district"
                    id="EmailVertical"
                    placeholder="District"
                    value={this.state.district}
                    onChange={e => this.setState({ district: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
              <Col sm="4">
                <FormGroup>
                  <Label for="EmailVertical">Pin Code</Label>
                  <Input
                    type="text"
                    name="pincode"
                    maxLength="6"
                    id="EmailVertical"
                    placeholder="Pin Code"
                    value={this.state.pincode}
                    onChange={e => this.setState({ pincode: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>
         
              <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">Citizen Address</Label>                 
                  <Input
                    type="textarea"                    
                    name="Email"
                    id="EmailVertical"
                    placeholder="Address"
                    value={this.state.addr}
                    onChange={e => this.setState({ addr: e.target.value })}
                    
                  />
                </FormGroup>
              </Col>  
              <Row>
              <Col sm="12">
                <FormGroup>
                  <Label for="nameVertical">Upload Photo</Label>
                  <Input
                    type="file"                    
                    name="fileuploads"
                   
                    id="nameVertical"
                    placeholder="Description"                   
                    onChange={this.onChangeHandler}
                    
                  />
                </FormGroup>
              </Col>-
              </Row>          
              <Col sm="12">
                <FormGroup>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  
                  >
                    Submit
                  </Button.Ripple>
                  <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      </Col>
      </Row>
   
      </React.Fragment>
    )
  }
}
export default EditCitizen
