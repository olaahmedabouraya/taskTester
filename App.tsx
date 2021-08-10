/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import HomeScreen from './src/Screens/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
     <View style={{flex: 1, backgroundColor: 'white'}}>
       <HomeScreen />
     </View>
    );
  }
}

