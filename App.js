import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";

const config = {
  apiKey: "AIzaSyBeIddAWImMMQ3PKnq36mgwiGW6_mjh5L0",
  authDomain: "jogo-da-velha-85a1a.firebaseapp.com",
  databaseURL: "https://jogo-da-velha-85a1a.firebaseio.com",
  projectId: "jogo-da-velha-85a1a",
  storageBucket: "jogo-da-velha-85a1a.appspot.com",
  messagingSenderId: "916310862868"
};
firebase.initializeApp(config);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    /* status
    0: aguardando convidado
    1: minha vez
    2: vez do oponente */
    /* jogada
    1: criador
    2: convidado */
    this.state = {
      cells: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ],
      showDialog: false,
      statusJogo: 0,
      codJogo: null,
      iniciado: false,
      jogada: 1
    }
  }

  criar = () => {
    firebase.database().ref().push({
      cells: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ],
      criador: true,
      convidado: false,
      jogada: 0
    }).then((data) => {
      firebase.database().ref(data.key).on('value', (snapshot) => {
        const val = snapshot.val();
        this.setState(
          {
            cells: val.cells,
            statusJogo: val.jogada
          }
        );
        if (val.convidado && !this.state.convidado) {
          this.setState(
            {
              convidado: true,
              statusJogo: 1
            }
          );
        };
      });
      this.setState(
        {
          criador: true,
          codJogo: data.key,
          iniciado: true,
        });
    }).catch((error) => {
      console.log('error ', error)
    });
  };

  entrar = () => {
    this.setState({
      showDialog: true,
    });
  }
  entrarNoJogo = () => {
    this.setState(
      {
        showDialog: false,
      });
    firebase.database().ref(this.state.inputCodJogo + "/convidado").set(true);
    firebase.database().ref(this.state.inputCodJogo).on('value', (snapshot) => {
      const val = snapshot.val();
      this.setState(
        {
          cells: val.cells,
          statusJogo: val.jogada
        }
      );
    });
    this.setState(
      {
        convidado: true,
        criador: false,
        codJogo: this.state.inputCodJogo,
        iniciado: true,
      });
  }

  onPressCell = (row, column) => {
    const { criador, statusJogo, cells, codJogo } = this.state;
    const symbol = criador ? 'X' : 'O';

    if (statusJogo === (criador ? 1 : 2)) {
      const newCells = cells.slice();
      const newRow = newCells[row].slice();
      newRow.splice(column, 1, symbol);
      newCells.splice(row, 1, newRow);

      const db = firebase.database();
      db.ref(`${codJogo}/cells`).set(newCells);
      db.ref(`${codJogo}/jogada`).set(criador ? 2 : 1);
      this.setState({
        cells: newCells,
      });
    }
  }

  render() {
    const { cells, iniciado, showDialog, convidado, codJogo } = this.state;

    return (
      <View style={styles.container}>
        {iniciado ? (
          <View style={styles.container}>
            {convidado ? (
              <View style={styles.container}>
                {cells.map((row, index) => (
                  <View style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                    {row.map((cell, cIndex) => (
                      <TouchableOpacity
                        onPress={() => this.onPressCell(index, cIndex)}
                      >
                        <Text style={styles.texto}>{cell}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            ) : (
                <View style={styles.containerQrCode}>
                  <QRCode value={codJogo} size={200} />
                </View>
              )
            }
          </View>) :
          (
            <View style={styles.container}>
              <TouchableOpacity onPress={this.criar}>
                <Text style={styles.texto}>Criar Jogo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.entrar}>
                <Text style={styles.texto}>Entrar em um Jogo</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <Dialog.Container visible={showDialog}>
          <Dialog.Title>Entrar no Jogo</Dialog.Title>
          <Dialog.Description>
            Digite abaixo o código do Jogo
          </Dialog.Description>
          <Dialog.Input
            onChangeText={inputCodJogo => this.setState({ inputCodJogo })}
          />
          <Dialog.Button label="ENTRAR" onPress={this.entrarNoJogo} />
        </Dialog.Container>
      </View >
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
