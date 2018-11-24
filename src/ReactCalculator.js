import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry
} from 'react-native';
import {name as appName} from '../app.json';
import Style from './Style';
import InputButton from './InputButton';

const inputButtons = [
  [1,2,3,'/'],
  [4,5,6,'*'],
  [7,8,9,'-'],
  [0,'.','=','+']
];

class ReactCalculator extends Component {

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}></View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }

  _renderInputButtons() {
    const views = [];

    for (const r = 0; r < inputButtons.length; r ++) {
      const row = inputButtons[r];

      const inputRow = [];
      for (const i = 0; i < row.length; i ++) {
        const input = row[i];

        inputRow.push(
          <InputButton value={input} key={r + "-" + i} />
        );
      }

      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }

    return views;
  }
}


AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);
