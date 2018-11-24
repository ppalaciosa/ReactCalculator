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

  constructor(props) {
    super(props);

    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    }
  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }

  // Generating grid of buttons
  _renderInputButtons() {
    const views = [];

    for (let r = 0; r < inputButtons.length; r ++) {
      const row = inputButtons[r];

      const inputRow = [];
      for (let i = 0; i < row.length; i ++) {
        const input = row[i];

        inputRow.push(
          <InputButton value={input}
                       highlight={this.state.selectedSymbol === input}
                       onPress={this._onInputButtonPressed.bind(this, input)}
                       key={r + "-" + i} />
        );
      }

      views.push(<View style={Style.inputRow} key={"row-" + r}>
                   {inputRow}
                 </View>)
    }

    return views;
  } 

  // Catches the value of the button
  _onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this._handleNumberInput(input)
      case 'string':
        return this._handleStringInput(input)
    }
  }

  // Changes states that are not numbers
  _handleStringInput(str) {
    switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
        // For these cases, set screen to 0
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        const symbol = this.state.selectedSymbol,
        inputValue = this.state.inputValue,
        previousInputValue = this.state.previousInputValue;

        // In case there is no symbol, do nothing
        if (!symbol) {
          return;
        }

        this.setState({
          previousInputValue: 0,
          // Performing the calculation
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;

    }
  }

  // Changes the state 'inputValue'. Updates the screen
  _handleNumberInput(num) {
    const inputValue = (this.state.inputValue * 10) + num;

    this.setState({
      inputValue: inputValue
    })
  }

}


AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);
