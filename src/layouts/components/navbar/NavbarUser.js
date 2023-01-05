import React from "react"
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  FormGroup
  
} from "reactstrap"
//import PerfectScrollbar from "react-perfect-scrollbar"

import Select from "react-select"
import axios from "axios"
import * as Icon from "react-feather"
import classnames from "classnames"
//import ReactCountryFlag from "react-country-flag"
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent"
//import { useAuth0 } from "../../../authServices/auth0/auth0Service"
import { history } from "../../../history"
//import { IntlContext } from "../../../utility/context/Internationalization"
import userImg from "../../../assets/img/pages/admin-icon.png"
import { LeftSquareFilled } from "@ant-design/icons"

const handleNavigation = (e, path) => {
  e.preventDefault()
  history.push(path)
}

const handleNavProfile = (e) => {
  //alert('Hello');
  e.preventDefault()
  switch(localStorage.getItem("roleId")){
    case '1':
      history.push("/docviewprofile");
      break;
    case '2':
      //document.location='../../views/dashboard/scrviewprofile';
        history.push("/scrviewprofile");
        break;
    case '3':
      //document.location='../../views/dashboard/scrviewprofile';
        history.push("/ngoviewprofile");
        break;
    case '21':
        history.push("/sevviewprofile");
        break;
  }
  
}

const UserDropdown = props => {
/*
<DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/pages/profile")}
      >
        <Icon.User size={14} className="mr-50" />
        <span className="align-middle">Edit Profile</span>
      </DropdownItem>
*/
  return (
    <DropdownMenu right>
      
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavigation(e, "/directory")}
      >
        <Icon.Mail size={14} className="mr-50" />
        <span className="align-middle">Directory</span>
      </DropdownItem>
      <DropdownItem
        tag="a"
        href="#"
        onClick={e => handleNavProfile(e)}
      >
        <Icon.CheckSquare size={14} className="mr-50" />
        <span className="align-middle">My Profile</span>
      </DropdownItem>
    
      <DropdownItem divider />
      <DropdownItem
        tag="a"
        href="/auth/logout"       
      >
        <Icon.Power size={14} className="mr-50" />
        <span  className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    data:[],
    suggestions: []
  }

  
async getOptions(){
  const res = await axios.post('http://javixlife.org:3010/api/ngo/allngoList')
  const data = res.data.data.data
    console.log("data",data);
    let options ={}
    //  options= {'value':'',
    // 'label':"select ngo"}
    options.value=''
    options.label='Select NGO'

// options.push(defaultValue)
   options = data.map(d => ({
    
    "value" : d.ngoLoginId,
    "label" : d.name
  }))

       let optionsDefault= {'value':'',
    'label':"select ngo"}
    options.push(optionsDefault)
    options.reverse();
    // options = grep(options, function(e) {
    //   return e.value != "rakesh";
    // });

    options = options.filter(function( obj ) {
      return obj.value !== "rakesh";
    });
  console.log(typeof(options));
  console.log(options);
 
  this.setState({selectOptions: options})
}
   handleChange(e){
   this.setState({ngoLoginId:e.value, name:e.label})
   localStorage.setItem("ngoId",e.value);
   window.location.reload(false);

  }

  componentDidMount() {
    this.getOptions()

    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
  }

  removeItem = id => {
    let cart = this.state.shoppingCart

    let updatedCart = cart.filter(i => i.id !== id)

    this.setState({
      shoppingCart: updatedCart
    })
  }

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown })

  render() {
    

    return (
      <>
      {localStorage.getItem("roleId")=='91' ? (
       <FormGroup style={{width:"30%"}}>
       <label>select NGO</label>
       {/* <select onChange={this.handleChange.bind(this)}><option>
        select ngo</option>
        this.data.map(d  ({
        <option value={this.state.selectOptions.value}>{this.state.selectOptions.label}</option>}))
        </select> */}
       <Select  isSearchable={false}     options={this.state.selectOptions} onChange={this.handleChange.bind(this)} 
       defaultValue={{"value" : '',
       "label" : 'select ngo'}}>
        

      
       </Select>
     
     </FormGroup>):(
      <p></p>)
     }
     
      <ul className="nav navbar-nav navbar-nav-user float-right align-items-center">
     
      
{/* 
        <NavItem className="nav-search" onClick={this.handleNavbarSearch}>
          <NavLink className="nav-link-search">
            <Icon.Search size={21} data-tour="search" />
          </NavLink>
          <div
            className={classnames("search-input", {
              open: this.state.navbarSearch,
              "d-none": this.state.navbarSearch === false
            })}
          >
            <div className="search-input-icon">
              <Icon.Search size={17} className="primary" />
            </div>
            <Autocomplete
              className="form-control"
              suggestions={this.state.suggestions}
              filterKey="title"
              filterHeaderKey="groupTitle"
              grouped={true}
              placeholder="Explore Vuexy..."
              autoFocus={true}
              clearInput={this.state.navbarSearch}
              externalClick={e => {
                this.setState({ navbarSearch : false })
              }}
              onKeyDown={e => {
                if (e.keyCode === 27 || e.keyCode === 13) {
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }
              }}
              customRender={(
                item,
                i,
                filteredData,
                activeSuggestion,
                onSuggestionItemClick,
                onSuggestionItemHover
              ) => {
                const IconTag = Icon[item.icon ? item.icon : "X"]
                return (
                  <li
                    className={classnames("suggestion-item", {
                      active: filteredData.indexOf(item) === activeSuggestion
                    })}
                    key={i}
                    onClick={e => onSuggestionItemClick(item.link, e)}
                    onMouseEnter={() =>
                      onSuggestionItemHover(filteredData.indexOf(item))
                    }
                  >
                    <div
                      className={classnames({
                        "d-flex justify-content-between align-items-center":
                          item.file || item.img
                      })}
                    >
                      <div className="item-container d-flex">
                        {item.icon ? (
                          <IconTag size={17} />
                        ) : item.file ? (
                          <img
                            src={item.file}
                            height="36"
                            width="28"
                            alt={item.title}
                          />
                        ) : item.img ? (
                          <img
                            className="rounded-circle mt-25"
                            src={item.img}
                            height="28"
                            width="28"
                            alt={item.title}
                          />
                        ) : null}
                        <div className="item-info ml-1">
                          <p className="align-middle mb-0">{item.title}</p>
                          {item.by || item.email ? (
                            <small className="text-muted">
                              {item.by
                                ? item.by
                                : item.email
                                ? item.email
                                : null}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      {item.size || item.date ? (
                        <div className="meta-container">
                          <small className="text-muted">
                            {item.size
                              ? item.size
                              : item.date
                              ? item.date
                              : null}
                          </small>
                        </div>
                      ) : null}
                    </div>
                    
                  </li>
                
                )
              }}
              onSuggestionsShown={userInput => {
                if (this.state.navbarSearch) {
                  this.props.handleAppOverlay(userInput)
                }
              }}
            />
            <div className="search-input-close">
              <Icon.X
                size={24}
                onClick={(e) => {
                  e.stopPropagation()
                  this.setState({
                    navbarSearch: false
                  })
                  this.props.handleAppOverlay("")
                }}
              />
            </div>
          </div>
        </NavItem> */}
        
    
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {this.props.userName}
              </span>
              
            </div>
            <span data-tour="user">
              <img
                src={userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      
      
          
      </ul>
        
      </>
    )
  }
}
export default NavbarUser
