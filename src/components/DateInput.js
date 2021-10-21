import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import General from '../utility/General';
import ErrorText from './ErrorText';

export default function DateInput({date, onDateChange, label, errorText}) {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, value) => {
    onDateChange(value);
    setShowPicker(Platform.OS === 'ios');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.pickedDateContainer}>
          <Text style={styles.pickedDate}>{General.toDisplayDate(date)}</Text>
        </View>
        <TouchableNativeFeedback onPress={() => setShowPicker(true)}>
          <MaterialCommunityIcons
            name={'calendar-month-outline'}
            style={styles.calendar}
          />
        </TouchableNativeFeedback>
      </View>
      {React.useMemo(() => {
        return showPicker ? (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={'default'}
            is24Hour={false}
            onChange={onChange}
          />
        ) : null;
      }, [showPicker])}
      <ErrorText errorText={errorText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
  },
  pickedDateContainer: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    height: 56,
    borderRadius: 5,
    borderColor: Colors.border,
    flex: 1,
  },
  pickedDate: {
    fontSize: 16,
    textAlignVertical: 'center',
    color: Colors.text,
    fontFamily: 'sans-serif',
    paddingHorizontal: 14,
    flexGrow: 1,
    textAlign: 'left',
  },
  calendar: {
    fontSize: 35,
    color: Colors.primary,
    marginLeft: 10,
  },
});
