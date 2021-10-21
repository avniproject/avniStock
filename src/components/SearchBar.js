import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import Colors from '../styles/Colors';

export default function SearchBar({value, onchange}) {
  const [showTextBox, setShowTextBox] = React.useState(false);

  const onIconPress = () => {
    onchange();
    setShowTextBox(prevValue => !prevValue);
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {showTextBox ? (
        <TextInput
          placeholder={'Search'}
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
    width: 160,
    height: 40,
    backgroundColor: Colors.surface,
  },
});
