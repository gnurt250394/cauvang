import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Container from 'library/Container';
import InputOtp from './InputOtp';

class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <InputOtp />
      </Container>
    );
  }
}

export default OtpScreen;
