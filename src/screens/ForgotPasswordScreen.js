import React, {useState, Fragment} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import _ from 'lodash';
import PasswordInput from '../components/PasswordInput';
import Spinner from '../components/Spinner';
import AuthService from '../service/AuthService';
import ErrorText from '../components/ErrorText';
import {getService} from '../hooks/getService';
import {t} from '../service/i18n/messages';

export default function ForgotPasswordScreen({navigation}) {
  const [username, setUsername] = useState();
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState({
    password: undefined,
    error: undefined,
  });
  const [cognitoUser, setCognitoUser] = useState();
  const [displayOtherOptions, setDisplayOtherOptions] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState();

  const OtpAndPassword = () => {
    return (
      <Fragment>
        <TextInput
          label={t('otp')}
          returnKeyType="next"
          value={otp}
          onChangeText={text => setOtp(text)}
          keyboardType="numeric"
        />
        <PasswordInput
          label={t('newPassword')}
          value={password}
          returnKeyType={'next'}
          onChange={text => setPassword(text)}
        />
        <PasswordInput
          label={t('confirmNewPassword')}
          value={confirmPassword.password}
          returnKeyType={'done'}
          errorText={confirmPassword.error}
          onChange={text =>
            setConfirmPassword(prevState => ({
              ...prevState,
              password: text,
              error: undefined,
            }))
          }
        />
        <Button
          mode="contained"
          onPress={onResetPassword}
          style={{marginTop: 16}}
        >
          {t('changePassword')}
        </Button>
      </Fragment>
    );
  };

  const onResetPassword = () => {
    if (!_.isEqual(password, confirmPassword.password)) {
      setConfirmPassword(prevState => ({
        ...prevState,
        error: 'passwordNotMatchError',
      }));
    } else {
      setShowSpinner(true);
      getService(AuthService)
        .verifyOtpAndSetPassword(cognitoUser, otp, password)
        .then(
          () => {
            setShowSpinner(false);
            // eslint-disable-next-line no-alert
            alert(t('passwordChangedMessage'));
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          },
          error => {
            setShowSpinner(false);
            setError(error.message);
          },
        );
    }
  };

  const sendOTP = () => {
    setShowSpinner(true);
    getService(AuthService)
      .forgotPassword(username)
      .then(
        response => {
          if (response.status === 'SUCCESS') {
            navigation.navigate('LoginScreen');
          }
          if (response.status === 'INPUT_VERIFICATION_CODE') {
            setShowSpinner(false);
            setCognitoUser(response.user);
            // eslint-disable-next-line no-alert
            alert(t('otpSentMessage'));
            setDisplayOtherOptions(true);
          }
        },
        error => {
          setShowSpinner(false);
          setError(error.message);
        },
      );
  };

  return (
    <Background>
      <Header>Restore Password</Header>
      <ErrorText errorText={error} />
      <TextInput
        label={t('username')}
        returnKeyType="next"
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {!displayOtherOptions && (
        <Button mode="contained" onPress={sendOTP} style={{marginTop: 16}}>
          {t('sendOtp')}
        </Button>
      )}
      {displayOtherOptions && OtpAndPassword()}
      <Spinner show={showSpinner} />
    </Background>
  );
}
