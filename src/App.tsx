import React, {FC} from 'react';
import {RootNavigation} from './navigation/index';
import {Provider} from 'react-redux';
import store from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
