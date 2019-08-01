import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Dropdown, Button, Icon, Container } from 'semantic-ui-react';
import GeneralForm from './GeneralForm';
import { formOption } from './constants';
import StudentFormDep from './StudentFormDep';
import StudentFormUni from './StudentFormUni';
import RefDep from './RefDep';
import RefUni from './RefUni';
import PrintTranscript from './PrintTranscript';
import GraduateConf from './GraduateConf';


class Form extends Component {
  state = {
    formType: 1,
    open: false
  }

  showModal = (e, { value }) => {
    this.setState({
      formType: value,
      open: true,
      formName: formOption.find((option) => {
        return option.value === value;
      }).text
    });
  }

  close = () => this.setState({ open: false })

  render() {
    const { formType, open, formName } = this.state;
    return (
      <Container fluid>
        <span>
          Tạo mới&nbsp;
          <Dropdown inline placeholder="đơn" options={formOption} onChange={this.showModal} />
        </span>
        <Modal open={open}
          onClose={this.close}
          closeIcon
          closeOnDimmerClick={true}
          closeOnDocumentClick={false}
          size="large"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '1%'
          }}
        >
          <Modal.Header>{formName}</Modal.Header>
          <Modal.Content style={{
            fontFamily: 'Times New Roman',
          }}
          >
            {formType === 1 ? (<StudentFormDep />) : ''}
            {formType === 2 ? (<StudentFormUni />) : ''}
            {formType === 3 ? (<RefDep />) : ''}
            {formType === 4 ? (<RefUni />) : ''}
            {formType === 5 ? (<PrintTranscript />) : ''}
            {formType === 6 ? (<GraduateConf />) : ''}
            {formType === 7 ? (<GeneralForm />) : ''}
            {formType === 8 ? (<GeneralForm />) : ''}
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" inverted>
              <Icon name="checkmark" />Gửi
            </Button>
          </Modal.Actions>
        </Modal>
        {/* <iframe id="ifmcontentstoprint" /> */}
      </Container>);
  }
}
const ConnectedForm = connect(null, null)(Form);
export default ConnectedForm;