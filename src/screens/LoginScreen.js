import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Colors from '../styles/Colors';
import PasswordInput from '../components/PasswordInput';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onLoginPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
  };

  return (
    <Background>
      <Header>Avni Stock</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <PasswordInput
        label={'Password'}
        value={password}
        onChange={setPassword}
        returnKeyType={'done'}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: Colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
