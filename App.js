import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      c00: '-',
      c01: '-',
      c02: '-',
      c10: '-',
      c11: '-',
      c12: '-',
      c20: '-',
      c21: '-',
      c22: '-',
      showDialog: false,
      statusJogo: 0,
      codJogo: null,
      iniciado: false,
      jogada: 1
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  containerQrCode: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  texto: {
    fontSize: 65,
    borderWidth: 1,
    padding: 20
  }
});
