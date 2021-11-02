import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createStore} from 'redux';
import rootReducer from './src/reducers';
import Navigator from './src/framework/Navigator';
import {Provider} from 'react-redux';
import Realm from 'realm';
import Schema from './src/models/Schema';
import BeanRegistry from './src/framework/bean/BeanRegistry';
import AuthService from './src/service/AuthService';
import Spinner from './src/components/Spinner';
import {NavigationContainer} from '@react-navigation/native';
import EntitySyncStatusService from './src/service/EntitySyncStatusService';
import EntityMetaData from './src/models/framework/EntityMetaData';
import {LogBox} from 'react-native';
import UserInfoService from './src/service/UserInfoService';
import {changeLanguage, getCurrentLocale} from './src/service/i18n/messages';

// In models there is many cyclic uses of classes. Ignoring those logs for now
LogBox.ignoreLogs(['Require cycle:']);
let beans, db;
const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};
const store = createStore(rootReducer);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {userExists: false, loadApp: false};
    if (db === undefined) {
      db = new Realm(Schema);
      beans = BeanRegistry.init(db, this);
    }
    beans.get(EntitySyncStatusService).setup(EntityMetaData.model());
    beans
      .get(AuthService)
      .userExists()
      .then(exists => this.setState({userExists: exists, loadApp: true}));
    const currentLocale = beans.get(UserInfoService).getUserSettings().locale;
    changeLanguage(currentLocale);
  }

  render() {
    return this.state.loadApp ? (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Navigator userExists={this.state.userExists} />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    ) : (
      <Spinner show={!this.state.loadApp} />
    );
  }
}

export default App;
//export default from './storybook';
