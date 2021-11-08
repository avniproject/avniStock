import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, Avatar, Paragraph} from 'react-native-paper';
import Separator from './Separator';
import {getService} from '../hooks/getService';
import UserInfoService from '../service/UserInfoService';
import _ from 'lodash';
import Colors from '../styles/Colors';
import {t} from '../service/i18n/messages';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SideMenu({navigation, hideDrawer}) {
  const userInfo = getService(UserInfoService).getUserInfo();
  const onLogout = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>{userInfo.catchmentName || ''}</Text>
      <Separator style={styles.separator} />
      <View style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            hideDrawer();
            navigation.navigate('Change Language');
          }}
        >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.listItem}>
              <Icon style={styles.icon} name="language" size={25} />
              <Text style={styles.listItemText}>{t('changeLanguage')}</Text>
            </View>
            <Icon style={styles.icon} name="arrow-forward" size={25} />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.bottomContainer}>
          <Separator style={styles.separator} />
          <View style={styles.useInfoContainer}>
            <Avatar.Text size={30} label={_.head(userInfo.username)} />
            <Paragraph style={{marginLeft: 10}}>{userInfo.username}</Paragraph>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableNativeFeedback onPress={onLogout}>
              <View>
                <Text style={styles.logout}>{t('logout')}</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    margin: 12,
    flex: 1,
  },
  title: {
    padding: 12,
    marginTop: 15,
    marginBottom: 10,
    color: '#444',
    fontSize: 25,
  },
  separator: {
    height: 2,
    backgroundColor: Colors.background,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 10,
  },
  useInfoContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    color: Colors.primary,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.text,
    width: '70%',
  },
  icon: {
    color: Colors.border,
    paddingLeft: 5,
  },
});
