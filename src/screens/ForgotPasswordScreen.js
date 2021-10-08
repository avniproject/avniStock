import React, {useState, Fragment} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import _ from 'lodash';
import PasswordInput from '../components/PasswordInput';

export default function ForgotPasswordScreen({navigation}) {
  const [username, setUsername] = useState();
  const [displayPassword, setDisplayPassword] = useState(false);
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState({
    password: undefined,
    error: undefined,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    password: undefined,
    error: undefined,
  });

  const OtpAndPassword = () => {
    return (
      <Fragment>
        <TextInput
          label="OTP"
          returnKeyType="next"
          value={otp}
          onChangeText={text => setOtp(text)}
          keyboardType="numeric"
        />
        <PasswordInput
          label={'New Password'}
          value={password.password}
          returnKeyType={'next'}
          onChange={text =>
            setPassword(prevState => ({
              ...prevState,
              password: text,
              error: undefined,
            }))
          }
        />
        <PasswordInput
          label={'Confirm new Password'}
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
          style={{marginTop: 16}}>
          Reset password
        </Button>
      </Fragment>
    );
  };

  const onResetPassword = () => {
    if (!_.isEqual(password.password, confirmPassword.password)) {
      setConfirmPassword(prevState => ({
        ...prevState,
        error: 'Password does not match with the entered password',
      }));
      return;
    }
    navigation.navigate('LoginScreen');
  };

  const sendOTP = () => {
    setDisplayPassword(true);
  };

  return (
    <Background>
      <Header>Restore Password</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      {!displayPassword && (
        <Button mode="contained" onPress={sendOTP} style={{marginTop: 16}}>
          Send OTP
        </Button>
      )}
      {displayPassword && OtpAndPassword()}
    </Background>
  );
}
