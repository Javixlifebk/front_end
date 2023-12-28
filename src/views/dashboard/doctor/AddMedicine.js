import React, { Suspense, lazy } from "react";
import Select from "react-select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Check } from "react-feather";
import { Star, Search } from "react-feather";
import Spinner from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
//import { ContextLayout } from "../../utility/context/Layout"
import { ContextLayout } from "../../../utility/context/Layout";
import $ from "jquery";
import DataTable from "../../tables/data-tables/DataTableCustom";
import axios from "axios";
const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new"></div>
      <div className="position-relative has-icon-left mb-1">
        <Input
          value={props.value}
          placeholder="search"
          onChange={(e) => props.handleFilter(e)}
        />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

class AddMedicine extends React.Component {
  toggleModal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  state = {
    strMedicine: "",
    strDosage: "",
    strStrength: "",
    spnSUnit: "",
    spnDUnit: "",
    strPreparation: "",
    strRoute: "",
    strDirection: "",
    strFrequency: "",
    strDuration: "",
    strDrUnit: "",
    strQty: "",
    strTime: "",
    strSuggestions: "",
    strTests: "",
    strEvening: "",
    strMedicineType: "",

    strMdescription: "",
    strTests: "",
    curTime: new Date().toLocaleString(),
    colsMedicine: [],
    colsStrength: [],
    colsSUnit: [],
    colsDosage: [],
    colsDUnit: [],
    colsPreparation: [],
    colsRoute: [],
    colsDirection: [],
    colsFrequency: [],
    colsDuration: [],
    colsDrUnit: [],
    colsQty: [],
    addNewRowFeild: [],
    columns: [
      {
        name: "Medicines",
        selector: "User",
        sortable: true,
        cell: (row) => (
          <div>
            <p>fdg</p>
          </div>
        ),
      },
      {
        name: "Dosage",
        selector: "User",
        sortable: true,
        cell: (row) => (
          <div>
            <p>dfs</p>
          </div>
        ),
      },
    ],
    data: [
      {
        name: "Alyss Lillecrop",
      },
      {
        name: "Shep Pentlow",
      },
    ],
  };
  prescribeData() {
    //isUnrefer:2 prescription list
    axios
      .post("https://javixlife.org/api/citizen/citizenReferList", {
        isUnrefer: 2,
        citizenId: localStorage.getItem("citizenId"),
      })
      .then((response) => {
        if (response.data.status === 1) {
          var msg = response.data.message;
          var recs = response.data.data.data;
          this.loadRecs(recs);
          console.log(recs, "111111111111111111111");
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
// Set the flag to indicate rows are being removed during handleSubmit
this.setState({ isRowBeingRemoved: true });
    // console.log('Updated addNewRowFeild===================:', this.state.addNewRowFeild);
    var myCurrentDate = new Date();
    // let mydate='';
    // if((myCurrentDate.getMonth()+1)<=9){
    //   mydate="0"+(myCurrentDate.getMonth()+1);
    // }else if((myCurrentDate.getMonth()+1)<=9){
    //   mydate="0"+myCurrentDate.getMonth()+1;
    // }

    let mydate =
      (myCurrentDate.getDate() <= 9 ? "0" : "") + myCurrentDate.getDate();
    mydate +=
      (myCurrentDate.getMonth() + 1 <= 9 ? "-0" : "-") +
      (myCurrentDate.getMonth() + 1);
    mydate += "-" + myCurrentDate.getFullYear();

    const finalMedicine = [];
    const finalStrength = [];
    const finalSUnit = [];
    const finalDosages = [];
    const finalDUnit = [];
    const finalFrequency = [];
    const finalPreparation = [];
    const finalRoute = [];
    const finalDirection = [];
    const finalDuration = [];
    const finalDrUnit = [];
    const finalQty = [];
    // ... (initialize other final arrays)

    this.state.addNewRowFeild.forEach((unit) => {
      console.log(unit, "test=====================");
      finalMedicine.push(unit.colsMedicine);
      finalStrength.push(unit.colsStrength);

      finalSUnit.push(unit.colsSUnit);
      finalDosages.push(unit.colsDosage);
      finalDUnit.push(unit.colsDUnit);
      finalFrequency.push(unit.colsFrequency);
      finalPreparation.push(unit.colsPreparation);
      finalRoute.push(unit.colsRoute);
      finalDirection.push(unit.colsDirection);
      finalDuration.push(unit.colsDuration);
      finalDrUnit.push(unit.colsDrUnit);
      finalQty.push(unit.colsQty);
      // ... (push to other final arrays)
    });
// Reset the flag after processing rows
this.setState({ isRowBeingRemoved: false });
    // Set the dateOfOnBoarding in the state
    this.setState({ dateOfOnBoarding: mydate });
    // this.state.strPMeal+=",,,";
    // let dateOfOnBoarding = mydate + '-' +  mydate + '-' + myCurrentDate.getFullYear();
    // this.setState()
    const postData =
      `citizenId=${localStorage.getItem(
        "citizenId"
      )}&screenerId=161315136114567577&recordId=0` +
      `&token=dfjkhsdfaksjfh3756237&doctorId=${localStorage.getItem(
        "usermasid"
      )}` +
      `&caseId=${localStorage.getItem(
        "caseId"
      )}&status=3&medicine=${finalMedicine}` +
      `&strength=${finalStrength}&quantity=${finalQty}&duaration=${finalDuration}&direction=${finalDirection}` +
      `&frequency=${finalFrequency}&preparation=${finalPreparation}&dose=${finalDosages}` +
      `&route=${finalRoute}&tests=${this.state.strTests}&cause=${this.state.strCause}&comments=${this.state.strMdescription}` +
      `&ngoId=${localStorage.getItem("ngoId")}`;

    console.log(
      postData,
      "postData========================================================"
    );
    let _targetPostURL = "https://javixlife.org/api/doctor/addprescription?=";
    axios({
      method: "post",
      url: _targetPostURL,
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data && res.data.status === 1) {
          console.log(res.data);
          alert("add new ");
          alert("Medicine Added Successfully");
          window["medicineInit"]();
          window.location = "/dashboard/patientview";
        } else {
          console.error("Unexpected response structure:", res.data);
          alert(
            "Failed to add medicine. Please check the console for details."
          );
        }
      })
      .catch((error) => {
        console.error("Error during API request:", error);
        alert("Failed to add medicine. Please check the console for details.");
      });
  };
  handleClick = (e) => {
    e.preventDefault();
    alert("Hello");
  };
  removeRow = (index, calledFromSubmit = false) => {
    // Check if the remove button was clicked
    if (!this.state.removeButtonClicked) {
      // Create a copy of the addNewRowFeild array
      const updatedRows = [...this.state.addNewRowFeild];
  
      // Check if the index is valid
      if (index >= 0 && index < updatedRows.length) {
        // Log the row that is about to be removed
        console.log(`Removing row at index ${index}:`, updatedRows[index]);
  
        // Remove the row at the specified index
        const removedRow = updatedRows.splice(index, 1)[0];
  
        // Update the state with the modified array
        this.setState({
          addNewRowFeild: updatedRows,
          // Set a flag to indicate that a row is being removed
          isRowBeingRemoved: true,
        });
  
        // Log the updated addNewRowFeild array
        console.log("Updated addNewRowFeild===================:", updatedRows);
  
        // Log that the row has been successfully removed
        console.log(`Row at index ${index} removed successfully.`);
  
        // Check if the API should be called (based on the flag and calledFromSubmit)
        if (!this.state.isRowBeingRemoved && !calledFromSubmit) {
          // Your API call code here...
          // ...
  
          // Reset the flag after the API call
          this.setState({ isRowBeingRemoved: false });
        }
  
      } else {
        // Log that the index is invalid
        console.log(`Invalid index: ${index}. No row removed.`);
      }
    }
  
    // Reset the removeButtonClicked state after removing the row
    this.setState({ removeButtonClicked: false });
  };
  // Add a method to set the removeButtonClicked state when the remove button is clicked
  setRemoveButtonClicked = () => {
    this.setState({ removeButtonClicked: true });
  };

  //   removeRow = index => {
  //     // Create a copy of the addNewRowFeild array
  //     const updatedRows = [...this.state.addNewRowFeild];

  //     // Check if the index is valid
  //     if (index >= 0 && index < updatedRows.length) {
  //       // Log the row that is about to be removed
  //       console.log(`Removing row at index ${index}:`, updatedRows[index]);

  //       // Remove the row at the specified index
  //     const removedRow = updatedRows.splice(index, 1)[0];
  //     // console.log('Removed row========================:', removedRow);

  //     // Update the state with the modified array
  //     this.setState({
  //       addNewRowFeild: updatedRows,
  //     });

  //     // Log the updated addNewRowFeild array
  //     console.log('Updated addNewRowFeild===================:', updatedRows);

  //     // Log that the row has been successfully removed
  //     console.log(`Row at index ${index} removed successfully.`);
  //   } else {
  //     // Log that the index is invalid
  //     console.log(`Invalid index: ${index}. No row removed.`);
  //   }
  // };

  addRow = (e) => {
    e.preventDefault();

    // Log the values before updating state
    console.log("Before State Update:", this.state);

    // Create a new object with the current state values
    const newRow = {
      colsMedicine: this.state.strMedicine,
      colsStrength: this.state.strStrength,
      colsSUnit: this.state.spnSUnit,
      colsDosage: this.state.strDosage,
      colsDUnit: this.state.spnDUnit,
      colsPreparation: this.state.strPreparation,
      colsRoute: this.state.strRoute,
      colsDirection: this.state.strDirection,
      colsFrequency: this.state.strFrequency,
      colsDuration: this.state.strDuration,
      colsDrUnit: this.state.strDrUnit,
      colsQty: this.state.strQty,
    };

    // Update addNewRowFeild array with the new object
    this.setState(
      (prevState) => ({
        addNewRowFeild: [...prevState.addNewRowFeild, newRow],
      }),
      () => {
        // Log the updated state after the state has been updated
        console.log("Updated State:", this.state.addNewRowFeild);
      }
    );

    // Clear the input fields and dropdowns
    this.setState({
      strMedicine: "",
      strStrength: "",
      spnSUnit: "Unit",
      strDosage: "",
      spnDUnit: "Unit",
      strPreparation: "Preparation",
      strRoute: "Route",
      strDirection: "Direction",
      strFrequency: "Frequency",
      strDuration: "",
      strDrUnit: "",
      strQty: "",
    });

    // Call the addMedicine function with the updated state
    // window["addMedicine"](this.state);
  };

  render() {
    const mealType = [
      {
        value: "Meal Type",
        label: "Meal Type",
        color: "#00B8D9",
        isFixed: true,
      },

      { value: "Pre Meal", label: "Pre Meal", color: "#00B8D9", isFixed: true },
      {
        value: "Post Meal",
        label: "Post Meal",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    const medicinetType = [
      {
        value: "Medicine Type",
        label: "Medicine Type",
        color: "#00B8D9",
        isFixed: true,
      },

      { value: "Tablet", label: "Tablet", color: "#00B8D9", isFixed: true },
      { value: "Capsule", label: "Capsule", color: "#00B8D9", isFixed: true },
      { value: "Teaspoon", label: "Teaspoon", color: "#00B8D9", isFixed: true },
      { value: "Spray", label: "Spray", color: "#00B8D9", isFixed: true },
      { value: "Ointment", label: "Ointment", color: "#00B8D9", isFixed: true },
    ];

    const strSUnit = [
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      { value: "mg", label: "mg", color: "#00B8D9", isFixed: true },
      { value: "gm", label: "gm", color: "#00B8D9", isFixed: true },
      { value: "ng", label: "ng", color: "#00B8D9", isFixed: true },
      { value: "mcq", label: "mcq", color: "#00B8D9", isFixed: true },
      { value: "%", label: "%", color: "#00B8D9", isFixed: true },
      { value: "IU", label: "IU", color: "#00B8D9", isFixed: true },
      { value: "IU/ml", label: "IU/ml", color: "#00B8D9", isFixed: true },
    ];

    const strDUnit = [
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      { value: "ml", label: "ml", color: "#00B8D9", isFixed: true },
      { value: "unit", label: "unit", color: "#00B8D9", isFixed: true },
      {
        value: "table spoon",
        label: "table spoon",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "tea spoon",
        label: "tea spoon",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    const strDrUnit = [
      { value: "Unit", label: "Unit", color: "#00B8D9", isFixed: true },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      { value: "hours", label: "hours", color: "#00B8D9", isFixed: true },
      { value: "days", label: "days", color: "#00B8D9", isFixed: true },
      { value: "tweeks", label: "weeks", color: "#00B8D9", isFixed: true },
      { value: "years", label: "years", color: "#00B8D9", isFixed: true },
    ];

    const strPreparation = [
      {
        value: "Preparation",
        label: "Preparation",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      { value: "Tablet", label: "Tablet", color: "#00B8D9", isFixed: true },
      { value: "Capsule", label: "Capsule", color: "#00B8D9", isFixed: true },
      { value: "Softgel", label: "Softgel", color: "#00B8D9", isFixed: true },
      {
        value: "Injection",
        label: "Injection",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "Syrup", label: "Syrup", color: "#00B8D9", isFixed: true },
      { value: "Drops", label: "Drops", color: "#00B8D9", isFixed: true },
      { value: "Ointment", label: "Ointment", color: "#00B8D9", isFixed: true },
      {
        value: "Suppository",
        label: "Suppository",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    const stRoute = [
      { value: "Route", label: "Route", color: "#00B8D9", isFixed: true },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      { value: "Topical", label: "Topical", color: "#00B8D9", isFixed: true },
      { value: "Oral", label: "Oral", color: "#00B8D9", isFixed: true },
      { value: "Rectal", label: "Rectal", color: "#00B8D9", isFixed: true },
      { value: "Vaginal", label: "Vaginal", color: "#00B8D9", isFixed: true },
      { value: "Urethral", label: "Urethral", color: "#00B8D9", isFixed: true },
      {
        value: "Inhalation",
        label: "Inhalation",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "Local", label: "Local", color: "#00B8D9", isFixed: true },
      { value: "Chew", label: "Chew", color: "#00B8D9", isFixed: true },
      { value: "Suck", label: "Suck", color: "#00B8D9", isFixed: true },
      {
        value: "Intrademal",
        label: "Intrademal",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Subcutaneous",
        label: "Subcutaneous",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Intramuscular",
        label: "Intramuscular",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Intravenous",
        label: "Intravenous",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "Nasal", label: "Nasal", color: "#00B8D9", isFixed: true },
      {
        value: "Ear Drops",
        label: "Ear Drops",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Eye Drops",
        label: "Eye Drops",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    const strDirection = [
      {
        value: "Direction",
        label: "Direction",
        color: "#00B8D9",
        isFixed: true,
      },

      {
        value: "Before meals",
        label: "Before meals",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "After meals",
        label: "After meals",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    const strFrequency = [
      {
        value: "Frequency",
        label: "Frequency",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "N/A", label: "N/A", color: "#00B8D9", isFixed: true },
      {
        value: "If required",
        label: "If required",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Immediately",
        label: "Immediately",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Once a day",
        label: "Once a day",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Twice daily",
        label: "Twice daily",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Thrice daily",
        label: "Thrice daily",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Four times a day",
        label: "Four times a day",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Every hour",
        label: "Every hour",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Every night at bedtime",
        label: "Every night at bedtime",
        color: "#00B8D9",
        isFixed: true,
      },
      { value: "Everyday", label: "Everyday", color: "#00B8D9", isFixed: true },
      {
        value: "Every other day",
        label: "Every other day",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Ever four hours",
        label: "Ever four hours",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Once a week",
        label: "Once a week",
        color: "#00B8D9",
        isFixed: true,
      },
      {
        value: "Three times a week",
        label: "Three times a week",
        color: "#00B8D9",
        isFixed: true,
      },
    ];

    let { data, columns } = this.state;
    return (
      <React.Fragment>
        <hr></hr>
        <div></div>
        <Row>
          <Col lg="12" md="12">
            <div>
              <h3>
                {" "}
                <Button.Ripple
                  color="success"
                  outline
                  onClick={this.toggleModal}
                >
                  Add New
                </Button.Ripple>
              </h3>
            </div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleModal}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={this.toggleModal}>Add Medicine</ModalHeader>
              <ModalBody>
                <Form action="/" onSubmit={this.handleSubmit}>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Input
                          type="text"
                          name="fname"
                          id="nameVertical"
                          placeholder="Medicine Name"
                          value={this.state.strMedicine}
                          onChange={(e) =>
                            this.setState({ strMedicine: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Input
                          type="text"
                          name="fname"
                          id="nameVertical"
                          placeholder="Strength"
                          value={this.state.strStrength}
                          onChange={(e) =>
                            this.setState({ strStrength: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strSUnit}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Unit"
                          onChange={(e) => this.setState({ spnSUnit: e.value })}
                          // value={{ value: this.state.spnSUnit, label: this.state.spnSUnit }}
                          value={
                            this.state.spnSUnit
                              ? {
                                  value: this.state.spnSUnit,
                                  label: this.state.spnSUnit,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Input
                          type="text"
                          name="fname"
                          id="nameVertical"
                          placeholder="Dosage"
                          value={this.state.strDosage}
                          onChange={(e) =>
                            this.setState({ strDosage: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strDUnit}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Unit"
                          onChange={(e) => this.setState({ spnDUnit: e.value })}
                          // value={{ value: this.state.spnDUnit, label: this.state.spnDUnit }}
                          value={
                            this.state.spnDUnit
                              ? {
                                  value: this.state.spnDUnit,
                                  label: this.state.spnDUnit,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strPreparation}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Preparation"
                          onChange={(e) =>
                            this.setState({ strPreparation: e.value })
                          }
                          // value={{ value: this.state.strPreparation, label: this.state.strPreparation }}
                          value={
                            this.state.strPreparation
                              ? {
                                  value: this.state.strPreparation,
                                  label: this.state.strPreparation,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={stRoute}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Route"
                          onChange={(e) => this.setState({ strRoute: e.value })}
                          // value={{ value: this.state.strRoute, label: this.state.strRoute }}
                          value={
                            this.state.strRoute
                              ? {
                                  value: this.state.strRoute,
                                  label: this.state.strRoute,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strDirection}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Direction"
                          onChange={(e) =>
                            this.setState({ strDirection: e.value })
                          }
                          // value={{ value: this.state.strDirection, label: this.state.strDirection }}
                          value={
                            this.state.strDirection
                              ? {
                                  value: this.state.strDirection,
                                  label: this.state.strDirection,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="4">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strFrequency}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Frequency"
                          onChange={(e) =>
                            this.setState({ strFrequency: e.value })
                          }
                          // value={{ value: this.state.strFrequency, label: this.state.strFrequency }}
                          value={
                            this.state.strFrequency
                              ? {
                                  value: this.state.strFrequency,
                                  label: this.state.strFrequency,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Input
                          type="text"
                          name="fname"
                          id="nameVertical"
                          placeholder="Duration"
                          value={this.state.strDuration}
                          onChange={(e) =>
                            this.setState({ strDuration: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Select
                          name="colors"
                          options={strDrUnit}
                          className="React"
                          classNamePrefix="Unit"
                          placeholder="Unit"
                          onChange={(e) =>
                            this.setState({ strDrUnit: e.value })
                          }
                          // value={{ value: this.state.strDrUnit, label: this.state.strDrUnit }}
                          value={
                            this.state.strDrUnit
                              ? {
                                  value: this.state.strDrUnit,
                                  label: this.state.strDrUnit,
                                }
                              : null
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <Input
                          type="text"
                          name="fname"
                          id="nameVertical"
                          placeholder="Qty."
                          value={this.state.strQty}
                          onChange={(e) =>
                            this.setState({ strQty: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <div style={{ textAlign: "right" }}>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="text-center">Medcine Name</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            {this.state.addNewRowFeild.map((item, index) => (
                              <tbody
                              // id="tbody"
                              //  onClick={this.removeRow}
                              >
                                <td>{item.colsMedicine}</td>
                                <td class="text-center">
                                <button class="btn btn-danger remove" onClick={() => { this.setRemoveButtonClicked(); this.removeRow(index); }}>Remove Row</button>

                                  {/* <button onClick={() => this.removeRow(index)}>
                                    Remove Row
                                  </button> */}
                                  {/* <button class="btn btn-danger remove"
              type="button"
              onClick={this.removeRow}
              >Remove</button> */}
                                </td>
                              </tbody>
                            ))}
                          </table>
                        </div>
                        <button
                          className="btn btn-md btn-primary"
                          id="addBtn"
                          type="button"
                          onClick={this.addRow}
                        >
                          Add new Row
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="nameVertical">Other Instructions</Label>
                        <Input
                          type="textarea"
                          name="mdescription"
                          id="nameVertical"
                          placeholder="Other Instructions"
                          value={this.state.strMdescription}
                          onChange={(e) =>
                            this.setState({ strMdescription: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="nameVertical">Add Tests</Label>
                        <Input
                          type="textarea"
                          name="allergies"
                          id="nameVertical"
                          placeholder="Add Tests"
                          value={this.state.strTests}
                          onChange={(e) =>
                            this.setState({ strTests: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <Label for="cause">Add Cause</Label>
                        <Input
                          type="textarea"
                          name="cause"
                          id="cause"
                          placeholder="Add Cause"
                          value={this.state.strCause}
                          onChange={(e) =>
                            this.setState({ strCause: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="mr-1 mb-1"
                          onClick={() => {
                            this.prescribeData();
                          }}
                        >
                          Submit
                        </Button.Ripple>
                        <Button.Ripple
                          outline
                          color="warning"
                          type="reset"
                          className="mb-1"
                        >
                          Reset
                        </Button.Ripple>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
            </Modal>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AddMedicine;
