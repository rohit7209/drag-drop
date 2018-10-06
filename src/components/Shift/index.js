import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './../../constants';
import Confirm from './../Confirm';

const Img = styled.img`
  width: 25px; 
  height: 25px;
  border-radius: 30px;
  margin-right: 5px;
`;

const EmployeeChip = styled.div`
  display: flex;
  padding: 5px;
  line-height: 25px;
  color: grey;
  position: relative;
  cursor: move;
`;

const Reset = styled(FontAwesome) `
  font-size: 12px;
  color: rgba(124, 10, 2, 0.5);
  cursor: pointer;
  position: absolute; 
  right: 3px;
  top: 3px;
  line-height: 25px;
`;

const Star = styled(FontAwesome) `
  font-size: 12px;
  color: gold;
  line-height: 25px;
`;

const Employee = (props) => {
  return (
    <EmployeeChip
      draggable
      onDragStart={props.onDragStart}
    >
      <Reset name="times" onClick={props.reset} />
      <Img src={props.imgSrc || require('./../../assets/profile.jpeg')} />
      {props.name} {(props.lead) ? <Star name="star" /> : null}
    </EmployeeChip>
  );
};


const Layout = styled.div`
  width: calc(100% - 30px);
  // max-width: 300px;
  background: white;
  border: 1px solid ${CONSTANTS.ui.borderColor};
  border-radius: 3px;
  box-shadow: 1px 1px 5px ${CONSTANTS.ui.borderColor};
  margin: 10px;
  text-align: left;
  padding: 5px;
  color: grey;
`;


const Info = styled.div`
  width: calc(100% - 0px);
  padding: 5px 5px;
  color: ${CONSTANTS.ui.primaryColor};
  text-align:left;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${CONSTANTS.ui.borderColor};
`;

const Null = styled.div`
  padding: 5px;
  font-size: 10px;
  color: grey;
`;

class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftDelete: false,
      showConfirm: false,
      confirmMsg: 'Are you sure you want to remove the allotment?',
    };
    this.handleCancel = this.handleCancel.bind(this); // method to handle when user clicks cancel
    this.handleOk = this.handleOk.bind(this); // method to handle when user clicks ok
    this.onClose = this.onClose.bind(this);
  }

  handleCancel() {
    this.setState({
      showConfirm: false,
      confirmMsg: 'Are you sure you want to remove the allotment?',
    });
  }

  handleOk() {
    // console.log(this.state.tempId);
    if (this.state.shiftDelete) this.props.onClose();
    else this.props.reset(this.state.tempId);
    this.handleCancel();
  }

  onClose() {
    this.setState({
      confirmMsg: 'Are you sure you want to delete the shift along with allotments?',
      showConfirm: true,
      shiftDelete: true,
    });
  }

  render() {
    // console.log(this.props);
    return (
      <Layout
        className={this.props.className}
        style={{ ...this.props.shift }}
        onDrop={this.props.onDrop}
        onDragOver={this.props.onDragOver}
      >
        <Title>
          <Info>
            <FontAwesome name="clock-o" />
            &nbsp;
            {this.props.name}
            {(this.props.onClose) ? <FontAwesome name="times" style={{ color: 'red', float: 'right', cursor: 'pointer' }} onClick={this.onClose} /> : null}
          </Info>
        </Title>
        {
          (this.props.employees.length) ?
            (this.props.employees).map((employee, key) => <Employee
              onDragStart={(e) => this.props.onDragStart(e, employee.id)}
              key={key}
              name={employee.name}
              imgSrc={employee.image}
              lead={employee.lead}
              reset={() => this.setState({ showConfirm: true, tempId: employee.id })}
            />)
            :
            <Null>No technician alloted</Null>
        }
        <Confirm
          show={this.state.showConfirm}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          message={this.state.confirmMsg}
        />
      </Layout>
    );
  }
}

Shift.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

Shift.defaultProps = {
  className: '',
  style: {},
}

export default Shift;
