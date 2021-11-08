import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import UserInfoService from '../service/UserInfoService';
import bugsnag from '../utility/bugsnag';
import {getService} from '../hooks/getService';

class ErrorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  restartApp() {
    RNRestart.Restart();
  }

  componentDidMount() {
    const {username} = getService(UserInfoService).getUserInfo();
    bugsnag.setUser(username, username, username);
    bugsnag.notify(this.props.error);
  }

  render() {
    const {visible} = this.state;
    return (
      <Provider>
        <Portal>
          <Dialog visible={visible} dismissable={false}>
            <Dialog.Title>{'Oops!!! Something went wrong'}</Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView>
                <Dialog.Content>
                  <Paragraph>{`Error message: ${this.props.error.message}`}</Paragraph>
                  <Paragraph>{`Error info: ${JSON.stringify(
                    this.props.info,
                  )}`}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={this.restartApp}>{'Restart app'}</Button>
                </Dialog.Actions>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </Provider>
    );
  }
}

export default ErrorView;
