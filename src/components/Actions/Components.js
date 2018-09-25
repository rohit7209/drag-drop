import React from 'react';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import CONSTANTS from './../../constants';

// console.log(CONSTANTS);

export const Error = styled.span`
  font-size: 12px;
  color: red;
`;

export const Success = styled.span`
  font-size: 12px;
  color: green;
`;

export const Button = styled.button`
  color: white;
  background: ${CONSTANTS.ui.primaryColor};
  border: 1px solid ${CONSTANTS.ui.primaryColor};
  padding: 15px;
  min-width: 150px;
  cursor: pointer;
`;

export const Wrap = styled.span`
  text-align: center;
`;


export const LoaderIcon = () => <FontAwesome name="circle-o-notch" spin />;
