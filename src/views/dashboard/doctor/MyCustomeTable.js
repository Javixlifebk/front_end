import React,{ useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Badge,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"

import DataTable from "react-data-table-component"

const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true
    },
    {
      name: "First Name",
      selector: "first_name",
      sortable: true
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true
    },
    {
      name: "Email",
      selector: "email",
      sortable: true
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true
    }
  ]
  
  
class MyCustomeTable extends React.Component {
     
    constructor(props) {
        super(props);
        
       this.state={ 
           data: [],
           recs:[]

        }
        
    }
    handleClick = e => {
        e.preventDefault()   
        
        var rec={id: Math.random(),
                 first_name: "jjjjjjjj",
                 last_name: "mmmm",
                 email: "kkkic.com",
                 gender:'male'
        }
       /*var recs=[
        {
          id: 1,
          first_name: "Alyss",
          last_name: "Lillecrop",
          email: "alillecrop0@twitpic.com",
          gender: "Female"
        },
        {
          id: 2,
          first_name: "Shep",
          last_name: "Pentlow",
          email: "spentlow1@home.pl",
          gender: "Male"
        }
      ] */
      var trecs =this.state.recs;
      trecs.push(rec);
      this.setState({recs:trecs});
       //recs.push(rec);
       this.setState({data:trecs}); 
        console.dir(this.state.data);     

      }


     /* render for all */
     render() {


          
      
       return (
   
         
        <React.Fragment >   
        <Row>
         <Col lg="12" md="12">
         <Card>
           <CardHeader>
           <Row>
             <Col sm="12">
             <Button.Ripple onClick={this.handleClick}
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"                  
                  >
                    Add New
                  </Button.Ripple>
             </Col>
             </Row>
           </CardHeader>
           <CardBody className="rdt_Wrapper">
           <Row>          
             <Col sm="12">
             <CardTitle>Medication List</CardTitle>
             </Col>          
             </Row>
             <Row>
             <Col sm="12">
             <DataTable className="dataTable-basic" name='data' data={this.state.data} columns={columns} noHeader />
             </Col>
             </Row>
             
           </CardBody>
         </Card>
         </Col>
         </Row>
         </React.Fragment>
       )
     }
     /* ENd rebder */
   }
   
   export default MyCustomeTable