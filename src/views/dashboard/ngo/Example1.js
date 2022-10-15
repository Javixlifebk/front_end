import React,{Component} from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search } from "react-feather"
import axios from 'axios';
import mydata from "./data"; 
import { reduceHooks } from "react-table";


const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
  
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

const socialMediaList = mydata.SocialMedias;

const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true
    },
    {
      name: "first_name",
      selector: "first_name",
      sortable: true
    }
  ]
  
  const data = [
    {
      id: 1,
      first_name: "Rakesh Kumar Sinha"
      
    }
  ]
  const rows=[
    {
    id:"11",
    first_name:"My Message"
    },
    {
      id:"12",
      first_name:"My Message"
      }

  ]

  const mydestdata={
    "Experiences": [
      {
        "companyName": "Demo1 Technologies",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        "url": "https://www.google.com/"
      }
      ]
  }

class Example1 extends React.Component {

    state =  {
        columns:columns,
        data:data,
        myid:null ,
        rows:null,
        myrow:null
      } 

      //componentShouldMount(){ 
        
      loadData() {

        const newPost = {
          userId: 1,
          title: 'A new post',
          body: 'This is the body of the new post'
      };

      const sendPostRequest = async () => {
        try {
            const resp = await axios.post('http://javixlife.org:3010/api/ngo/ngolist?=', newPost);
            this.setState({myrow:resp.data});
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

        console.dir(sendPostRequest());
      };
    
        
      };

        


     
    

      
       /* // let {userRole}=this.state
         let roleId=parseInt(localStorage.getItem("roleId"));
         let rows="";
    
         let postData="email="+ localStorage.getItem("_email");
         let _targetPostURL="http://javixlife.org:3010/api/ngo/ngolist?=";
    
         axios(
           {
             method: 'post',
             url: _targetPostURL,
             data: postData,
             headers: {'Content-Type': 'application/x-www-form-urlencoded' }
             }
     
         ).then(res=>{
          
           this.setState({myid:res.data})
           this.setState({myrow:res.data.data.data});
          
         
     
         })  */
    
       
         
        // return rows
            
    
    

	render() {
    this.loadData()
        //const mydata1=this.state.myid;
        //const myrow1=this.myrow;
        //const info2=0;
       // const info1=mydata1.data.data
        //console.dir(info1)
        
        
          //const info1=mydata1.data.data;
          //const info2=mydata1.data.data[0].info;
          //console.dir(JSON.stringify(info1));
         

        
        
        return (
            <div>
              {console.dir(this.state.myrow)}
                { 

                mydestdata.Experiences.map((experience, i) => {
                  return (
                    <div key={i}>
                      <p>{experience.companyName}</p>
                    </div>
                  );
                })
                
                }
            </div>
        );
		
    }
} 
export default Example1;