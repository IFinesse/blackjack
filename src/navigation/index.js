import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../ui/screens/Home/HomeScreen';
import LoginScreen from '../ui/screens/Login/LoginScreen';

// import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  console.log('bla2');

  const [user, setUser] = useState('null');

  function onAuthStateChanged(user) {
    setUser(user);
    // if (initializing) setInitializing(false);
  }

  //   useEffect(() => {
  //     console.log('blafff', auth());
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  return (
    <NavigationContainer>
      {user === null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
