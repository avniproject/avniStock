import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {languageOptions, t} from '../service/i18n/messages';
import Colors from '../styles/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {useFocusEffect} from '@react-navigation/core';

export default ({currentLocale, onLocaleChange}) => {
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setLanguages(languageOptions);
      return () => {
        setOpen(false);
      };
    }, []),
  );

  const languageSchema = {
    label: 'label',
    value: 'locale',
  };

  return (
    <View style={styles.languageContainer}>
      <Text style={styles.label}>{t('selectLanguage')}</Text>
      <DropDownPicker
        schema={languageSchema}
        open={open}
        value={currentLocale}
        items={languages}
        setOpen={setOpen}
        setValue={value => onLocaleChange(value())}
        setItems={setLanguages}
        placeholder={'Select Language'}
        style={styles.container}
        listItemContainerStyle={{borderColor: Colors.border}}
        dropDownContainerStyle={{borderColor: Colors.border}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
  container: {
    borderColor: Colors.border,
  },
});
