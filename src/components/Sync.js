import General from '../utility/General';
import AuthenticationError from '../service/error/AuthenticationError';
import ServerError from '../service/error/ServerError';
import {Alert, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import _ from 'lodash';
import SyncService from '../service/SyncService';
import EntityMetaData from '../models/framework/EntityMetaData';
import SyncError from '../service/error/SyncError';
import React, {useCallback} from 'react';
import SyncProgressBar from './SyncProgressBar';
import {syncActions} from '../reducers/SyncReducer';
import {useDispatch, useSelector} from 'react-redux';
import {getService} from '../hooks/getService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Badge from './Badge';
import Colors from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/core';
import EntityQueueService from '../service/EntityQueueService';

export default function Sync({navigation, loginSync}) {
  const dispatch = useDispatch();
  const state = useSelector(storeState => storeState.sync);
  const netInfo = useNetInfo();
  const [syncCount, setSyncCount] = React.useState(0);

  useFocusEffect(
    useCallback(() => {
      setSyncCount(getService(EntityQueueService).getTotalQueueCount());
      return () => {};
    }, []),
  );

  React.useEffect(() => {
    if (loginSync) {
      const skipConnectCheck = true;
      startSync(skipConnectCheck);
    }
  }, [loginSync]);

  function _preSync() {
    dispatch({type: syncActions.PRE_SYNC});
  }

  function progressBarUpdate(progress) {
    dispatch({type: syncActions.ON_UPDATE, progress});
  }

  function messageCallBack(message) {
    dispatch({type: syncActions.ON_MESSAGE_CALLBACK, message});
  }

  function _postSync() {
    dispatch({type: syncActions.POST_SYNC});
    dispatch({type: 'RESET'});
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen', params: {loginSync: false}}],
    });
  }

  function _onError(error, ignoreBugsnag) {
    General.logError('Sync', error);
    const isServerError = error instanceof ServerError;
    dispatch({type: syncActions.ON_ERROR});
    if (
      error instanceof AuthenticationError &&
      error.authErrCode !== 'NetworkingError'
    ) {
      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    } else if (!netInfo.isConnected) {
      errorAlert('Internet connection error');
    } else if (isServerError) {
      error.errorText.then(errorMessage =>
        errorAlert(errorMessage, error.errorCode),
      );
    } else if (error instanceof SyncError) {
      errorAlert(error.errorText, error.errorCode);
    } else {
      const errorMessage = error.message || 'Unknown error occurred';
      errorAlert(errorMessage);
    }
  }

  function errorAlert(errorMessage, errorCode) {
    const message = errorCode
      ? `Error Code : ${errorCode}\nMessage : ${errorMessage}`
      : errorMessage;
    Alert.alert('Sync Error', message, [
      {
        text: 'Try again',
        onPress: () => startSync(),
      },
      {text: 'Cancel', onPress: _.noop, style: 'cancel'},
    ]);
  }

  function startSync(skipConnectCheck) {
    if (skipConnectCheck || netInfo.isConnected) {
      _preSync();
      getService(SyncService)
        .sync(
          EntityMetaData.model(),
          progress => progressBarUpdate(progress),
          message => messageCallBack(message),
        )
        .catch(_onError);
    } else {
      const ignoreBugsnag = true;
      _onError(new Error('internetConnectionError'), ignoreBugsnag);
    }
  }

  return (
    <React.Fragment>
      <TouchableNativeFeedback onPress={() => startSync()}>
        <View>
          <Badge
            number={syncCount}
            component={<FontAwesome5 name={'sync'} style={styles.icon} />}
          />
        </View>
      </TouchableNativeFeedback>
      <SyncProgressBar
        progress={state.progress}
        message={state.message}
        syncing={state.syncing}
        onPress={_postSync}
        notifyUserOnCompletion={true}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    color: Colors.text,
    opacity: 0.8,
    marginRight: 15,
  },
});
