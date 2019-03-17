import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode';
import * as firebase from 'firebase';
import Dialog from "react-native-dialog";

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
    const { c00, c01, c02, c10, c11, c12, c20, c21, c22, iniciado, showDialog, convidado, codJogo } = this.state;
    return (
      <View style={styles.container}>
        {iniciado ? (
          <View style={styles.container}>
            {convidado ? (
              <View style={styles.container}>
                <View style={{
                  justifyContent: 'space-around',
                  flexDirection: 'row'
                }}>
                  <TouchableOpacity onPress={this.onPress00}>
                    <Text style={styles.texto}>{c00}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress01}>
                    <Text style={styles.texto}>
                      {c01}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress02}>
                    <Text style={styles.texto}>
                      {c02}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={this.onPress10}>
                    <Text style={styles.texto}>
                      {c10}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress11}>
                    <Text style={styles.texto}>
                      {c11}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress12}>
                    <Text style={styles.texto}>
                      {c12}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={this.onPress20}>
                    <Text style={styles.texto}>
                      {c20}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress21}>
                    <Text style={styles.texto}>
                      {c21}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onPress22}>
                    <Text style={styles.texto}>
                      {c22}
                    </Text>
                  </TouchableOpacity>
                </View>
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
