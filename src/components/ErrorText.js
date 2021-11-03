import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';

export default function ErrorText({errorText, ...props}) {
  return errorText ? <Text style={styles.error}>{t(errorText)}</Text> : null;
}
const styles = StyleSheet.create({
  error: {
    fontSize: 13,
    color: Colors.error,
    paddingTop: 8,
  },
});
