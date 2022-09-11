import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  CardImg,
  Button,
  Progress,
} from "reactstrap";
import SalesCard from "./SalesCard";
//import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
//import OrdersReceived from "../../ui-elements/cards/statistics/OrdersReceived"
//import AvgSession from "../../ui-elements/cards/analytics/AvgSessions"
//import SupportTracker from "../../ui-elements/cards/analytics/SupportTracker"
//import ProductOrders from "../../ui-elements/cards/analytics/ProductOrders"
//import SalesStat from "../../ui-elements/cards/analytics/Sales"
//import ActivityTimeline from "./ActivityTimeline"
//import DispatchedOrders from "./DispatchedOrders"
import "../../../assets/scss/pages/dashboard-analytics.scss";
import PieChart from "../../charts/chart-js/PieChart";
import BarChart from "../../charts/chart-js/BarChart";
import Chart from "react-apexcharts";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import loaderImg from "../../images/loader.gif";
import profileImg from "../../../assets/img/icons/viewprofile.png";
import pickImg from "../../../assets/img/icons/activate.png";
import DataTable from "react-data-table-component";
import { Star, Search } from "react-feather";
import InsightsTable from "./insightsTable";
// import { CsvToHtmlTable } from "react-csv-to-table";
// import { request } from "request";

//Pie Chart Section
let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;



const $primary = "#28C76F",
  $success = "#FFBF00",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $label_color = "#1E1E1E";
const themeColors = [$primary, $success, $danger, $warning, $label_color];

//End of Pie Chart

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new"></div>
      <div className="row">
        <div className="col-sm-3">
          <div className="position-relative has-icon-left mb-1">
            <Input
              value={props.value.firstName}
              placeholder="search by name"
              onChange={(e) => props.handleFilter(e)}
            />
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="position-relative has-icon-left mb-1">
        
            <Input
              value={props.value.mobile}
              placeholder="search by mobile"
              onChange={(e) => props.handleFilter(e)}
            />
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="position-relative has-icon-left mb-1">
        
            <Input
              value={props.value.sex}
              placeholder="search by Gender"
              onChange={(e) => props.handleFilter(e)}
            />
             
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="position-relative has-icon-left mb-1">
              <Input
          type="text"
          value={props.value.issubscreener > 0 ? "Sevika" : "Sanyojika"}
          placeholder="select Role"
          id="vesselName"
          o onChange={(e) => props.handleFilter(e)}
        >
           {/* <option >select Role</option> 
          <option/>
          <option value="Sevika">Sevika</option>
          <option value="Sanyojika">Sanyojika</option> */}
         </Input> 
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="position-relative has-icon-left mb-1">
            <Input
              value={props.value.createdAt}
              // type="date"
              placeholder="search by date"
              onChange={(e) => props.handleFilter(e)}
            />
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <div className="position-relative has-icon-left mb-1">
            <Input
              value={props.value.age}
              // type="date"
              placeholder="search by age"
              onChange={(e) => props.handleFilter(e)}
            />
            <div className="form-control-position">
              <Search size="15" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="position-relative has-icon-left mb-1">
        <Input
          value={props.value}
          placeholder="search"
          onChange={(e) => props.handleFilter(e)}
        />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div> */}
    </div>
  );
};

class AdminDashboard extends React.Component {
 

  clearAllFilter() {
    nameFilter("");
    priceFilter("");
    originFilter("");
    stockFilter("");
  }




  constructor(props) {
    super(props);

    // console.log("------*********-------",props.value.issubscreener);
    this.state = {
      severity_bp_default: "",
      severity_bp_green: "10",
      severity_bp_amber: "12",
      severity_bp_red: "45",
      severity_spo2_default: "",
      severity_spo2_green: "10",
      severity_spo2_amber: "12",
      severity_spo2_red: "45",
      severity_temp_default: "",
      severity_temp_green: "10",
      severity_temp_amber: "12",
      severity_temp_red: "45",
      severity_hr_default: "",
      severity_hr_green: "10",
      severity_hr_amber: "12",
      severity_hr_red: "45",
      severity_bmi_default: "",
      severity_bmi_green: "10",
      severity_bmi_amber: "12",
      severity_bmi_red: "45",

      severity_glucose_default: "",
      severity_glucose_green: "10",
      severity_glucose_amber: "12",
      severity_glucose_red: "45",

      severity_hemo_default: "",
      severity_hemo_green: "10",
      severity_hemo_amber: "12",
      severity_hemo_red: "20",
      // severity_hemo_yellow: "45",

      severity_ldl_default: "",
      severity_ldl_green: "10",
      severity_ldl_amber: "12",
      severity_ldl_red: "45",

      severity_hdl_default: "",
      severity_hdl_green: "10",
      severity_hdl_amber: "12",
      severity_hdl_red: "45",

      severity_tri_default: "",
      severity_tri_green: "10",
      severity_tri_amber: "12",
      severity_tri_red: "45",

      severity_chol_default: "",
      severity_chol_green: "10",
      severity_chol_amber: "12",
      severity_chol_red: "45",

      severity_leye_default: "",
      severity_leye_green: "10",
      severity_leye_amber: "12",
      severity_leye_red: "45",

      severity_reye_default: "",
      severity_reye_green: "10",
      severity_reye_amber: "12",
      severity_reye_red: "45",
      tabledailyScreeningScreener: "",
      tableweeklyScreeningScreener: "",
      tabledailyScreeningSevika: "",
      tableweeklyScreeningSevika: "",

      loader: (
        <h2 align="center">
          <img src={loaderImg} width="400px" height="300px"></img>
        </h2>
      ),
      imagurl: "",
      action: { 0: "New Issue", 1: "Assigned", 2: "Resoved", 3: "Closed" },
      columns: [
        {
          name: "Screener Name",
          selector: (row) => row.firstName + " " + row.lastName,
          sortable: true,
          cell: (row) => (
            <button
              className="btn-success"
              onClick={() => this.getCitizenScreener(row.screenerId)}
            >
              {row.firstName + " " + row.lastName}
            </button>
          ),
        },
        {
          name: "Mobile",
          selector: (row) => row.mobile,
          sortable: true,
          cell: (row) => <p className="text-bold-500 mb-0">{row.mobile}</p>,
        },
        {
          name: "New Citizens",
          selector: (row) => row.numOfCitizens,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.numOfCitizens}</p>
          ),
        },
        {
          name: "Total Cases",
          selector: (row) => row.numOfCases,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.numOfCases}</p>
          ),
        },
        {
          name: "SE Surveys",
          selector: (row) => row.numOfSocioEconomicSurveys,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">
              {row.numOfSocioEconomicSurveys}
            </p>
          ),
        },
        {
          name: "G Surveys",
          selector: (row) => row.numOfGeneralSurveys,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.numOfGeneralSurveys}</p>
          ),
        },
        {
          name: "H Surveys",
          selector: (row) => row.numOfHealthSurveys,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.numOfHealthSurveys}</p>
          ),
        },
        {
          name: "Gender",
          selector: (row) => row.sex,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.sex}</p>
          ),
        },
        {
          name: "Age",
          selector: (row) => row.age,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.age}</p>
          ),
        },
        {
          name: "Date",
          selector: (row) => row.createdAt,
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500  mb-0">{row.createdAt}</p>
          ),
        },
        {
          name: "Role",
          selector: (row) => row.issubscreener,
          sortable: true,
          
          cell: (row) => (
            <p className="text-bold-500  mb-0">
              {/* {row.issubscreener > 0 ? "Sevika" : "Sanyojika"} */}
            </p>
          ),
        },
      ],
      data: [],
      filteredData: [],
      value: "",
      recs: [],
    };
    this.loadRecs = this.loadRecs.bind(this);
  }
  loadRecs(recs) {
    this.setState({ data: recs });
    console.log(this.state.recs);
    this.setState({ loader: null });
  }

  getCitizenScreener(_screenerId) {
    localStorage.setItem("_screenerId", _screenerId);
    document.location = "/citizenlist1";
  }

  getDumpPage() {
    document.location = "/detaildump";
  }

  getImage(imagUrl) {
    if (imagUrl === null || imagUrl === undefined || imagUrl === "") {
      imagUrl = "http://159.65.148.197:3001/profile/no-photo-male.jpg";
    }
    return imagUrl;
  }

  componentDidMount() {
    console.log("DID MOUNT ************");
    this.mounted = true;
    
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bp: "0",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_bp_green: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/labtest/getBloodGlucoseTestCount")
      .then((response) => {
        console.log("Checking......................................");
        console.dir(response.data.data.data);

        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_glucose_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_glucose_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_glucose_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/labtest/getHemoglobinCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 3)
            var test1 = response.data.data.data[i].count;
              // this.setState({
              //   severity_hemo_yellow: response.data.data.data[i].count,
              // });
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_hemo_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
            var test2 = response.data.data.data[i].count;
              // this.setState({
              //   severity_hemo_amber: response.data.data.data[i].count,
              // });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_hemo_green: response.data.data.data[i].count,
              });
          }
          var test3 = test1 + test2;
          if (test3 !='')
            //var test2 = response.data.data.data[i].count;
              this.setState({
                severity_hemo_amber: test3,
              });
              // console.log(severity_hemo_amber, 'jjjjjjjjjjjjjjjjjj');
          console.log(test3, 'yyyyyyyyyyyyyyyyyy');
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    //Lipid Segment

    axios
      .post("http://159.65.148.197:3001/api/labtest/getCholestCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_chol_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_chol_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_chol_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/labtest/gettriCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_tri_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_tri_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_tri_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
    axios
      .post("http://159.65.148.197:3001/api/labtest/gethdlCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_hdl_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_hdl_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_hdl_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/labtest/getldlCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_ldl_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_ldl_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_ldl_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    ///End Lipid

    axios
      .post("http://159.65.148.197:3001/api/labtest/getREyeCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_reye_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_reye_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_reye_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/labtest/getLEyeCount")
      .then((response) => {
        if (response.data.status === 1) {
          for (var i = 0; i < response.data.data.data.length; i++) {
            if (response.data.data.data[i]._id === 2)
              this.setState({
                severity_leye_red: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 1)
              this.setState({
                severity_leye_amber: response.data.data.data[i].count,
              });
            if (response.data.data.data[i]._id === 0)
              this.setState({
                severity_leye_green: response.data.data.data[i].count,
              });
          }
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/ngo/screenerList?=", {
        token: "dfjkhsdfaksjfh3756237",
        userId: "demoUser",
      })
      .then((response) => {
        console.log("Returned data:", response.data.status);
        console.log("User MasterId=" + localStorage.getItem("usermasid"));
        if (response.data.status === 1) {
          var msg = response.data.message;
          var recs = response.data.data.data;

          this.loadRecs(recs);
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bp: "1",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_bp_amber: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bp: "2",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({ severity_bp_red: response.data.data.data[0].count });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    //SPO2

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_spo2: "0",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_spo2_green: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_spo2: "1",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_spo2_amber: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_spo2: "2",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_spo2_red: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    //Temperature

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_temperature: "0",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_temp_green: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_temperature: "1",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_temp_amber: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_temperature: "2",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_temp_red: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    // Heart Rate

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_pulse: "0",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_hr_green: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_pulse: "1",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_hr_amber: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_pulse: "2",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({ severity_hr_red: response.data.data.data[0].count });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bmi: "0",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_bmi_green: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });

  // ================daily reports===========
axios.get('http://159.65.148.197:3001/documents/dailyScreeningScreener.csv')
   .then(response => {

        this.setState({tabledailyScreeningScreener:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://159.65.148.197:3001/documents/weeklyScreeningScreener.csv')
   .then(response => {

        this.setState({tableweeklyScreeningScreener:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://159.65.148.197:3001/documents/dailyScreeningSevika.csv')
   .then(response => {

        this.setState({tabledailyScreeningSevika:response.data});
        
   })
   .catch(e=>{
   
  });

axios.get('http://159.65.148.197:3001/documents/weeklyScreeningSevika.csv')
   .then(response => {

        this.setState({tableweeklyScreeningSevika:response.data});
        
   })
   .catch(e=>{
   
  });


    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bmi: "1",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({
            severity_bmi_amber: response.data.data.data[0].count,
          });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });


      
    axios
      .post("http://159.65.148.197:3001/api/screening/getCount", {
        severity_bmi: "2",
      })
      .then((response) => {
        console.dir(response.data.data.data[0].count);

        if (response.data.status === 1) {
          //console.dir(recs)
          this.setState({ severity_bmi_red: response.data.data.data[0].count });
        } else {
          console.log("Not Found");
        }
      })
      .catch((e) => {
        console.log("Exception:");
        console.log(e.response.data);
        if (e.response.data.status === 0) {
          this.state.notfound = 0;
        }
      });
// =============================================================
      axios.post('http://159.65.148.197:3001/api/labtest/getBloodGlucoseTestList', {severity:0})
      .then(response => {
   
            console.dir("Data Length=" + response.data.data.data.length)
            if(response.data.status===1){
             this.setState({green:response.data.data.data.length}) 
            }
           
           
           
      })
      .catch(e=>{
       console.log("Exception:"); 
       console.log(e.response.data);
       if(e.response.data.status===0){
         this.state.notfound=0
   
       }
     });


    //  ======================================================
    axios.post('http://159.65.148.197:3001/api/labtest/getBloodGlucoseTestList', {severity:'1' })
    .then(response => {
  
          console.dir("Data Length=" + response.data.data.data.length)
          if(response.data.status===1){
           this.setState({amber:response.data.data.data.length}) 
          }
         
         
         
    })
    .catch(e=>{
     console.log("Exception:"); 
     console.log(e.response.data);
     if(e.response.data.status===0){
       this.state.notfound=0
  
     }
   });



  //  =========================================================================

  axios.post('http://159.65.148.197:3001/api/labtest/getBloodGlucoseTestList', { severity:'2' })
  .then(response => {

        console.dir("Data Length=" + response.data.data.data.length)
        if(response.data.status===1){
         this.setState({red:response.data.data.data.length}) 
        }
       
       
       
  })
  .catch(e=>{
   console.log("Exception:"); 
   console.log(e.response.data);
   if(e.response.data.status===0){
     this.state.notfound=0

   }
 });

    }
  handleFilter = (e) => {
    let value = e.target.value;
    let data = this.state.data;
    let filteredData = this.state.filteredData;
    this.setState({ value });

    if (value.length) {
      filteredData = data.filter((item) => {
        console.dir(item.userId);
        
        let startsWithCondition =
          item.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.lastName.toLowerCase().startsWith(value.toLowerCase()) ||
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) 
          ||
          item.sex.toLowerCase().startsWith(value.toLowerCase())
            ||
            item.createdAt.toLowerCase().startsWith(value.toLowerCase())
            ||
           item.age.toString().toLowerCase().startsWith(value.toLowerCase())||
          item.issubscreener === 0 ? "Sevika" : "Sanyojika".toString().toLowerCase().startsWith(value.toLowerCase())


        //  item.issubscreener.filter((item) => item.issubscreener > 0 ? "Sevika" : "Sanyojika")
      //  item.issubscreener > 0 ? "Sevika" : "Sanyojika".toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;

          //  item.sex === "male" ? "male" : "female".toLowerCase().startsWith(value.toLowerCase())


        let includesCondition =
          item.firstName.toLowerCase().includes(value.toLowerCase()) ||
          item.lastName.toLowerCase().includes(value.toLowerCase()) ||
          item.mobile.toLowerCase().startsWith(value.toLowerCase()) 
           ||
           item.sex.toLowerCase().startsWith(value.toLowerCase()) 
          ||
          item.createdAt.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toString().toLowerCase().startsWith(value.toLowerCase())||
          item.issubscreener === 0 ? "Sevika" : "Sanyojika".toString().toLowerCase().startsWith(value.toLowerCase())



        //  item.issubscreener === 0 ? "Sevika" : "Sanyojika".toString().toLowerCase().indexOf(value.toString().toLowerCase()) > -1;
      //  item.sex === "male" ? "male " : "female".toLowerCase().startsWith(value.toLowerCase())
     
        //  item.numOfHealthSurveys.toLowerCase().startsWith(value.toLowerCase());
        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });

      this.setState({ filteredData });
    }
  };
  
 
  getCaseDetails(severity){
    if(severity==="green"){
      // localStorage.setItem("_status","0");
      localStorage.setItem("caseType","green")
      document.location="/dashboard/BloodGlucoseGreen";
    }else if(severity=="amber"){
    //  localStorage.setItem("_status","1");
     localStorage.setItem("caseType","amber")
     document.location="/dashboard/BloodGlucoseAmber";
    }
    else if(severity=="red"){
    //  localStorage.setItem("_status","2");
     localStorage.setItem("caseType","red")
     document.location="/dashboard/BloodGlucoseRed";
    }
}



  render() {
    let { data, columns, value, filteredData } = this.state;
    const data_bp = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_bp_green,
            this.state.severity_bp_amber,
            this.state.severity_bp_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_spo2 = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_spo2_green,
            this.state.severity_spo2_amber,
            this.state.severity_spo2_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };
    const data_temp = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_temp_green,
            this.state.severity_temp_amber,
            this.state.severity_temp_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };
    const data_hr = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_hr_green,
            this.state.severity_hr_amber,
            this.state.severity_hr_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };
    const data_bmi = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_bmi_green,
            this.state.severity_bmi_amber,
            this.state.severity_bmi_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_glucose = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_glucose_green,
            this.state.severity_glucose_amber,
            this.state.severity_glucose_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_hemo = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_hemo_green,
            this.state.severity_hemo_amber,
            this.state.severity_hemo_red,
            // this.state.severity_hemo_yellow,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_chol = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_chol_green,
            this.state.severity_chol_amber,
            this.state.severity_chol_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_tri = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_tri_green,
            this.state.severity_tri_amber,
            this.state.severity_tri_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_hdl = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_hdl_green,
            this.state.severity_hdl_amber,
            this.state.severity_hdl_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_ldl = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_ldl_green,
            this.state.severity_ldl_amber,
            this.state.severity_ldl_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_reye = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_reye_green,
            this.state.severity_reye_amber,
            this.state.severity_reye_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const data_leye = {
      labels: ["Green", "Amber", "Red"],
      datasets: [
        {
          label: "Total Actors Count",
          data: [
            this.state.severity_leye_green,
            this.state.severity_leye_amber,
            this.state.severity_leye_red,
          ],
          backgroundColor: themeColors,
        },
      ],
    };

    const series = [
      {
        name: "Green",
        data: [this.state.severity_bp_green],
      },
      {
        name: "Amber",
        data: [this.state.severity_bp_amber],
      },
      {
        name: "Red",
        data: [this.state.severity_bp_red],
      },
    ];

    const options = {
      responsive: true,
      responsiveAnimationDuration: 500,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Javix Users",
      },
    };

    return (
      <React.Fragment>
        <Row className="match-height">
          <Col>
            <SalesCard />
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_bp} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bpRed.csv"
                  target="_blank"
                >
                  {" "}
                  BP Red Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bpAmber.csv"
                  target="_blank"
                >
                  {" "}
                  BP Amber Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bpGreen.csv"
                  target="_blank"
                >
                  {" "}
                  BP Green Cases{" "}
                </a>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>SPO2</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_spo2} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/spo2Red.csv"
                  target="_blank"
                >
                  {" "}
                  SPO2 Red Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/spo2Amber.csv"
                  target="_blank"
                >
                  {" "}
                  SPO2 Amber Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/spo2Green.csv"
                  target="_blank"
                >
                  {" "}
                  SPO2 Green Cases{" "}
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Temperature</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_temp} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/temperatureRed.csv"
                  target="_blank"
                >
                  {" "}
                  TEMP Red Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/temperatureAmber.csv"
                  target="_blank"
                >
                  {" "}
                  TEMP Amber Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/temperatureGreen.csv"
                  target="_blank"
                >
                  {" "}
                  TEMP Green Cases{" "}
                </a>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Heart Rate</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_hr} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/pulseRed.csv"
                  target="_blank"
                >
                  {" "}
                  HEART RATE Red Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/pulseAmber.csv"
                  target="_blank"
                >
                  {" "}
                  HEART RATE Amber Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/pulseGreen.csv"
                  target="_blank"
                >
                  {" "}
                  HEART RATE Red Cases{" "}
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>BMI</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_bmi} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bmiRed.csv"
                  target="_blank"
                >
                  {" "}
                  BMI Red Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bmiAmber.csv"
                  target="_blank"
                >
                  {" "}
                  BMI Amber Cases{" "}
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/bmiGreen.csv"
                  target="_blank"
                >
                  {" "}
                  BMI Green Cases{" "}
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Blood Glucose</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_glucose} options={options} height={300} />
              </CardBody>
              <CardBody>
                <a
                onClick={() =>this.getCaseDetails("green")}
                  // target="_blank"
                  style={{color:"blue"}}
                >
                  {" "}
                  Blood Glucose green Cases{" "}
                </a>
                </CardBody>
                <CardBody>
                <a
                onClick={() =>this.getCaseDetails("red")}
                  // target="_blank"
                  style={{color:"blue"}}
                >
                  {" "}
                  Blood Glucose red Cases{" "}
                </a>
                </CardBody>
                <CardBody>
                <a
                onClick={() =>this.getCaseDetails("amber")}
                  // target="_blank"
                  style={{color:"blue"}}
                >
                  {" "}
                  Blood Glucose Amber Cases{" "}
                </a>
                </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>LDL-Lipid Panel</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_ldl} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>HDL-Lipid Panel</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_hdl} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Triglycerides-Lipid Panel</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_tri} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Cholesterol-Lipid Panel</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_chol} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>
       
    
        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Right Eye Tests</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_reye} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Left Eye Tests</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_leye} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="match-height" style={{ textAlign: "center" }}>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Hemoglobins</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie data={data_hemo} options={options} height={300} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle>Survey Data Dump</CardTitle>
              </CardHeader>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/dump.csv"
                  target="_blank"
                >
                  General Survey
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/dumpHealth.csv"
                  target="_blank"
                >
                  Health Survey
                </a>
              </CardBody>
              <CardBody>
                <a
                  href="http://159.65.148.197:3001/documents/dumpSocio.csv"
                  target="_blank"
                >
                  SocioEconomic Survey
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle className="col d-flex justify-content-center">
                  {" "}
                  Daily and Weekly Reports
                </CardTitle>
              </CardHeader>
              <Button className="bg-color" onClick={() => this.getDumpPage()}>
                {" "}
                Click to Access{" "}
              </Button>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm="12">
            {/* <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
              columns={columns}
              noDataComponent={""}
              noHeader
              pagination
              subHeader
              subHeaderComponent={ 
               <CustomHeader value={value} handleFilter={this.handleFilter} />
              //  <CustomHeader value={value} handleFilter={this.handleFilter1} />
            }
             /> */}
                
         <InsightsTable/>
         <div>
  
      </div>

          </Col>
          <Col sm="12">{this.state.recs.length != 0 || this.state.loader}</Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
