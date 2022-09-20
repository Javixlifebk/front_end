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
  // import("../../views/dashboard/admin/DoctorList")
  import("../dashboard/admin/DoctorList")
)

const sevikaList = lazy(() =>
  import("../dashboard/admin/SevikaList")
)

const ngoList = lazy(() =>
  import("../dashboard/admin/NgoList")
)
const prescriptionList = lazy(() =>
  import("../dashboard/admin/PrescriptionList")
  // import("../../views/dashboard/admin/PrescriptionList")

)
const nonprescriptionList = lazy(() =>
import("../../views/dashboard/admin/NonprescribedList")
)
const screenerList = lazy(() =>
  import("../dashboard/admin/ScreenerList")
)
const pharmacyList = lazy(() =>
  import("../dashboard/admin/PharmacyList")
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

const BloodGlucoseGreen = lazy(() =>
  import("../../views/dashboard/admin/BloodGlucoseGreen")
)
const BloodGlucoseAmber = lazy(() =>
  import("../../views/dashboard/admin/BloodGlucoseAmber")
)
const BloodGlucoseRed = lazy(() =>
  import("../../views/dashboard/admin/BloodGlucoseRed")
)

const ldlLipidPanelRed = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelLdlRed")
)
const ldlLipidPanelGreen = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelLdlGreen")
)
const ldlLipidPanelAmber = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelLdlAmber")
)

const hdlLipidPanelRed = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelHdlRed")
)
const hdlLipidPanelGreen = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelHdlGreen")
)
const hdlLipidPanelAmber = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelHdlAmber")
)

const triglyLipidPanelRed = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPaneltriglyRed")
)
const triglyLipidPanelGreen = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPaneltriglyGreen")
)
const triglyLipidPanelAmber = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPaneltriglyAmber")
)

const cholesterolLipidPanelRed = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelcholesterolRed")
)
const cholesterolLipidPanelGreen = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelcholesterolGreen")
)
const cholesterolLipidPanelAmber = lazy(() =>
  import("../../views/dashboard/admin/lipid-test-report/LipidPanelcholesterolAmber")
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
  // import("../../views/dashboard/screener/CitizenList")
  import("../dashboard/screener/CitizenList")
)

const citizenList1 = lazy(() =>
  import("../../views/dashboard/screener/CitizenList1")
)
const citizenList2 = lazy(() =>
  import("../dashboard/screener/CitizenList")
)
const detaildump = lazy(() =>
  import("../../views/dashboard/screener/DetailDump")
)
const lipidcritical = lazy(() =>
 import("../../views/dashboard/screener/dailyAndweeklyReports/LipidCritical")
  // import("../../views/dashboard/screener/dailyAndweeklyReports/LipidCritical")
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
const healthProfile = lazy(() =>
  import("../../views/dashboard/survey/HealthSurvey")
  
)
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
  // import("../../views/dashboard/doctor/Encounters")
  import("../dashboard/doctor/Encounters")
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
const sevikaCaseDetails = lazy(() =>
  import("../../views/dashboard/admin/sevikaCaselist")
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
              <AppRoute exact path="/dashboard/" component={this.renderSwitch(parseInt(userRole))} />
            
             
              
              <AppRoute exact path="/dashboard/admin/activeusers/" component={activeUsers} />
              <AppRoute exact path="/dashboard/admin/inactiveusers/" component={inactiveUsers} />
              <AppRoute exact path="/dashboard/commingsoon/" component={commingSoon} />
             


              <AppRoute exact path="/mappedscreener/" component={mappedScreener} />
              <AppRoute exact path="/unmappedscreener/" component={unmappedScreener} />

              <AppRoute exact path="/mappedsevika" component={mappedSevika} />
              <AppRoute exact path="/unmappedsevika" component={unmappedSevika} />

              <AppRoute exact path="/mappedDoctor" component={mappedDoctor} />
              <AppRoute exact path="/unmappedDoctor" component={unmappedDoctor} />

              <AppRoute exact path="/screditprofile/" component={screenerProfile} />
              <AppRoute exact path="/scrviewprofile/" component={screenerViewProfile} />
              <AppRoute exact path="/dashboard/admin/screenerlist" component={screenerList} />
              <AppRoute exact path="/dashboard/admin/screenerprofile" component={viewScreenerProfile} />
              <AppRoute exact path="/dashboard/citizenlist" component={citizenList} />
              <AppRoute exact path="/dashboard/citizenlist1" component={citizenList1} />
              <AppRoute exact path="/dashboard/detaildump" component={detaildump} />
              <AppRoute exact path="/dashboard/editcitizen" component={editCitizen} />
              <AppRoute exact path="/screener/dailyAndweeklyReports/LipidCritical" component={lipidcritical} />
              <AppRoute exact path="/screener/dailyAndweeklyReports/Weeklyscreener" component={weeklyscreener} />
              <AppRoute exact path="/screener/dailyAndweeklyReports/WeeklyScreenerSevika" component={weeklyscreenersevika} />
              <AppRoute exact path="/dashboard/admin/sevikaCaselist" component={sevikaCaseDetails} />
              
              <AppRoute exact path="/dashboard/admin/AdvancedScreening/" component={advancedScreener} />
              <AppRoute exact path="/dashboard/admin/PendingadvancedScreening/" component={padvancedScreener} />
                
              <AppRoute exact path="/dashboard/admin/doctorlist/" component={doctorList} />
              <AppRoute exact path="/docviewprofile" component={doctorerViewProfile} />
              <AppRoute exact path="/doceditprofile" component={doctorEditProfile} />
              <AppRoute exact path="/dashboard/admin/doctorprofile" component={viewDoctorProfile} />
              <AppRoute exact path="/dashboard/doctor/patientlist" component={patientList} />
              <AppRoute exact path="/dashboard/patientview" component={patientTab} />
              <AppRoute exact path="/dashboard/patientviewscreener" component={patientTabScreener} />
              <AppRoute exact path="/addallergy" component={addAllergey} />
              <AppRoute exact path="/addhistory" component={addHistory} />
              <AppRoute exact path="/encounters" component={Encounters} />
              <AppRoute exact path="/addmedicine" component={addMedicine} />
              <AppRoute exact path="/accordian" component={accordion} />
              <AppRoute exact path="/dashboard/casedetails" component={caseDetails} />
              <AppRoute exact path="/admin/ScreeningCaseDetails" component={ScreeningCaseDetails} />
              <AppRoute exact path="/dashboard/add-actors" component={addActors} />
              <AppRoute exact path="/dashboard/citizenprofile" component={citizenProfile} />
              <AppRoute exact path="/dashboard/admin/issueaddressing" component={issueAddressing} />
              <AppRoute exact path="/dashboard/admin/issuelistalladdressed" component={issueListAddressed} />
              <AppRoute exact path="/dashboard/insights" component={insights} />

              <AppRoute exact path="/dashboard/BloodGlucoseGreen" component={BloodGlucoseGreen} />
              <AppRoute exact path="/dashboard/BloodGlucoseAmber" component={BloodGlucoseAmber} />
              <AppRoute exact path="/dashboard/BloodGlucoseRed" component={BloodGlucoseRed} />

              <AppRoute exact path="/dashboard/LipidPanelLdlGreen" component={ldlLipidPanelGreen} />
              <AppRoute exact path="/dashboard/LipidPanelLdlRed" component={ldlLipidPanelRed} />
              <AppRoute exact path="/dashboard/LipidPanelLdlAmber" component={ldlLipidPanelAmber} />

              <AppRoute exact path="/dashboard/LipidPanelHdlGreen" component={hdlLipidPanelGreen} />
              <AppRoute exact path="/dashboard/LipidPanelHdlRed" component={hdlLipidPanelRed} />
              <AppRoute exact path="/dashboard/LipidPanelHdlAmber" component={hdlLipidPanelAmber} />

              <AppRoute exact path="/dashboard/LipidPaneltriglyGreen" component={triglyLipidPanelGreen} />
              <AppRoute exact path="/dashboard/LipidPaneltriglyRed" component={triglyLipidPanelRed} />
              <AppRoute exact path="/dashboard/LipidPaneltriglyAmber" component={triglyLipidPanelAmber} />

              <AppRoute exact path="/dashboard/LipidPanelcholesterolGreen" component={cholesterolLipidPanelGreen} />
              <AppRoute exact path="/dashboard/LipidPanelcholesterolRed" component={cholesterolLipidPanelRed} />
              <AppRoute exact path="/dashboard/LipidPanelcholesterolAmber" component={cholesterolLipidPanelAmber} />

             


              
                 

              <AppRoute exact path="/ngoviewprofile" component={ngoViewProfile} />
              <AppRoute exact path="/ngoeditwprofile" component={ngoEditProfile} />
              <AppRoute exact path="/dashboard/ngoscreenerprofile" component={ngoScreenerProfile} />
              <AppRoute exact path="/dashboard/admin/ngolist/" component={ngoList} />
              <AppRoute exact path="/dashboard/admin/nonprescriptionList/" component={nonprescriptionList} />
             
              <AppRoute exact path="/dashboard/admin/prescriptionList/" component={prescriptionList} />
              <AppRoute exact path="/dashboard/admin/ngoprofile" component={viewNgoProfile} />

              
              <AppRoute exact path="/pharmacyviewprofile" component={pharmacyViewProfile} />
              <AppRoute exact path="/pharmacyeditprofile" component={pharmacyEditProfile} />
              <AppRoute exact path="/dashboard/pharmacylist" component={pharmacyList} />
              <AppRoute exact path="/pharmacyprofile" component={viewPharmacyProfile} />

              
              <AppRoute exact path="/seveditprofile/" component={sevikaProfile} />
              <AppRoute exact path="/sevviewprofile/" component={sevikaViewProfile} />
              
              <AppRoute exact path="/dashboard/survey/generalSurvey" component={generalProfile} />
              <AppRoute exact path="/dashboard/survey/HealthSurvey" component={healthProfile} />
              <AppRoute exact path="/dashboard/survey/SocieconomicSurvey" component={socieProfile} />
              <AppRoute exact path="/dashboard/doctor/ReferPatientList" component={referPatient} />
              

              <AppRoute exact path="/directory/" component={userDirectory} />             
              <AppRoute exact path="/dashboard/reportissue/" component={reportIssue} />
              <AppRoute exact path="/dashboard/admin/issuelistall/" component={issueListAll} />
              <AppRoute exact path="/dashboard/issuelist" component={issueList} />

              <AppRoute exact path="/dashboard/addcitizen/" component={addCitizen} />
              <AppRoute exact path="/dashboard/citizenlist" component={citizenList} />
              <AppRoute exact path="/dashboard/citizenlist1" component={citizenList1} />
              <AppRoute exact path="/dashboard/detaildump" component={detaildump} />
              <AppRoute exact path="/dashboard/sevikalist" component={sevikaList} />

              <AppRoute exact path="/dashboard/admin/doceupdateprofile" component={docEditProfile} />
              
              

              <AppRoute exact path="/customtable" component={myCustomTable} />
              
              
              
             </Switch>
             </Router>
          </div>
      )
    }
}