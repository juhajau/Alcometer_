import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { RadioButton } from 'react-native-paper';
import { Alert } from 'react-native';

const App = () => {
  const [bottles, setBottles] = useState(0);
  const [weight, setWeight] = useState('');
  const [timeSinceDrinking, setTimeSinceDrinking] = useState('');
  const [bacResult, setBACResult] = useState('');
  const [isLightTheme, setIsLightTheme] = useState(true); 
  const [radioval, setRadioval] = useState('male'); 
  const [bacResultColor, setBACResultColor] = useState('green');

  const calculateBAC = () => {
    if (!weight.trim()) {
      Alert.alert('Warning', 'Please enter your weight.');
      return;
    }

    const litres = parseFloat(bottles) * 0.33;
    const grams = litres * 8 * 4.5;
    const burning = parseFloat(weight) / 10;
    const gramsLeft = grams - burning * parseFloat(timeSinceDrinking);

    let result;
    if (radioval === 'male') {
      result = gramsLeft / (parseFloat(weight) * 0.7);
    } else if (radioval === 'female') {
      result = gramsLeft / (parseFloat(weight) * 0.6);
    }

    // Result cant be negative
    if (result < 0) {
      result = 0;
    }

    // Result color
    let textColor = 'green'; 

    if (result >= 0.5 && result <= 1.0) {
      textColor = 'yellow';
    } else if (result > 1.0) {
      textColor = 'red';
    }

   //Calculate results and color
    setBACResult(result.toFixed(2));
    setBACResultColor(textColor); 
  };

  //Theme
  const toggleTheme = () => {
    setIsLightTheme((prevTheme) => !prevTheme);
  };

  // theme styles
  const themeStyles = isLightTheme ? lightStyles : darkStyles; 

  return (
    <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
      <Switch
        style={styles.themeSwitch}
        value={isLightTheme}
        onValueChange={toggleTheme}
      />

      <Text style={[styles.title, themeStyles.title]}>Alcometer</Text>

      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder="Weight (in kilograms)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={[styles.inputLabel, themeStyles.inputLabel]}>Number of beer bottles</Text>
          <NumericInput value={bottles} onChange={setBottles} />
        </View>
        <View style={styles.inputRow}>
          <Text style={[styles.inputLabel, themeStyles.inputLabel]}>Time since drinking</Text>
          <NumericInput value={parseFloat(timeSinceDrinking)} onChange={setTimeSinceDrinking} />
        </View>
      </View>
      
      <View style={styles.radioContainer}>
        <View style={styles.radioItem}>
          <RadioButton.Android
            value="male"
            status={radioval === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setRadioval('male')} //Male when press
            color="#007bff"
          />
          <Text style={styles.radioLabel}>Male</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton.Android
            value="female"
            status={radioval === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setRadioval('female')} //Female when press
            color="#007bff"
          />
          <Text style={styles.radioLabel}>Female</Text>
        </View>
      </View>

      <Text style={[styles.result, themeStyles.result, { color: bacResultColor }]}>{bacResult}</Text>

      <TouchableOpacity style={[styles.calculateButton, themeStyles.calculateButton]} onPress={calculateBAC}>
        <Text style={[styles.buttonText, themeStyles.buttonText]}>Calculate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'aquamarine',
    width: '40%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  calculateButton: {
    backgroundColor: 'aquamarine',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  result: {
    marginTop: 20,
    fontSize: 30,
    color: 'green',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
  },
  radioColor: {
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: 'aquamarine',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'lightblue',
    color: 'black',
    width: '40%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  calculateButton: {
    backgroundColor: 'lightblue',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  result: {
    marginTop: 20,
    fontSize: 30,
    color: 'green',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    marginBottom: 5,
  },
  radioColor: {
    color: 'black',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginLeft: 8,
  },
  themeSwitch: {
    position: 'absolute',
    top: 150,
    left: 20,
  },
});

export default App;
