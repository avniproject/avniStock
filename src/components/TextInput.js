import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={Colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{t(description)}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{t(errorText)}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.surface,
  },
  description: {
    fontSize: 13,
    color: Colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.error,
    paddingTop: 8,
  },
});
