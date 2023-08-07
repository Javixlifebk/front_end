import React from "react"
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    FormGroup,
    Label,
    Badge,
    Input,
    Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Star, Search} from "react-feather"
import axios from "axios";
import loaderImg from "../../images/loader.gif"
import profileImg from "../../../assets/img/icons/viewprofile.png"
import pickImg from "../../../assets/img/icons/activate.png"
import {CsvToHtmlTable} from 'react-csv-to-table';
import './App.css';
// import DailyWeeklyReports from "./dailyAndweeklyReports/dailyWeeklyReports";


const CustomHeader = props => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <div className="add-new"></div>
            <div className="position-relative has-icon-left mb-1">
                <Input value={
                        props.value
                    }
                    placeholder="search"
                    onChange={
                        e => props.handleFilter(e)
                    }/>
                <div className="form-control-position">
                    <Search size="15"/>
                </div>
            </div>
        </div>
    )
}

class JTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: <h2 align='center'>
                <img src={loaderImg}
                    width='400px'
                    height='300px'></img>
            </h2>,
            imagurl: '',
            action: {
                "0": "New Issue",
                "1": "Assigned",
                "2": "Resoved",
                "3": "Closed"
            },
            gsearch: "",
            tabledailyScreeningScreener: '',
            tableweeklyScreeningScreener: '',
            tabledailyScreeningSevika: '',
            tableweeklyScreeningSevika: '',
            tabledailyCitizens: '',
            tabledailyCitizenDetails: '',
            tableweeklyCitizens: '',
            tableweeklyCitizenDetails: '',
            tablelipidCriticalCitizens: '',
            tableunscreened: '',
            tablegeneral: '',
            tablehealth: '',
            tablesocio: '',
            columns: [
                {
                    name: "Citizen",
                    selector: "ID",
                    sortable: true,
                    style: {
                        'whiteSpace': 'unset'
                    },
                    minWidth: "50px",
                    cell: row => (
                        <div>

                            <img src={
                                    this.getImage(row.info.photo)
                                }
                                width="40px"
                                className="img-fluid img-border rounded-circle box-shadow-1"/>
                        </div>
                    )
                },
                {
                    name: "Citizen Name",
                    selector: "User",
                    sortable: true,
                    cell: row => (
                        <p className="text-bold-500 mb-0">
                            {
                            row.firstName + " " + row.lastName
                        }</p>
                    )
                },
                {
                    name: "Citizen ID",
                    selector: "User",
                    sortable: true,
                    minWidth: "150px",
                    style: {
                        'word-break': 'keep-all'
                    },
                    cell: row => (
                        <p className="text-bold-500 mb-0">
                            {
                            row.citizenId
                        }</p>
                    )
                },
                {
                    name: "Mobile",
                    selector: "subject",
                    sortable: true,
                    cell: row => (
                        <p className="text-bold-500 mb-0">
                            {
                            row.mobile
                        }</p>
                    )
                }, {
                    name: "Email",
                    selector: "issue",
                    sortable: true,
                    cell: row => (
                        <p className="text-bold-500  mb-0">
                            {
                            row.email
                        }</p>
                    )
                }, {
                    name: "On Boarding Date",
                    selector: "date",
                    sortable: true,
                    cell: row => (
                        <p className="text-bold-500  mb-0">
                            {
                            row.createdAt
                        }</p>
                    )
                }, {
                    name: "Action",
                    selector: "satus",
                    sortable: true,
                    cell: row => (
                        <div>
                            <span>
                                <img src={profileImg}
                                    alt="porfileImg"
                                    onClick={
                                        () => this.handleClick(row.citizenId)
                                    }
                                    style={
                                        {
                                            width: "30px",
                                            cursor: "pointer"
                                        }
                                    }
                                    className="img-fluid img-border rounded-circle box-shadow-1"/>
                            </span>
                            &nbsp;&nbsp;
                            <span>
                                <img src={pickImg}
                                    alt="profileImg"
                                    onClick={
                                        () => this.getCaseDetails(row.citizenId)
                                    }
                                    style={
                                        {
                                            width: "30px",
                                            cursor: "pointer"
                                        }
                                    }
                                    className="img-fluid img-border rounded-circle box-shadow-1"/>
                            </span>

                        </div>
                    )
                }
            ],
            data: [],
            filteredData: [],
            value: "",
            recs: []
        }
        this.loadRecs = this.loadRecs.bind(this);
    } // cosntructor
    loadRecs(recs) {

        this.setState({data: recs});
        this.setState({loader: null});
    }

    handleClick(_userid) {
        localStorage.setItem("citizenId", _userid);
        // alert(_userid)
        window.location = '/dashboard/citizenprofile'
    }

    handleSubmit() { // alert('Hellow')
        if (localStorage.getItem("roleId") === "1" || localStorage.getItem("roleId") === 1) {
            alert("Sorry as a Doctor you are not entitled for this.");

        } else {
            window.location = '/dashboard/addcitizen'
        }
    }

    getImage(imagUrl) {
        if (imagUrl === null || imagUrl === undefined || imagUrl === '') {
            imagUrl = 'http://18.60.238.252:3010/profile/no-photo-male.jpg';
        }
        return imagUrl;
    }


    getCaseDetails(_citizenId) {
        localStorage.setItem("_citizenId", _citizenId);
        document.location = "/dashboard/doctor/patientlist";
    }


    // 14.02.2023
    getDailyScreeningScreener() {
        axios.post('http://18.60.238.252:3010/api/report/ScreeningScreenerCsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-screeningScreener.csv")
        }).catch(e => {});
    }


    getdailycitizenReport() {
        axios.post('http://18.60.238.252:3010/api/report/createCitizenCsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-dailyCitizens.csv")
        }).catch(e => {});
    }

    getweekcitizenReport() {
        axios.post('http://18.60.238.252:3010/api/report/createWeeklyCitizencsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-weeklyCitizens.csv")
        }).catch(e => {});
    }

    getdailycitizendetailReport() {
        axios.post('http://18.60.238.252:3010/api/report/createCitizenDetailCsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-dailyCitizenDetails.csv")
        }).catch(e => {});
    }

    getweekcitizendetailReport() {
        axios.post('http://18.60.238.252:3010/api/report/weeklyCitizenDetailcsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-weeklyCitizenDetails.csv")
        }).catch(e => {});
    }

    getsevikaReport() {
        axios.post('http://18.60.238.252:3010/api/report/ScreeningSevikaCsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-screeningSevika.csv")
        }).catch(e => {});
    }

    getLipidCriticalCitizens() {
        axios.post('http://18.60.238.252:3010/api/report/lipidCriticalCitizensDetailcsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-lipidCriticalCitizensDetail.csv")
        }).catch(e => {});
    }

    getUnscreenedCitizenDetailcsv() {
        axios.post('http://18.60.238.252:3010/api/report/unscreenedCitizenDetailcsv', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-unscreenedCitizenDetailcsv.csv")
        }).catch(e => {});
    }

    generalSurveyCSV() {
        axios.post('http://18.60.238.252:3010/api/report/generalSurveyCSV', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-generalSurveyCSV.csv")
        }).catch(e => {});
    }

    healthSurveyCSV() {
        axios.post('http://18.60.238.252:3010/api/report/healthSurveyCSV', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-healthSurveyCSV.csv")
        }).catch(e => {});
    }

    socioEconomicSurveyCSV() {
        axios.post('http://18.60.238.252:3010/api/report/socioEconomicSurveyCSV', {
            ngoId: (localStorage.getItem("ngoId")) ? localStorage.getItem("ngoId") : localStorage.getItem("userid")
        }).then(response => {
            window.open("http://18.60.238.252:3010/exports/csv-socioEconomicSurveyCSV.csv")
        }).catch(e => {});
    }
    componentDidMount() {
        this.mounted = true;
    }

    handleFilter = e => {
        let value = e.target.value
        let data = this.state.data
        let filteredData = this.state.filteredData
        this.setState({value})

        if (value.length) {
            filteredData = data.filter(item => {
                console.dir(item.userId);
                let startsWithCondition = item.firstName.toLowerCase().startsWith(value.toLowerCase()) || item.lastName.toLowerCase().startsWith(value.toLowerCase())
                let includesCondition = item.firstName.toLowerCase().includes(value.toLowerCase()) || item.lastName.toLowerCase().includes(value.toLowerCase())

                if (startsWithCondition) {
                    return startsWithCondition
                } else if (! startsWithCondition && includesCondition) {
                    return includesCondition
                } else 
                    return null

                

            })
            this.setState({filteredData})
        }

    }


    render() {
        let {data, columns, value, filteredData} = this.state
        return (
            <React.Fragment>
                <Row>
                    <Col sm="12">
                        <Row mt="4"
                            style={
                                {
                                    overflow: "auto",
                                    display: "block",
                                    "table-layout": "auto"
                                }
                        }>
                            {/* <DailyWeeklyReports/> */}
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getDailyScreeningScreener
                                    }>Daily Screening Screener Download</a>
                                </h2>
                            </center>
                        </Row>
                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getDailyScreeningScreener
                                    }>Weekly Screening Screener Download</a>
                                </h2>
                            </center>
                        </Row>
                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getsevikaReport
                                    }>Daily Screening Sevika Download</a>
                                </h2>
                            </center>
                        </Row>
                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getsevikaReport
                                    }>Weekly Screening Sevika Download</a>
                                </h2>
                            </center>
                        </Row>


                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>

                            {/* <center><h2>Daily Citizens <a href="http://18.60.238.252:3010/documents/dailyCitizens.csv" target="_blank">Download</a></h2> */}
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getdailycitizenReport
                                    }>Daily Citizens Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tabledailyCitizens">

                                <CsvToHtmlTable data={
                                        this.state.tabledailyCitizens
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>

                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getdailycitizendetailReport
                                    }>
                                        Daily Citizen Details Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tabledailyCitizenDetails">

                                <CsvToHtmlTable data={
                                        this.state.tabledailyCitizenDetails
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>

                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getweekcitizenReport
                                    }>Weekly Citizens Download</a>
                                </h2>
                            </center>

                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>

                        <Row style={
                            {
                                overflow: "auto",
                                display: "block"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                            this.getweekcitizendetailReport
                                        }
                                        target="_blank">Weekly Citizen Details Download</a>
                                </h2>
                            </center>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>


                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getLipidCriticalCitizens
                                    }>Lipid Critical Citizens Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tablelipidCriticalCitizens">

                                <CsvToHtmlTable data={
                                        this.state.tablelipidCriticalCitizens
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>

                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.getUnscreenedCitizenDetailcsv
                                    }>
                                        Unscreened Citizen Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tableunscreened">

                                <CsvToHtmlTable data={
                                        this.state.tableunscreened
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.generalSurveyCSV
                                    }>General Survey Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tablegeneral">

                                <CsvToHtmlTable data={
                                        this.state.tablegeneral
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                            this.healthSurveyCSV
                                        }
                                        target="_blank">Health Survey Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tablehealth">

                                <CsvToHtmlTable data={
                                        this.state.tablehealth
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>

                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                        <Row style={
                            {
                                overflow: "auto",
                                display: "block",
                                "table-layout": "auto"
                            }
                        }>
                            <center>
                                <h2>
                                    <a onClick={
                                        this.socioEconomicSurveyCSV
                                    }>SocioEconomic Survey Download</a>
                                </h2>
                            </center>
                            <Col sm="12" className="collapse" id="tablesocio">

                                <CsvToHtmlTable data={
                                        this.state.tablesocio
                                    }
                                    csvDelimiter=","
                                    tableClassName="table table-striped table-hover"/>
                            </Col>
                        </Row>
                        <hr style={
                            {"margin-top": "10px"}
                        }/>
                    </Col>
                </Row>

            </React.Fragment>
        )
    }
    /* ENd rebder */
}

export default JTable
