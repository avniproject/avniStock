import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <View style={{width: 150}}>
          <TextInput
            placeholder={t('search')}
            value={value}
            onChangeText={onchange}
            style={styles.textBox}
          />
        </View>
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
    height: 38,
    margin: 12,
    borderWidth: 0.5,
    backgroundColor: Colors.surface,
  },
});
