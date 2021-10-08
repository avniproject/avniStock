import {TextInput as PaperTextInput} from 'react-native-paper';
import TextInput from './TextInput';
import React, {useState} from 'react';

export default function PasswordInput({
  label,
  returnKeyType,
  value,
  onChange,
  ...props
}) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const onEyePress = () => setSecureTextEntry(prevValue => !prevValue);

  return (
    <TextInput
      label={label}
      returnKeyType={returnKeyType}
      value={value}
      onChangeText={text => onChange(text)}
      secureTextEntry={secureTextEntry}
      right={
        <PaperTextInput.Icon
          name={secureTextEntry ? 'eye-off' : 'eye'}
          onPress={onEyePress}
        />
      }
      {...props}
    />
  );
}
