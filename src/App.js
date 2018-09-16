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
      commonShiftEmployees: [],
    };
    this.allowDrop = this.allowDrop.bind(this); // method to control on drag over event
    this.onDrop = this.onDrop.bind(this); // method to control on dropping an element event
    this.onDrag = this.onDrag.bind(this); // method to control on dragging an element event
    this.reset = this.reset.bind(this); // reset both shift & station of employee
    this.submitData = this.submitData.bind(this); // POST data to backend
    this.handleCancel = this.handleCancel.bind(this); // method to handle situation when user clicks cancel om confirm
    this.handleOk = this.handleOk.bind(this); // method to handle situation when user clicks ok on confirm popup
    this.allotEmployee = this.allotEmployee.bind(this); // updating shift & station to an employee
    this.onDropCommon = this.onDropCommon.bind(this);
  }

  componentWillMount() {
    this.setState({
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
  onDrop(e, stationId, shiftId) {
    e.preventDefault();
    const empId = e.dataTransfer.getData('id');
    // checkign whether shift/station is alloted or not
    if (!this.state.employeeList[empId].station && !this.state.employeeList[empId].shift) this.allotEmployee(empId, stationId, shiftId);
    else {
      // if shift/station is aleadt alloted show confirm popup
      this.setState({
        showConfirm: true,
        confirmMessage: `Are you sure you want to change the shift allotment for '${this.state.employeeList[empId].name}'?`,
        temp: { empId, stationId, shiftId }, // setting empId, stationId & shiftId for temporary use when user clicks ok in confirm
      })
    }
  }

  onDropCommon(e) {
    e.preventDefault();
    const empId = e.dataTransfer.getData('id');
    // checkign whether shift/station is alloted or not
    this.setState({
      commonShiftEmployees: {
        ...this.state.commonShiftEmployees,
        [empId]: { ...this.state.employeeList[empId], id: empId },
      },
    });
  }

  /**
   * 
   * @param {any} e event on dragging element
   * @param {any} type shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  onDrag(e, id) {
    e.dataTransfer.setData('id', id);
  }

  /**
   * @param {any} empId employee id where drop is made
   * @param {any} type type of allotment shift/station
   * @param {any} id id of shift/station
   * @memberof App
   */
  allotEmployee(empId, stationId, shiftId) {
    const employeeList = this.state.stationList[stationId].shifts[shiftId].employees || {};
    if (employeeList[empId]) delete employeeList[empId];
    this.setState({
      employeeList: {
        ...this.state.employeeList,
        [empId]: {
          ...this.state.employeeList[empId],
          station: this.state.stationList[stationId],
          shift: this.state.stationList[stationId].shifts[shiftId],
        },
      },
    });
  }

  handleOk() {
    this.allotEmployee(this.state.temp.empId, this.state.temp.stationId, this.state.temp.shiftId);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      confirmMessage: '',
      showConfirm: false,
    });
  }

  reset(empId, type) {
    switch (type.toUpperCase()) {
      case 'ALL': {
        const commonShiftEmployees = this.state.commonShiftEmployees;
        if (commonShiftEmployees[empId]) delete commonShiftEmployees[empId];

        this.setState({
          employeeList: {
            ...this.state.employeeList,
            [empId]: {
              ...this.state.employeeList[empId],
              shift: '',
              station: '',
            }
          },
          commonShiftEmployees,
        });
      }
        break;
      case 'COMMON': {
        const commonShiftEmployees = this.state.commonShiftEmployees;
        if (commonShiftEmployees[empId]) delete commonShiftEmployees[empId];
        this.setState({ commonShiftEmployees });
      }
        break;
      default: {
        this.setState({
          employeeList: {
            ...this.state.employeeList,
            [empId]: {
              ...this.state.employeeList[empId],
              shift: '',
              station: '',
            }
          },
        });
      }
        break;
    }
  }

  submitData() {
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
    const stationEmployeeMap = {};
    Object.keys(this.state.employeeList).forEach(empId => {
      const emp = this.state.employeeList[empId];
      if (emp.station.id && emp.shift.id) {
        if (!stationEmployeeMap[emp.station.id]) stationEmployeeMap[emp.station.id] = {};
        if (!stationEmployeeMap[emp.station.id][emp.shift.id]) stationEmployeeMap[emp.station.id][emp.shift.id] = [];
        stationEmployeeMap[emp.station.id][emp.shift.id].push({ ...emp, id: empId });
      }
    });
    const commonShiftEmployees = [];
    Object.keys(this.state.commonShiftEmployees).forEach(empId => {
      commonShiftEmployees.push({ ...this.state.employeeList[empId], id: empId });
    });

    return (
      <div className="App" style={{ display: 'flex' }}>
        <div style={{ width: 'calc(100% - 315px)', padding: '20px 15px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Shift
              name="Common Shift"
              onDrop={this.onDropCommon}
              onDragOver={this.allowDrop}
              employees={commonShiftEmployees}
              reset={(empId) => this.reset(empId, 'COMMON')}
            />
          </div>
          <Hr />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/*, justifyContent: 'space-around'*/}
            {/* station shift */}
            {Object.keys(this.state.stationList || {}).map((stationId, key) => <Station
              key={key}
              name={this.state.stationList[stationId].name}
            >
              {Object.keys(this.state.stationList[stationId].shifts || {}).map((shiftId, key1) => {
                const employees = [];
                this.state.employees
                return <Shift
                  key={key1}
                  name={this.state.stationList[stationId].shifts[shiftId].name}
                  onDrop={(e) => this.onDrop(e, stationId, shiftId)}
                  onDragOver={this.allowDrop}
                  employees={(stationEmployeeMap[stationId] || {})[shiftId] || []}
                  reset={(empId) => this.reset(empId, 'DEFAULT')}
                />
              })}
            </Station>)}
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
        <div style={{ width: '275px', background: 'rgba(100,100,100,0.2)', padding: '20px', height: 'calc(100vh - 40px)', overflow: 'auto' }}>
          {Object.keys(this.state.employeeList || {}).map((empId, key) =>
            <Employee
              key={key}
              id={empId}
              draggable
              onDragStart={(e) => this.onDrag(e, empId)}
              reset={this.reset}
              isInCommonShift={this.state.commonShiftEmployees[empId]}
              {...this.state.employeeList[empId]}
            />
          )}
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
