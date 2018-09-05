import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './../../constants';

const Layout = styled.div`
  width: 150px;
  height: 50px;
  cursor: move;
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 3px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  margin: 10px;
  overflow: hidden;
  display:flex;
  text-align: center;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  padding: 10px;
  background: ${CONSTANTS.ui.primaryColor};
  color: white;
`;

const Info = styled.div`
  width: 100px;
  height: 50px;
  padding: 15px 5px;
  color: rgb(55, 150,198);
`;

class Shift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout
        className={this.props.className}
        style={{ ...this.props.shift }}
        draggable={this.props.draggable}
        onDragStart={this.props.onDragStart}
      >
        <Icon><FontAwesome name="clock-o" size="2x" /></Icon>
        <Info>
          {this.props.name}
        </Info>
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
