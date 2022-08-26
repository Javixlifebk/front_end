import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import classnames from "classnames"
import { Eye, Code } from "react-feather"
import { modalForm } from "../../../components/reactstrap/modal/ModalSourceCode"
import AddAllergey from "./AddAllergey"

class ModalForm extends React.Component {
  state = {
    activeTab: "1",
    modal: false
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    return (
        <div>
        <Button.Ripple
            color="success"
            outline
            onClick={this.toggleModal}
          >
            Add New
          </Button.Ripple>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={this.toggleModal}>
              Add Patient Allergy
            </ModalHeader>
            <ModalBody>
            <AddAllergey/>
            </ModalBody>
          
          </Modal>
        </div>
      
    )
  }
}
export default ModalForm
