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

export default function ProductCard({name, unit, quantity, uuid, navigation}) {
  const onCardPress = () =>
    navigation.navigate('Product Details', {productUUID: uuid});

  const onEditPress = () =>
    navigation.navigate('Edit Product', {productUUID: uuid});

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableNativeFeedback onPress={onCardPress}>
          <View style={{flexDirection: 'row'}}>
            <View style={{alignSelf: 'center'}}>
              <Image
                source={require('../assets/medicine.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={{color: Colors.text}}>{name}</Text>
              <Text style={{lineHeight: 25}}>
                {quantity} {unit}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onEditPress}>
          <View style={{alignSelf: 'flex-end'}}>
            <FontAwesome name={'edit'} style={styles.icon} />
          </View>
        </TouchableNativeFeedback>
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
