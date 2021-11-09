import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';
import _ from 'lodash';

export default function ProductCard({
  name,
  unit,
  quantity,
  uuid,
  navigation,
  restockLevel,
  displayRestockLevel,
  moreProductInfo = [],
  disableEdit = false,
  customCardPress,
}) {
  const onCardPress = () => {
    return _.isFunction(customCardPress)
      ? customCardPress()
      : navigation.navigate('Product Details', {productUUID: uuid});
  };

  const onEditPress = () =>
    navigation.navigate('Edit Product', {productUUID: uuid});

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableNativeFeedback onPress={onCardPress}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('../assets/medicine.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{color: Colors.text}}>{name}</Text>
              {!_.isNil(quantity) && (
                <Text style={{lineHeight: 25}}>
                  {quantity} {unit}
                </Text>
              )}
              {displayRestockLevel && (
                <Text style={{lineHeight: 25}}>
                  {t('restockLevel')} : {restockLevel} {unit}
                </Text>
              )}
              {_.map(moreProductInfo, info => (
                <Text key={info} style={{lineHeight: 25}}>
                  {info}
                </Text>
              ))}
            </View>
          </View>
        </TouchableNativeFeedback>
        {!disableEdit && (
          <TouchableNativeFeedback onPress={onEditPress}>
            <View style={{alignSelf: 'flex-end'}}>
              <FontAwesome name={'edit'} style={styles.icon} />
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: Colors.surface,
    padding: 10,
    elevation: 1,
    marginHorizontal: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  textContainer: {
    marginLeft: 8,
    flexDirection: 'column',
  },
  image: {
    height: 50,
    width: 50,
  },
  icon: {
    fontSize: 20,
    color: Colors.text,
    opacity: 0.9,
  },
});
