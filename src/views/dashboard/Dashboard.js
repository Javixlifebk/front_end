import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import { history } from "../../history"
//import { Redirect } from "react-router-dom"

import Spinner from "../../components/@vuexy/spinner/Loading-spinner"
//import knowledgeBaseCategory from "../../views/pages/knowledge-base/Category"
//import knowledgeBaseQuestion from "../../views/pages/knowledge-base/Questions"
import { ContextLayout } from "../../utility/context/Layout"

const accordion = lazy(() =>
  import("../../components/reactstrap/collapse/Accordion")
)

const analyticsDashboard = lazy(() =>
  import("../../views/dashboard/analytics/AnalyticsDashboard")
)

const Logout = lazy(() =>
  import("../../views/auth/logout/Logout")
)

const myCustomTable = lazy(() =>
  import("../../views/dashboard/doctor/MyCustomeTable")
)
// ---------------------------------


//*****************Javix Admin Section****************************** */
const adminDashboard = lazy(() =>
  import("../../views/dashboard/admin/AdminDashboard")
)

const doctorList = lazy(() =>
  import("../../views/dashboard/admin/DoctorList")
)

const sevikaList = lazy(() =>
  import("../../views/dashboard/admin/SevikaList")
)

const ngoList = lazy(() =>
  import("../../views/dashboard/admin/NgoList")
)
const prescriptionList = lazy(() =>
  import("../../views/dashboard/admin/PrescriptionList")

)
const nonprescriptionList = lazy(() =>
import("../../views/dashboard/admin/NonprescribedList")
)
const screenerList = lazy(() =>
  import("../../views/dashboard/admin/ScreenerList")
)
const pharmacyList = lazy(() =>
  import("../../views/dashboard/admin/PharmacyList")
)

const activeUsers = lazy(() =>
  import("../../views/dashboard/admin/ActiveUsers")
)

const inactiveUsers = lazy(() =>
  import("../../views/dashboard/admin/InactiveUsers")
)

const viewDoctorProfile = lazy(() =>
  import("../../views/dashboard/admin/DoctorProfile")
)

const viewNgoProfile = lazy(() =>
  import("../../views/dashboard/admin/NgoProfile")
)

const viewScreenerProfile = lazy(() =>
  import("../../views/dashboard/admin/ScreenerProfile")
)

const viewPharmacyProfile = lazy(() =>
  import("../../views/dashboard/admin/PharmacyProfile")
)


const addActors = lazy(() =>
  import("../../views/dashboard/admin/AddActors")
)

const issueAddressing = lazy(() =>
  import("../../views/dashboard/admin/IssueAddressing")
)

const issueListAddressed = lazy(() =>
  import("../../views/dashboard/admin/IssueListAddressed")
)

const docEditProfile = lazy(() =>
  import("../../views/dashboard/admin/DocEditProfile")
)

const insights = lazy(() =>
  import("../../views/dashboard/admin/Insights")
)


/**********************End of Javix Admin Section************************** */

//*****************NGO Section****************************** */


const ngoDashboard = lazy(() =>
  import("../../views/dashboard/ngo/NgoDashboard")
)

const mappedScreener = lazy(() =>
  import("../../views/dashboard/ngo/MappedScreener")
)

const unmappedScreener = lazy(() =>
  import("../../views/dashboard/ngo/UnmappedScreener")
)
const mappedDoctor = lazy(() =>
  import("../../views/dashboard/ngo/mappedDoctor")
)

const unmappedDoctor = lazy(() =>
  import("../../views/dashboard/ngo/unmappedDoctor")
)

const mappedSevika = lazy(() =>
  import("../../views/dashboard/ngo/MappedSevika")
)

const unmappedSevika = lazy(() =>
  import("../../views/dashboard/ngo/UnmappedSevika")
)

const ngoViewProfile = lazy(() =>
  import("../../views/dashboard/ngo/ViewProfile")
)

const ngoEditProfile = lazy(() =>
  import("../pages/profile/editprofile/EditProfile")
)

const ngoScreenerProfile = lazy(() =>
  import("../../views/dashboard/ngo/ViewScreenerProfile")
)


/**********************End of NGO Section************************** */

//*****************Screener Section****************************** */

const screenerDashboard = lazy(() =>
  import("../../views/dashboard/screener/ScreenerDashboard")
)

const screenerViewProfile = lazy(() =>
  import("../../views/dashboard/screener/ViewProfile")
)

const citizenProfile = lazy(() =>
  import("../../views/dashboard/screener/CitizenProfile")
)

const screenerProfile = lazy(() =>
  import("../../views/dashboard/screener/EditProfile")
)

const addCitizen = lazy(() =>
  import("../../views/dashboard/screener/AddCitizen")
)

const citizenList = lazy(() =>
  import("../../views/dashboard/screener/CitizenList")
)

const citizenList1 = lazy(() =>
  import("../../views/dashboard/screener/CitizenList1")
)

const detaildump = lazy(() =>
  import("../../views/dashboard/screener/DetailDump")
)
const lipidcritical = lazy(() =>
  import("../../views/dashboard/screener/dailyAndweeklyReports/LipidCritical")
)
const weeklyscreener = lazy(() =>
  import("../../views/dashboard/screener/dailyAndweeklyReports/Weeklyscreener")
)
const weeklyscreenersevika = lazy(() =>
  import("../../views/dashboard/screener/dailyAndweeklyReports/WeeklyScreenerSevika")
)


const editCitizen = lazy(() =>
  import("../../views/dashboard/screener/EditCitizen")
)




/**********************End of Screener Section************************** */



//*****************Sevika Section****************************** */
const sevikaDashboard = lazy(() =>
  import("../../views/dashboard/sevika/SevikaDashboard")
)
const sevikaViewProfile = lazy(() =>
  import("../../views/dashboard/sevika/ViewProfile")
)

const sevikaProfile = lazy(() =>
  import("../../views/dashboard/sevika/EditProfile")
)

const generalProfile = lazy(() =>
  import("../../views/dashboard/survey/generalSurvey")
)
// const healthProfile = lazy(() =>
//   import("../../views/dashboard/survey/healthSurvey")
  
// )
const socieProfile = lazy(() =>
  import("../../views/dashboard/survey/SocieconomicSurvey")
)
//refer patient list by doctor
const referPatient = lazy(() =>
  import("../../views/dashboard/doctor/ReferPatientList")
)

/**********************End of Sevika Section************************** */


//*****************Doctor Section****************************** */
const doctorDashboard = lazy(() =>
  import("../../views/dashboard/doctor/DoctorDashboard")
)
const doctorerViewProfile = lazy(() =>
  import("../../views/dashboard/doctor/ViewProfile")
)
const doctorEditProfile = lazy(() =>
  import("../../views/dashboard/doctor/EditProfile")
)

const patientList = lazy(() =>
  import("../../views/dashboard/doctor/PatientList")
)

const patientTab = lazy(() =>
  import("../../views/dashboard/doctor/PatientTab")
)
const patientTabScreener = lazy(() =>
  import("../../views/dashboard/screener/PatientTabScreener")
)
const addAllergey = lazy(() =>
  import("../../views/dashboard/doctor/AddAllergey")
)
const addHistory = lazy(() =>
  import("../../views/dashboard/doctor/AddHistory")
)

const Encounters = lazy(() =>
  import("../../views/dashboard/doctor/Encounters")
)

const addMedicine = lazy(() =>
  import("../../views/dashboard/doctor/AddMedicine")
)

const caseDetails = lazy(() =>
  import("../../views/dashboard/doctor/CaseDetails")
)
const ScreeningCaseDetails = lazy(() =>
  import("../../views/dashboard/admin/ScreeningCaseDetails")
)
/**********************End of Doctor Section************************** */

//*****************Pharmacy Section****************************** */


const pharmacyDashboard = lazy(() =>
  import("../../views/dashboard/pharmacy/PharmacyDashboard")
)
const pharmacyViewProfile = lazy(() =>
  import("../../views/dashboard/pharmacy/ViewProfile")
)
const pharmacyEditProfile = lazy(() =>
  import("../../views/dashboard/pharmacy/EditProfile")
)
/**********************End of Pharmacy Section************************** */

//*****************Common Section****************************** */

const userDirectory = lazy(() =>
  import("../../views/dashboard/admin/UserDirectory")
)

const advancedScreener = lazy(() =>
  import("../../views/dashboard/admin/Advancescreening")
)
const padvancedScreener = lazy(() =>
  import("./admin/Pendingadvancescreening")
)
const issueListAll = lazy(() =>
  import("../../views/dashboard/admin/IssueList")
)

const issueList = lazy(() =>
  import("../../views/dashboard/admin/UserIssue")
)

const reportIssue = lazy(() =>
  import("../../views/dashboard/admin/ReportIssue")
)
/**********************End of Common Section************************** */



const userList = lazy(() =>
  import("../../views/dashboard/admin/UserList")
)


const commingSoon = lazy(() =>
  import("../../views/dashboard/UnderConstruction")
)



const Example1 = lazy(() =>
  import("../../views/dashboard/ngo/Example1")
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
  
export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userRole:localStorage.getItem("roleId")
    }

  }

  renderSwitch(param) {
    switch(param) {
      case 91:
        return adminDashboard;
      case 1:
          return doctorDashboard;  
      case 2:
          return screenerDashboard;  
      case 21:
          return sevikaDashboard;  
      case 3:
          return ngoDashboard;  
      case 4:
          return pharmacyDashboard;  
      default:
        return Logout;  
    }
  }
    render() {
      
      const {userRole}=this.state
      return (
          <div>
         
            <Router history={history}>
            <Switch>          
              <AppRoute exact path="/views/dashboard/" component={this.renderSwitch(parseInt(userRole))} />
            
             
              
              <AppRoute exact path="/views/dashboard/activeusers/" component={activeUsers} />
              <AppRoute exact path="/views/dashboard/inactiveusers/" component={inactiveUsers} />
              <AppRoute exact path="/views/dashboard/commingsoon/" component={commingSoon} />
             


              <AppRoute exact path="/views/dashboard/mappedscreener/" component={mappedScreener} />
              <AppRoute exact path="/views/dashboard/unmappedscreener/" component={unmappedScreener} />

              <AppRoute exact path="/views/dashboard/mappedsevika" component={mappedSevika} />
              <AppRoute exact path="/views/dashboard/unmappedsevika" component={unmappedSevika} />

              <AppRoute exact path="/views/dashboard/mappedDoctor" component={mappedDoctor} />
              <AppRoute exact path="/views/dashboard/unmappedDoctor" component={unmappedDoctor} />

              <AppRoute exact path="/views/dashboard/screditprofile/" component={screenerProfile} />
              <AppRoute exact path="/views/dashboard/scrviewprofile/" component={screenerViewProfile} />
              <AppRoute exact path="/views/dashboard/screenerlist" component={screenerList} />
              <AppRoute exact path="/views/dashboard/screenerprofile" component={viewScreenerProfile} />
              <AppRoute exact path="/views/dashboard/citizenlist" component={citizenList} />
              <AppRoute exact path="/views/dashboard/citizenlist1" component={citizenList1} />
              <AppRoute exact path="/views/dashboard/detaildump" component={detaildump} />
              <AppRoute exact path="/views/dashboard/editcitizen" component={editCitizen} />
              <AppRoute exact path="/views/dashboard/screener/dailyAndweeklyReports/LipidCritical" component={lipidcritical} />
              <AppRoute exact path="/views/dashboard/screener/dailyAndweeklyReports/Weeklyscreener" component={weeklyscreener} />
              <AppRoute exact path="/views/dashboard/screener/dailyAndweeklyReports/WeeklyScreenerSevika" component={weeklyscreenersevika} />
              
              <AppRoute exact path="/views/dashboard/admin/AdvancedScreening/" component={advancedScreener} />
              <AppRoute exact path="/views/dashboard/admin/PendingadvancedScreening/" component={padvancedScreener} />
                
              <AppRoute exact path="/views/dashboard/doctorlist/" component={doctorList} />
              <AppRoute exact path="/views/dashboard/docviewprofile" component={doctorerViewProfile} />
              <AppRoute exact path="/views/dashboard/doceditprofile" component={doctorEditProfile} />
              <AppRoute exact path="/views/dashboard/doctorprofile" component={viewDoctorProfile} />
              <AppRoute exact path="/views/dashboard/patientlist" component={patientList} />
              <AppRoute exact path="/views/dashboard/patientview" component={patientTab} />
              <AppRoute exact path="/views/dashboard/patientviewscreener" component={patientTabScreener} />
              <AppRoute exact path="/views/dashboard/addallergy" component={addAllergey} />
              <AppRoute exact path="/views/dashboard/addhistory" component={addHistory} />
              <AppRoute exact path="/views/dashboard/encounters" component={Encounters} />
              <AppRoute exact path="/views/dashboard/addmedicine" component={addMedicine} />
              <AppRoute exact path="/views/dashboard/accordian" component={accordion} />
              <AppRoute exact path="/views/dashboard/casedetails" component={caseDetails} />
              <AppRoute exact path="/views/dashboard/admin/ScreeningCaseDetails" component={ScreeningCaseDetails} />
              <AppRoute exact path="/views/dashboard/addactors" component={addActors} />
              <AppRoute exact path="/views/dashboard/citizenprofile" component={citizenProfile} />
              <AppRoute exact path="/views/dashboard/issueaddressing" component={issueAddressing} />
              <AppRoute exact path="/views/dashboard/issuelistalladdressed" component={issueListAddressed} />
              <AppRoute exact path="/views/dashboard/insights" component={insights} />

              
                 

              <AppRoute exact path="/views/dashboard/ngoviewprofile" component={ngoViewProfile} />
              <AppRoute exact path="/views/dashboard/ngoeditwprofile" component={ngoEditProfile} />
              <AppRoute exact path="/views/dashboard/ngoscreenerprofile" component={ngoScreenerProfile} />
              <AppRoute exact path="/views/dashboard/ngolist/" component={ngoList} />
              <AppRoute exact path="/views/dashboard/NonprescriptionList/" component={nonprescriptionList} />
             
              <AppRoute exact path="/views/dashboard/PrescriptionList/" component={prescriptionList} />
              <AppRoute exact path="/views/dashboard/ngoprofile" component={viewNgoProfile} />

              
              <AppRoute exact path="/views/dashboard/pharmacyviewprofile" component={pharmacyViewProfile} />
              <AppRoute exact path="/views/dashboard/pharmacyeditprofile" component={pharmacyEditProfile} />
              <AppRoute exact path="/views/dashboard/pharmacylist" component={pharmacyList} />
              <AppRoute exact path="/views/dashboard/pharmacyprofile" component={viewPharmacyProfile} />

              
              <AppRoute exact path="/views/dashboard/seveditprofile/" component={sevikaProfile} />
              <AppRoute exact path="/views/dashboard/sevviewprofile/" component={sevikaViewProfile} />
              
              <AppRoute exact path="/views/dashboard/survey/generalSurvey" component={generalProfile} />
              {/* <AppRoute exact path="/views/dashboard/survey/healthSurvey" component={healthProfile} /> */}
              <AppRoute exact path="/views/dashboard/survey/SocieconomicSurvey" component={socieProfile} />
              <AppRoute exact path="/views/dashboard/doctor/ReferPatientList" component={referPatient} />
              

              <AppRoute exact path="/views/dashboard/directory/" component={userDirectory} />             
              <AppRoute exact path="/views/dashboard/reportissue/" component={reportIssue} />
              <AppRoute exact path="/views/dashboard/issuelistall/" component={issueListAll} />
              <AppRoute exact path="/views/dashboard/issuelist" component={issueList} />

              <AppRoute exact path="/views/dashboard/addcitizen/" component={addCitizen} />
              <AppRoute exact path="/views/dashboard/citizenlist" component={citizenList} />
              <AppRoute exact path="/views/dashboard/citizenlist1" component={citizenList1} />
              <AppRoute exact path="/views/dashboard/detaildump" component={detaildump} />
              <AppRoute exact path="/views/dashboard/sevikalist" component={sevikaList} />

              <AppRoute exact path="/views/dashboard/doceupdateprofile" component={docEditProfile} />
              
              

              <AppRoute exact path="/views/dashboard/customtable" component={myCustomTable} />
              
              
              
             </Switch>
             </Router>
          </div>
      )
    }
}