import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import { history } from "../../../../history"
//import { Redirect } from "react-router-dom"

import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner"
//import knowledgeBaseCategory from "../../views/pages/knowledge-base/Category"
//import knowledgeBaseQuestion from "../../views/pages/knowledge-base/Questions"
import { ContextLayout } from "../../../../utility/context/Layout"

const EditProfile = lazy(() =>
  import("../../../pages/profile/editprofile/EditProfile")
)


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
  
export default class Pages extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userRole:localStorage.getItem("roleId")
    }

  }

  renderSwitch(param) {
    switch(param) {
      
      case 3:
          return EditProfile;  
     
      default:
        return EditProfile;  
    }
  }
    render() {

      const {userRole}=3
      return (
          <div>
         
            <Router history={history}>
            <Switch>              
              <AppRoute exact path="/pages/profile/editprofile/" component={this.renderSwitch(parseInt(3))} />
             </Switch>
             </Router>
          </div>
      )
    }
}