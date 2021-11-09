import {Button, Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeepAwake from 'react-native-keep-awake';
import Colors from '../styles/Colors';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {t} from '../service/i18n/messages';

const {width} = Dimensions.get('window');

export default function SyncProgressBar({
  onPress,
  progress,
  message,
  syncing,
  notifyUserOnCompletion,
}) {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      onRequestClose={_.noop}
      visible={syncing}
    >
      <KeepAwake />
      <View style={styles.syncContainerStyle} key={`spinner_${Date.now()}`}>
        <View style={{flex: 0.4}} />
        <View style={styles.syncBackground}>
          <View style={{flex: 0.9}}>
            <View>
              {progress < 1 ? (
                <View>
                  <Text style={styles.syncTextContent}>{t(message)}</Text>
                  <ProgressBar
                    styleAttr="Horizontal"
                    progress={progress}
                    indeterminate={false}
                    color="white"
                  />
                  <Text style={styles.percentageText}>
                    {(progress * 100).toFixed(0)}%
                  </Text>
                </View>
              ) : notifyUserOnCompletion ? (
                <View>
                  <View style={styles.container}>
                    <Text style={styles.percentageText}>
                      {t('syncComplete')}
                    </Text>
                    <Icon name="check-circle" size={16} style={styles.icon} />
                  </View>
                  <View style={{paddingTop: 20}}>
                    <Button
                      title={t('ok')}
                      color={Colors.green}
                      onPress={() => onPress()}
                    />
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  syncContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  syncBackground: {
    width: width * 0.7,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  syncTextContent: {
    lineHeight: 30,
    color: '#FFF',
    minHeight: 50,
  },
  percentageText: {
    color: '#FFF',
    textAlign: 'center',
  },
  icon: {
    color: Colors.green,
    marginLeft: 5,
  },
});
