import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';
import Sync from './Sync';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from './SearchBar';
import SideDrawer from './SideDrawer';

export default function AppBar({
  title = '',
  navigation,
  showBackButton,
  loginSync = false,
  productName,
  setProductName,
}) {
  const [displayDrawer, setDisplayDrawer] = React.useState(false);
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBackButton ? (
            <MaterialCommunityIcons
              name={'arrow-left'}
              style={styles.icon}
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.navigate('Product List')
              }
            />
          ) : (
            <MaterialCommunityIcons
              name={'menu'}
              style={styles.icon}
              onPress={() => setDisplayDrawer(p => !p)}
            />
          )}
          <Text style={styles.header}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!showBackButton && (
            <SearchBar value={productName} onchange={setProductName} />
          )}
          {!showBackButton && (
            <Sync navigation={navigation} loginSync={loginSync} />
          )}
        </View>
      </View>
      <SideDrawer
        navigation={navigation}
        show={displayDrawer}
        setShow={setDisplayDrawer}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    height: 60,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    color: Colors.text,
    paddingVertical: 12,
    opacity: 0.8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
});
