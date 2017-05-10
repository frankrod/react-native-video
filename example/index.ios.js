/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import VideoView from "./src/Video";

export default class videotest extends Component {

  render() {
    return (<VideoView />);
  }
}


AppRegistry.registerComponent('example', () => videotest);
