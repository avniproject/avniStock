import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';

export default function SearchBar({value, onchange}) {
  const [showTextBox, setShowTextBox] = React.useState(false);

  const onIconPress = () => {
    onchange();
    setShowTextBox(prevValue => !prevValue);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
      {showTextBox ? (
        <TextInput
          placeholder={t('search')}
          mode={'outlined'}
          value={value}
          onChangeText={onchange}
          style={styles.textBox}
        />
      ) : null}
      <TouchableNativeFeedback onPress={onIconPress}>
        <View>
          <MaterialCommunityIcons
            name={showTextBox ? 'close' : 'magnify'}
            size={30}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    width: 150,
    height: 35,
    backgroundColor: Colors.surface,
  },
});
