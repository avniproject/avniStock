import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import SideMenu from './SideMenu';

const {width} = Dimensions.get('window');
export default function SideDrawer({show, navigation, setShow}) {
  const hideModal = () => setShow(false);
  return (
    <Modal
      isVisible={show}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      swipeDirection="left"
      useNativeDriver
      hideModalContentWhileAnimating
      propagateSwipe
      style={styles.sideMenuStyle}
    >
      <SideMenu navigation={navigation} hideDrawer={hideModal} />
    </Modal>
  );
}
const styles = StyleSheet.create({
  sideMenuStyle: {
    margin: 0,
    width: width * 0.75, // SideMenu width
  },
});
