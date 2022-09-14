import React from "react"
//import Router from "./IRouter"
import "./components/@vuexy/rippleButton/RippleButton"
import {  Switch, Route, BrowserRouter } from "react-router-dom"
import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

//import Login from  "./views/pages/authentication/login/Login"
import Login from "./views/auth/login/Login"
import Register from "./views/register/Register"
import NotAuthorized from "./views/pages/misc/NotAuthorized"
import Otp from "./views/otp/Otp" 
import resePwd from "./views/otp/ResetPwd" 
import Forgotpassword from "./views/auth/forgotpassword/Forgotpassword"
//import Maintenance from "./views/dashboard/Maintenance"
import AnalyticsDashboard from "./views/dashboard/analytics/AnalyticsDashboard"
import Dashboard from "./views/dashboard/Dashboard"
import EditProfile from "./views/pages/profile/editprofile/EditProfile"
import Logout from "./views/auth/logout/Logout"

import UsingFetch from "./components/utility/model/UsingFetch"

import Pages from "./views/dashboard/ngo/pages/Pages"

//import AppRouter from "./Router"


/*const App = props => {
  return <Router />
}*/

function App(){
  return(
    <div>
       <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NotAuthorized} />  
          <Route  path="/auth/login/" component={Login} />
          <Route  path="/auth/register" component={Register} />            
          <Route  path="/otp" component={Otp} /> 
          <Route  path="/resetpwd" component={resePwd} />           
          <Route  path="/auth/forgotpassword/" component={Forgotpassword} /> 
          <Route  path="/dashboard/" component={Dashboard} />
          <Route  path="/pages/profile/editprofile/" component={EditProfile} />
          <Route  path="/analytics/" component={AnalyticsDashboard} /> 
          <Route  exact path="/auth/logout/" component={Logout} /> 
          <Route  exact path="/components/utility/model/" component={UsingFetch} /> 
       
          <Route  exact path="/ngo/pages/" component={Pages} /> 
         
              
        </Switch>
        </BrowserRouter>    
    </div>
  )

}
export default App
