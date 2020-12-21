import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, KeyboardAvoidingView } from 'react-native';

export default function App() {

  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [offset] = useState (new Animated.ValueXY({x: 0, y:80}));
  const [opacity] = useState(new Animated.Value(0));

Animated.parallel([
  Animated.spring(offset.y,{
    toValue:0,
    speed:4,
    bounciness:20,
    useNativeDriver: true
  }),
  Animated.timing(opacity, {
    toValue:1 ,
    duration:2000, 
    useNativeDriver: true,
  })
]).start();


  function calculaImc(){
    const alt = altura / 100;
    const imc = peso / (alt * alt);

    if(imc < 18.6){
      alert('Você esta a baixo do peso'+ ' IMC =' + imc.toFixed(2))
    }else if (imc >= 18.6 && imc < 24.9){
      alert('Você esta com o peso ideal'+ ' IMC = ' + imc.toFixed(2))
    }else if (imc >= 14.9 && imc < 34.9){
      alert('Você esta a cima do peso ideal'+ ' IMC = ' + imc.toFixed(2))
    }else{alert('Valor Invalido')}
  }
  return (
    <KeyboardAvoidingView style={styles.background}>
      <Animated.View style={
        styles.container,
        {
          transform:[{
            translateY:offset.y
          }]
        }
      }>
        <View style={styles.containerTitulo}>
          <Text style={styles.titulo}>Calcula IMC</Text>
        </View>

        <View style={styles.containerInputs}>
          <TextInput style = {styles.inputPeso}
          placeholder = "Peso"
          value = {peso}
          autoCorrect = {false}
          onChangeText = {(peso) => setPeso(peso)}
          keyboardType = 'numeric'
          />
        
          <TextInput style = {styles.inputAltura}
          placeholder ="Altura"
          value = {altura}
          autoCorrect = {false}
          onChangeText = {(altura) => setAltura(altura)}
          keyboardType = 'numeric'
          />
        </View>

        <View style = {styles.containerSubmit}>
          <TouchableOpacity 
            style = {styles.btnSubmit}
            onPress = {calculaImc}>
          <Text style = {styles.submitText}>Acessar</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919'
  },
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitulo:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  titulo:{
    fontSize: 30,
    color: '#FFFF00',
  },
  containerInputs:{
    flex:1,
  },
  inputPeso:{
    marginBottom: 10,
    width: 250,
    padding: 10,
    backgroundColor:'white'
  },
  inputAltura:{
    width: 250,
    padding: 10,
    backgroundColor:'white',
    
  },
  containerSubmit:{
    flex:1,
    alignItems:'center',
  },
  btnSubmit:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 150,
  }
});
