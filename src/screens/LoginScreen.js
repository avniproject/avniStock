import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Colors from '../styles/Colors';
import PasswordInput from '../components/PasswordInput';
import {useSelector, useDispatch} from 'react-redux';
import {loginActions} from '../reducers/LoginReducer';
import ErrorText from '../components/ErrorText';
import {getService} from '../hooks/getService';
import SettingsService from '../service/SettingsService';
import {t} from '../service/i18n/messages';
import Spinner from '../components/Spinner';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.login);
  const isDev = getService(SettingsService).isDev();

  const onLoginPressed = () => {
    const nextSteps = {
      success: () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen', params: {loginSync: true}}],
        }),
      resetPassword: cognitoUser =>
        navigation.navigate('ResetPasswordScreen', {cognitoUser}),
      failure: error => dispatch({type: loginActions.ON_ERROR, error}),
    };
    dispatch({type: loginActions.ON_LOGIN_START, nextSteps});
  };

  return (
    <Background>
      <Header>{t('avniStock')}</Header>
      <ErrorText errorText={state.loginError} />
      <TextInput
        label={t('username')}
        returnKeyType="next"
        value={state.userId}
        onChangeText={userId =>
          dispatch({type: loginActions.ON_USER_ID_CHANGE, userId})
        }
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {!isDev && (
        <PasswordInput
          label={t('password')}
          value={state.password}
          onChange={password =>
            dispatch({type: loginActions.ON_PASSWORD_CHANGE, password})
          }
          returnKeyType={'done'}
        />
      )}
      {!isDev && (
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.forgot}>{t('forgotPassword')}</Text>
          </TouchableOpacity>
        </View>
      )}
      {!state.loggingIn && (
        <Button mode="contained" onPress={onLoginPressed}>
          {t('login')}
        </Button>
      )}
      <Spinner show={state.loggingIn} />
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
