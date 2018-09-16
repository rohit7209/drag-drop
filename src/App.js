import React, { Component } from 'react';
import './App.css';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './constants';
import Employee from './components/Employee';
import Shift from './components/Shift';
import Station from './components/Station';
import Confirm from './components/Confirm';
// console.log(CONSTANTS);

const Error = styled.span`
  font-size: 12px;
  color: red;
`;

const Success = styled.span`
  font-size: 12px;
  color: green;
`;

const Button = styled.button`
  color: white;
  background: ${CONSTANTS.ui.primaryColor};
  border: 1px solid ${CONSTANTS.ui.primaryColor};
  padding: 15px;
  min-width: 150px;
  cursor: pointer;
`;

const Hr = styled.div`
  margin: 20px auto;
  width: calc(100% - 30px); 
  height: 1px; 
  background: lightgrey;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesting: false,
      error: '',
      success: '',
      showConfirm: false,
      confirmMessage: '',
    };
    this.allowDrop = this.allowDrop.bind(this); // method to control on drag over event
    this.onDrop = this.onDrop.bind(this); // method to control on dropping an element event
    this.onDrag = this.onDrag.bind(this); // method to control on dragging an element event
    this.reset = this.reset.bind(this); // reset both shift & station of employee
    this.submitData = this.submitData.bind(this); // POST data to backend
    this.handleCancel = this.handleCancel.bind(this); // method to handle situation when user clicks cancel om confirm
    this.handleOk = this.handleOk.bind(this); // method to handle situation when user clicks ok on confirm popup
    this.allotEmployee = this.allotEmployee.bind(this); // updating shift & station to an employee
  }

  componentWillMount() {
    this.setState({
      shiftList: CONSTANTS.shiftList,
      stationList: CONSTANTS.stationList,
      employeeList: CONSTANTS.employeeList
    });
  }

  /**
   * @param {any} e event of element on drag over (event when shift/station dragged over employee)
   * @memberof App
   */
  allowDrop(e) {
    e.preventDefault();
  }

  /**
   * @param {any} e event of element which is dropped
   * @param {any} empId id of employee where shift/station is dropped
   * @memberof App
   */
  onDrop(e, empId) {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const type = e.dataTransfer.getData('type');

    // checkign whether shift/station is alloted or not
    if (!this.state.employeeList[empId][type] || this.state.employeeList[empId][type].id === id) this.allotEmployee(empId, type, id);
    else {
      // if shift/station is aleadt alloted show confirm popup
      this.setState({
        showConfirm: true,
        confirmMessage: `Are you sure you want to reset alloted ${type}?`,
        temp: { empId, type, id }, // setting empId, type & id for temporary use when user clicks ok in confirm
      })
    }
  }

  /**
   * 
   * @param {any} e event on dragging element
   * @param {any} type shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  onDrag(e, type, id) {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('type', type);
  }

  /**
   * @param {any} empId employee id where drop is made
   * @param {any} type type of allotment shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  allotEmployee(empId, type, id) {
    this.setState({
      employeeList: {
        ...this.state.employeeList,
        [empId]: {
          ...this.state.employeeList[empId],
          [type]: this.state[type + 'List'][id],
        }
      }
    });
  }

  handleOk() {
    this.allotEmployee(this.state.temp.empId, this.state.temp.type, this.state.temp.id);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      confirmMessage: '',
      showConfirm: false,
    });
  }

  reset(empId) {
    this.setState({
      employeeList: {
        ...this.state.employeeList,
        [empId]: {
          ...this.state.employeeList[empId],
          shift: '',
          station: '',
        }
      }
    });
  }

  submitData() {
    console.log(this.state.employeeList);
    const _this = this;
    this.setState({ requesting: true });
    const URL = CONSTANTS.serverUrl + CONSTANTS.api.allotTechnicianShifts;
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeList: _this.state.employeeList,
      }),
    })
      .then((response) => response.json())
      .then((json) => { this.setState({ requesting: false, error: '', success: 'updated successfully!' }) })
      .catch((error) => { this.setState({ requesting: false, error: 'something went wrong!', success: '' }); })
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex' }}>
        <div style={{ width: '78%', padding: '20px 15px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.keys(this.state.shiftList || {}).map((shift, key) => <Shift
              key={key}
              name={this.state.shiftList[shift].name}
              draggable
              onDragStart={(e) => this.onDrag(e, 'shift', this.state.shiftList[shift].id)}
            />)}
          </div>
          <Hr />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/*, justifyContent: 'space-around'*/}
            {Object.keys(this.state.employeeList || {}).map((empId, key) =>
              <Employee
                key={key}
                id={empId}
                onDrop={(e) => { this.onDrop(e, empId); }}
                onDragOver={this.allowDrop}
                reset={this.reset}
                {...this.state.employeeList[empId]}
              />
            )}
          </div>
          <div style={{ textAlign: 'right', padding: '20px' }}>
            <Button onClick={this.submitData}>
              {(this.state.requesting) ? <FontAwesome name="circle-o-notch" spin /> : null}
              &nbsp;Submit
            </Button>
            <br /><Error>{this.state.error}</Error>
            <br /><Success>{this.state.success}</Success>
          </div>
        </div>
        <div style={{ width: '22%', background: 'rgba(100,100,100,0.2)', padding: '20px', height: 'calc(100vh - 40px)', overflow: 'auto' }}>
          {Object.keys(this.state.stationList || {}).map((station, key) => <Station
            key={key}
            name={this.state.stationList[station].name}
            draggable
            onDragStart={(e) => this.onDrag(e, 'station', this.state.stationList[station].id)}
          />)}
        </div>
        <Confirm
          show={this.state.showConfirm}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          message={this.state.confirmMessage}
        />
      </div>
    );
  }
}

export default App;
