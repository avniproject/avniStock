import React, {useState} from 'react';
import {StyleSheet, TouchableNativeFeedback, View, Text} from 'react-native';
import {getService} from '../hooks/getService';
import EntityService from '../service/EntityService';
import Concept from '../models/reference/Concept';
import {t} from '../service/i18n/messages';
import {map, size} from 'lodash';
import Colors from '../styles/Colors';
import ErrorText from './ErrorText';

export default ({conceptName, onPress = () => {}, value, errorText}) => {
  const [concept, setConcept] = useState({});

  React.useEffect(() => {
    const concept = getService(EntityService).findByName(
      conceptName,
      Concept.schema.name,
    );
    setConcept(concept);
  }, [conceptName]);

  return (
    <View>
      <Text style={styles.label}>{t(conceptName)}</Text>
      {size(concept.answers) > 0 &&
        map(concept.answers, answer => {
          const isSelected = answer.concept.name === value;
          return (
            <View
              key={answer.uuid}
              style={{flexDirection: 'row', alignItems: 'center'}}
            >
              <View style={{flex: 1}}>
                <TouchableNativeFeedback
                  onPress={() => onPress(answer.concept.uuid)}
                >
                  <View
                    style={[
                      isSelected ? styles.selectedItem : styles.nonSelectedItem,
                    ]}
                  >
                    <Text
                      style={[
                        isSelected
                          ? styles.selectedAnswerText
                          : styles.nonSelectedAnswerText,
                      ]}
                    >
                      {t(answer.concept.name)}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          );
        })}
      <ErrorText errorText={errorText} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    marginTop: 6,
    fontSize: 14,
  },
  nonSelectedItem: {
    backgroundColor: '#F4F5F6',
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
    minHeight: 50,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
    minHeight: 50,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selectedAnswerText: {
    fontSize: 16,
    color: '#FFF',
  },
  nonSelectedAnswerText: {
    fontSize: 16,
    color: '#000',
  },
});
