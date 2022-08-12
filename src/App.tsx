import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {RootNavigation} from './navigation/index';
import {Provider} from 'react-redux';
import store from './store';

const App: FC = () => {
  // return (
  //   <View>
  //     <Text>121212</Text>
  //   </View>
  // );
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
