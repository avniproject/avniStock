import React from 'react';
import DatePicker from 'react-native-date-picker';

export default function DateInput({date, onDateChange, ...props}) {
  return <DatePicker date={date} onDateChange={onDateChange} />;
}
