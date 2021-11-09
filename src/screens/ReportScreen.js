import React, {Fragment, useCallback} from 'react';
import AppBar from '../components/AppBar';
import {useDispatch, useSelector} from 'react-redux';
import {reportActions, reports} from '../reducers/ReportReducer';
import _ from 'lodash';
import {ScrollView, SafeAreaView} from 'react-native';
import Colors from '../styles/Colors';
import ReportTab from '../components/ReportTab';
import {useFocusEffect} from '@react-navigation/core';
import RestockReport from '../components/RestockReport';
import ExpiredReport from '../components/ExpiredReport';

const tabToReportMap = Object.freeze({
  [reports.restock]: RestockReport,
  [reports.expired]: ExpiredReport,
});

const ReportScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {tabs, currentTab} = useSelector(storeState => storeState.reports);
  const ReportComponent = tabToReportMap[currentTab];

  useFocusEffect(
    useCallback(() => {
      dispatch({type: reportActions.ON_LOAD});
      return () => {};
    }, [dispatch]),
  );

  return (
    <Fragment>
      <AppBar title={'reports'} navigation={navigation} />
      <SafeAreaView style={{height: 50}}>
        <ScrollView horizontal style={{backgroundColor: Colors.surface}}>
          {_.map(tabs, tab => (
            <ReportTab
              key={tab}
              tab={tab}
              onPress={() => dispatch({type: reportActions.ON_TAB_CHANGE, tab})}
              isSelected={tab === currentTab}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <ReportComponent navigation={navigation} />
    </Fragment>
  );
};

export default ReportScreen;
