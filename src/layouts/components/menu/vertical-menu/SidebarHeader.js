import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { Disc, X, Circle } from "react-feather"
import classnames from "classnames"
import axios from 'axios';
import brandLogo from "../../../../assets/img/logo/logo.png"
// import brandLogo from "../../../../assets/img/logo/javixLogo.png"
class SidebarHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false,
        response:''
    };
    
}

getLogo(){
  axios.post('http://javixlife.org:3010/api/logo/getLogo',{ ngoId:(localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")})
      .then(response => {
                     this.setState({response:response.data[0].client_logo})
                     console.log("=========",this.state.response);
                    //  console.log(response.data.data.data);
      })
    // console.log("data+++++",data);
}
  /*<div className="brand-logo" /> */
  componentDidMount() {
		this.mounted = true;
    this.getLogo();
    
		//this.setState({data:null});
//     axios.post("http://javixlife.org:3010/api/ngo/ngoList",{ngoLoginId:localStorage.getItem("ngoId")})
//     .then(response => {
//                    this.setState(response.data)
//                    console.log(response.data.data.data);

// })
}



  render() {
    const { DataisLoaded, response } = this.state;
   
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
      toggle,
      sidebarVisibility,
      menuShadow
    } = this.props
    return (
      <div className="navbar-header"> 
        <ul className="nav navbar-nav flex-row">
      
          <li className="nav-item mr-auto">
            <NavLink to="/" className="navbar-brand">
            
              <img style={{width:'170px',height:'40px'}} className="rounded" src={brandLogo}/>
              
            </NavLink>
          </li>
        
          {localStorage.getItem("roleId")=='3' ? (
          <li className="nav-item w-100 ">
            <NavLink to="/" className="navbar-brand">
            <img style={{width:'170px',height:'40px'}} className="rounded" src={this.state.response}/>
            </NavLink>
          </li>
          ):(
           <span></span>
          )
          }
         
          <li className="nav-item ">

      
 {/* { item.client_logo },  */}

    </li>
               
          <li className="nav-item nav-toggle">
            <div className="nav-link modern-nav-toggle">
              {collapsed === false ? (
                <Disc
                  onClick={() => {
                    toggleSidebarMenu(true)
                    toggle()
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark"
                    }
                  )}
                  size={20}
                  data-tour="toggle-icon"
                />
              ) : (
                <Circle
                  onClick={() => {
                    toggleSidebarMenu(false)
                    toggle()
                  }}
                  className={classnames(
                    "toggle-icon icon-x d-none d-xl-block font-medium-4",
                    {
                      "text-primary": activeTheme === "primary",
                      "text-success": activeTheme === "success",
                      "text-danger": activeTheme === "danger",
                      "text-info": activeTheme === "info",
                      "text-warning": activeTheme === "warning",
                      "text-dark": activeTheme === "dark"
                    }
                  )}
                  size={20}
                />
              )}
              <X
                onClick={sidebarVisibility}
                className={classnames(
                  "toggle-icon icon-x d-block d-xl-none font-medium-4",
                  {
                    "text-primary": activeTheme === "primary",
                    "text-success": activeTheme === "success",
                    "text-danger": activeTheme === "danger",
                    "text-info": activeTheme === "info",
                    "text-warning": activeTheme === "warning",
                    "text-dark": activeTheme === "dark"
                  }
                )}
                size={20}
              />
            </div>
          </li>
        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false
          })}
        />
        
      </div>
    )
  }
}

export default SidebarHeader
