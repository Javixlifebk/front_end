import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
//import navigationConfig from "../../../../../configs/navigationConfig"
import SideMenuGroup from "./SideMenuGroup"
import { Badge } from "reactstrap"
import { ChevronRight } from "react-feather"
import { FormattedMessage } from "react-intl"
import { history } from "../../../../../history"
import * as Icon from "react-feather"
import axios from 'axios';
class SideMenuContent extends React.Component {
  
  
  constructor(props) {
    super(props)   

    this.parentArr = []
    this.collapsedPath = null
    this.redirectUnauthorized = () => {
      history.push("/misc/not-authorized")

    }
  }
  state = {
    flag: true,
    isHovered: false,
    activeGroups: [],
    currentActiveGroup: [],
    tempArr: []
  }

  handleClickNav = e => {
    e.preventDefault()
    alert("Hello")
  }

  handleGroupClick = (id, parent = null, type = "") => {
    let open_group = this.state.activeGroups
    let active_group = this.state.currentActiveGroup
    let temp_arr = this.state.tempArr
    // Active Group to apply sidebar-group-active class
    if (type === "item" && parent === null) {
      active_group = []
      temp_arr = []
    } else if (type === "item" && parent !== null) {
      active_group = []
      if (temp_arr.includes(parent)) {
        temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length)
      } else {
        temp_arr = []
        temp_arr.push(parent)
      }
      active_group = temp_arr.slice(0)
    } else if (type === "collapse" && parent === null) {
      temp_arr = []
      temp_arr.push(id)
    } else if (type === "collapse" && parent !== null) {
      if (active_group.includes(parent)) {
        temp_arr = active_group.slice(0)
      }
      if (temp_arr.includes(id)) {
        // temp_arr.splice(temp_arr.indexOf(id), 1)
        temp_arr.splice(temp_arr.indexOf(id), temp_arr.length)
      } else {
        temp_arr.push(id)
      }
    } else {
      temp_arr = []
    }

    if (type === "collapse") {
      // If open group does not include clicked group item
      if (!open_group.includes(id)) {
        // Get unmatched items that are not in the active group
        let temp = open_group.filter(function(obj) {
          return active_group.indexOf(obj) === -1
        })
        // Remove those unmatched items from open group
        if (temp.length > 0 && !open_group.includes(parent)) {
          open_group = open_group.filter(function(obj) {
            return !temp.includes(obj)
          })
        }
        if (open_group.includes(parent) && active_group.includes(parent)) {
          open_group = active_group.slice(0)
        }
        // Add group item clicked in open group
        if (!open_group.includes(id)) {
          open_group.push(id)
        }
      } else {
        // If open group includes click group item, remove it from open group
        open_group.splice(open_group.indexOf(id), 1)
      }
    }
    if (type === "item") {
      open_group = active_group.slice(0)
    }

    this.setState({
      activeGroups: open_group,
      tempArr: temp_arr,
      currentActiveGroup: active_group
    })
  }

  initRender = parentArr => {
    this.setState({
      activeGroups: parentArr.slice(0),
      currentActiveGroup: parentArr.slice(0),
      flag: false
    })
  }

  componentDidMount() {
    this.initRender(this.parentArr[0] ? this.parentArr[0] : [])
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths)
      }

      this.initRender(
        this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []
      )
    }
  }

  getData() {  
    
   // let {userRole}=this.state
    let roleId=parseInt(localStorage.getItem("roleId"));
    let menus="";
    let postData="email="+ localStorage.getItem("_email");
   
    let _targetPostURL="http://javixlife.org:3010/api/auth/mymenulist?=";
    
    /*axios(
      {
        method: 'post',
        url: _targetPostURL,
        data: postData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded' }
        }

    ).then(res=>{
     

      

    })*/
   
     switch(roleId) {
        case 91:
          menus=[
            {
              id: "analyticsDash",
              title: "Home",
              type: "item",
              icon: <Icon.Home size={16} />,
              navLink: "/dashboard"
            },
            {
              id: "actors",
              title: "Add Actors",
              type: "item",
              icon: <Icon.User size={16} />,
              navLink: "/dashboard/add-actors"
            },   
            {
              id: "approve",
              title: "Approved Users",
              type: "collapse",
              icon: <Icon.Bell size={16} />,               
              children: [
                {
                  id: "Doctor",
                  title: "Doctors",
                  type: "item",
                  icon: <Icon.ArrowRight size={12} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/doctorlist"
                },
                ,
                {
                  id: "ngo",
                  title: "NGO",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/ngolist"
                },   
                {
                  id: "screener",
                  title: "Screener",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/screenerlist"
                },
                {
                  id: "sevika",
                  title: "Sevika",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/sevikalist"
                },             
                {
                  id: "pharmacy",
                  title: "Pharmacy",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/commingsoon"
                }
              ]
            },            
            {
              id: "users",
              title: "Users",
              type: "collapse",
              icon: <Icon.User size={16} />,               
              children: [
                {
                  id: "ausers",
                  title: "Active Users",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/activeusers"
                },
                {
                  id: "dusers",
                  title: "Inactive Users",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/inactiveusers"
                }
              ]
            },
            // ===========report
            {
              id: "usersdaily",
              title: "Daily and Weekly Reports",
              type: "collapse",
              icon: <Icon.User size={16} />,               
              children: [
                // {
                //   id: "dailyusers",
                //   title: "Daily Screening Screener",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/DailyScreening"
                // },
                
                {
                  id: "weeklyusers",
                  title: "Screening Screener ",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/Weeklyscreener"
                },
                // {
                //   id: "dailySevikausers",
                //   title: "Daily Screening Sevika ",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                {
                  id: "weeklySevikausers",
                  title: "Screening Sevika ",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/WeeklyScreenerSevika"
                },
                // {
                //   id: "dailycitizenusers",
                //   title: "Daily Citizens",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "dailycitydetailusers",
                //   title: "Daily Citizen Details",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "weekcityusers",
                //   title: "Weekly Citizens",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "weelcitydetailusers",
                //   title: "Weekly Citizen Details",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                {
                  id: "lipidusers",
                  title: "Lipid Critical Citizens",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                },
                // {
                //   id: "unscreenusers",
                //   title: "Unscreened Citizen",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/inactiveusers"
                // }
              ]
            },
            // ==================
            {
              id: "Insights ",
              title: "Insights ",
              type: "item",
              icon: <Icon.Activity size={16} />,
              navLink: "/dashboard/insights"               
          
            },
            {
              id: "Survey ",
              title: "General Survey Data",
              type: "item",
              target:"_blank",
              icon: <Icon.Activity size={16} />,
              // navLink: "http://javixlife.org:3010/documents/dump.csv"
              navLink:"/dashboard/survey/generalSurvey"   
          
            },
            
            {
              id: "hSurvey ",
              title: "Health Survey Data",
              type: "item",
              target:"_blank",
              icon: <Icon.Activity size={16} />,
              // navLink: "http://javixlife.org:3010/documents/dumpHealth.csv"   
              navLink:"/dashboard/survey/HealthSurvey"               
          
            },
            {
              id: "sSurvey ",
              title: "Socieconomic Survey Data",
              type: "item",
              target:"_blank",
              icon: <Icon.Activity size={16} />,
              // navLink: "http://javixlife.org:3010/documents/dumpHealth.csv" 
              navLink: "/dashboard/survey/SocieconomicSurvey"              
          
            },
            {
              id: "change",
              title: "Change Request",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/dashboard/commingsoon"
            }/*,          
            {
              id: "communicate",
              title: "Directory",
              type: "item",
              icon: <Icon.Phone size={16} />,
              navLink: "/dashboard/directory"
            }*/,
            {
              id: "complaint",
              title: "Issues Addressing",
              type: "collapse",
              icon: <Icon.Bell size={16} />,               
              children: [
                {
                  id: "newissue",
                  title: "New Issue",
                  type: "item",
                  icon: <Icon.ArrowRight size={12} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/issuelistall"
                },
                {
                  id: "resolve",
                  title: "Updated Issue",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/admin/issuelistalladdressed"
                }             
                
              ]
            },
            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout"
            },
          
          ]
          return  menus
          case 1:
            menus=[
              {
                id: "analyticsDash",
                title: "Home",
                type: "item",
                icon: <Icon.Home size={16} />,
                navLink: "/dashboard"
              },
              // {
                // id: "investigation",
                // title: "Investigate",
                // type: "collapse",
                // icon: <Icon.Bell size={16} />,               
                // children: [
                  // {
                  //   id: "citizen",
                  //   title: "Ondemand",
                  //   type: "item",
                  //   icon: <Icon.ArrowRight size={16} />,
                  //   permissions: ["admin", "editor"],
                  //   navLink: "#"
                  // },
                  {
                    id: "reinvestiage",
                    title: "Referred Patient",
                    type: "item",
                    icon: <Icon.Bell size={16} />,
                    permissions: ["admin", "editor"],
                    navLink: "/dashboard/doctor/ReferPatientList"
                  },
                 
              //   ]
              // }, 
             
              {
                id: "Patient",
                title: "Patient View",
                type: "item",
                icon: <Icon.User size={16} />,
                navLink: "/dashboard/citizenlist"
              },   
              /*{
                id: "profile",
                title: "Profile",
                type: "item",
                icon: <Icon.User size={16} />,
                navLink: "/docviewprofile"
              },*/           
              /*{
                id: "communicate",
                title: "Directory",
                type: "item",
                icon: <Icon.Phone size={16} />,
                navLink: "/dashboard/directory"
              },*/
              {
                id: "refer",
                title: "Help",
                type: "item",
                icon: <Icon.Briefcase size={16} />,
                navLink: "/dashboard/issuelist"
              },
              {
                id: "Insights",
                title: "Insights",
                type: "item",
                icon: <Icon.File size={16} />,
                navLink: "/dashboard/insights"
              },
            
              {
                id: "logout",
                title: "Logout",
                type: "item",
                icon: <Icon.LogOut size={16} />,
                navLink: "/auth/logout"
              },
            
            ]
            return  menus
        case 2:
          menus=[
            {
              id: "home",
              title: "Home",
              type: "item",
              icon: <Icon.Home size={16} />,
              navLink: "/dashboard"
            },
            
              /*{
                id: "editproile",
                title: "Profile",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/scrviewprofile"
              },*/
              {
                id: "citizenlist",
                title: "Citizens",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/citizenlist"
              },
              /*{
                id: "directory",
                title: "Directory",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/directory"
              },*/
              {
                id: "reportissue",
                title: "Help",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/issuelist"
              },
              {
                id: "Insights",
                title: "Insights",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/insights"
              },

            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout/"
            },
          
          ]
          return  menus
          case 21:
          menus=[
            {
              id: "home",
              title: "Home",
              type: "item",
              icon: <Icon.Home size={16} />,
              navLink: "/dashboard"
            },
              /*{
                id: "editproile",
                title: "Profile",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/seveditprofile"
              },*/
              /*{
                id: "directory",
                title: "Directory",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/directory"
              },*/
              {
                id: "citizenlist",
                title: "Citizens",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/citizenlist"
              },
              {
                id: "reportissue",
                title: "Help",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/issuelist"
              },
              {
                id: "Insights",
                title: "Insights",
                type: "item",
                icon: <Icon.Edit size={16} />,
                navLink: "/dashboard/commingsoon"
              },

            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout/"
            },
          
          ]
          return  menus
          case 3:
          menus=[
            {
              id: "home",
              title: "Home",
              type: "item",
              icon: <Icon.Home size={16} />,
              navLink: "/dashboard"
            },
           /* {
              id: "editproile",
              title: "Profile",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/ngoviewprofile"
            },*/
            {
              id: "mapscreener",
              title: "Map Screener",
              type: "collapse",
              icon: <Icon.Bell size={16} />,               
              children: [
                {
                  id: "mapped",
                  title: "Mapped Screener",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/mappedscreener"
                },
                {
                  id: "unmapped",
                  title: "Unmapped Screener",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/unmappedscreener"
                }
              ]
            },
            {
              id: "mapsevika",
              title: "Map Sevika",
              type: "collapse",
              icon: <Icon.Bell size={16} />,               
              children: [
                {
                  id: "mapped",
                  title: "Mapped Sevika",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/mappedsevika"
                },
                {
                  id: "unmapped",
                  title: "Unmapped Sevika",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/unmappedsevika"
                }
              ]
            },    
            {
              id: "mapdoctor",
              title: "Map Doctor",
              type: "collapse",
              icon: <Icon.Bell size={16} />,               
              children: [
                {
                  id: "mapped",
                  title: "Mapped Doctor",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/mappedDoctor"
                },
                {
                  id: "unmapped",
                  title: "Unmapped Doctor",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/dashboard/unmappedDoctor"
                }
              ]
            },    
            {
              id: "usersdaily",
              title: "Daily and Weekly Reports",
              type: "collapse",
              icon: <Icon.User size={16} />,               
              children: [
                // {
                //   id: "dailyusers",
                //   title: "Daily Screening Screener",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/DailyScreening"
                // },
                
                {
                  id: "weeklyusers",
                  title: "Screening Screener ",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/Weeklyscreener"
                },
                // {
                //   id: "dailySevikausers",
                //   title: "Daily Screening Sevika ",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                {
                  id: "weeklySevikausers",
                  title: "Screening Sevika ",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/WeeklyScreenerSevika"
                },
                // {
                //   id: "dailycitizenusers",
                //   title: "Daily Citizens",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "dailycitydetailusers",
                //   title: "Daily Citizen Details",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "weekcityusers",
                //   title: "Weekly Citizens",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                // {
                //   id: "weelcitydetailusers",
                //   title: "Weekly Citizen Details",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                // },
                {
                  id: "lipidusers",
                  title: "Lipid Critical Citizens",
                  type: "item",
                  icon: <Icon.ArrowRight size={16} />,
                  permissions: ["admin", "editor"],
                  navLink: "/screener/dailyAndweeklyReports/LipidCritical"
                },
                // {
                //   id: "unscreenusers",
                //   title: "Unscreened Citizen",
                //   type: "item",
                //   icon: <Icon.ArrowRight size={16} />,
                //   permissions: ["admin", "editor"],
                //   navLink: "/inactiveusers"
                // }
              ]
            }, 
           /*{
              id: "directory",
              title: "Directory",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink:"/dashboard/directory"


            },*/
            {
              id: "reportissue",
              title: "Help",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/dashboard/issuelist"
            },
            {
              id: "Insights",
              title: "Insights",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/dashboard/insights"
            },
            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout/"
            },
          
          ]
          return  menus
           case 4:
          menus=[
            {
              id: "home",
              title: "Home",
              type: "item",
              icon: <Icon.Home size={16} />,
              navLink: "/dashboard"
            },
            /*{
              id: "editproile",
              title: "Edit Profile",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/pharmacyviewprofile"
            },*/            
           /*{
              id: "directory",
              title: "Directory",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink:"/dashboard/directory"


            },*/
            {
              id: "reportissue",
              title: "Help",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/dashboard/issuelist"
            },
            {
              id: "Insights",
              title: "Insights",
              type: "item",
              icon: <Icon.Edit size={16} />,
              navLink: "/dashboard/commingsoon"
            },
            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout/"
            },
          
          ]
          return  menus
        default:
          menus=[
            {
              id: "analyticsDash",
              title: "Homes",
              type: "item",
              icon: <Icon.Circle size={16} />,
              navLink: "dashboard/"
            },
            {
              id: "logout",
              title: "Logout",
              type: "item",
              icon: <Icon.LogOut size={16} />,
              navLink: "/auth/logout/"
            },
          
          ]
          return  menus
      }
   
    
    /*return(
        
     /* [{
        id: "dashboard",
        title: "Dashboard",
        type: "collapse",
        icon: <Icon.Home size={20} />,
        badge: "warning",
        badgeText: "2",
        children: [
          {
            id: "analyticsDash",
            title: "Analytics",
            type: "item",
            icon: <Icon.Circle size={12} />,
            permissions: ["admin", "editor"],
            navLink: "/"
          },
          {
            id: "eCommerceDash",
            title: "eCommerce",
            type: "item",
            icon: <Icon.Circle size={12} />,
            permissions: ["admin"],
            navLink: "/ecommerce-dashboard"
          }
        ]
      }
  
     ]*/
  
    //)
}

  render() {
    // Loop over sidebar items
    // eslint-disable-next-line

   
      const Abc= this.getData()

      const menuItems = Abc.map(item => {
      const CustomAnchorTag = item.type === "external-link" ? `a` : Link
      // checks if item has groupheader
      if (item.type === "groupHeader") {
        return (
          <li
            className="navigation-header"
            key={`group-header-${item.groupTitle}`}>
            <span>{item.groupTitle}</span>
          </li>
        )
      }

      let renderItem = (
        <li
          className={classnames("nav-item", {
            "has-sub": item.type === "collapse",
            open: this.state.activeGroups.includes(item.id),
            "sidebar-group-active": this.state.currentActiveGroup.includes(
              item.id
            ),
            hover: this.props.hoverIndex === item.id,
            active:
              (this.props.activeItemState === item.navLink &&
                item.type === "item") ||
              (item.parentOf &&
                item.parentOf.includes(this.props.activeItemState)),
            disabled: item.disabled
          })}
          key={item.id}
          onClick={e => {
            e.stopPropagation()
            if (item.type === "item") {
              this.props.handleActiveItem(item.navLink)
              this.handleGroupClick(item.id, null, item.type)
              if (this.props.deviceWidth <= 1200 && item.type === "item") {
                this.props.toggleMenu()
              }
            } else {
              this.handleGroupClick(item.id, null, item.type)
            }
          }}>
          <CustomAnchorTag
            to={
              item.filterBase
                ? item.filterBase
                : item.navLink && item.type === "item"
                ? item.navLink
                : ""
            }
            href={item.type === "external-link" ? item.navLink : ""}
            className={`d-flex ${
              item.badgeText
                ? "justify-content-between"
                : "justify-content-start"
            }`}
            onMouseEnter={() => {
              this.props.handleSidebarMouseEnter(item.id)
            }}
            onMouseLeave={() => {
              this.props.handleSidebarMouseEnter(item.id)
            }}
            key={item.id}
            onClick={e => {
              return item.type === "collapse" ? e.preventDefault() : document.location=item.navLink
            }}
            target={item.newTab ? "_blank" : undefined}>
            <div className="menu-text">
              {item.icon}
              <span className="menu-item menu-title">
                <FormattedMessage id={item.title} />
              </span>
            </div>

            {item.badge ? (
              <div className="menu-badge">
                <Badge color={item.badge} className="mr-1" pill>
                  {item.badgeText}
                </Badge>
              </div>
            ) : (
              ""
            )}
            {item.type === "collapse" ? (
              <ChevronRight className="menu-toggle-icon" size={13} />
            ) : (
              ""
            )}
          </CustomAnchorTag>
          {item.type === "collapse" ? (
            <SideMenuGroup
              group={item}
              handleGroupClick={this.handleGroupClick}
              activeGroup={this.state.activeGroups}
              handleActiveItem={this.props.handleActiveItem}
              activeItemState={this.props.activeItemState}
              handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
              activePath={this.props.activePath}
              hoverIndex={this.props.hoverIndex}
              initRender={this.initRender}
              parentArr={this.parentArr}
              triggerActive={undefined}
              currentActiveGroup={this.state.currentActiveGroup}
              permission={this.props.permission}
              currentUser={this.props.currentUser}
              redirectUnauthorized={this.redirectUnauthorized}
              collapsedMenuPaths={this.props.collapsedMenuPaths}
              toggleMenu={this.props.toggleMenu}
              deviceWidth={this.props.deviceWidth}
            />
          ) : (
            ""
          )}
        </li>
      )

      if (
        item.navLink &&
        item.collapsed !== undefined &&
        item.collapsed === true
      ) {
        this.collapsedPath = item.navLink
        this.props.collapsedMenuPaths(item.navLink)
      }

      if (
        item.type === "collapse" ||
        item.type === "external-link" ||
        (item.type === "item" &&
          item.permissions &&
          item.permissions.includes(this.props.currentUser)) ||
        item.permissions === undefined
      ) {
        return renderItem
      } else if (
        item.type === "item" &&
        item.navLink === this.props.activePath &&
        !item.permissions.includes(this.props.currentUser)
      ) {
        return this.redirectUnauthorized()
      }
    })
    return <React.Fragment>{menuItems}</React.Fragment>
  }
}
export default SideMenuContent
