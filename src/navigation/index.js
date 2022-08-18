import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../ui/screens/Home/HomeScreen';
import GameScreen from '../ui/screens/Game/GameScreen';
import LoginScreen from '../ui/screens/Login/LoginScreen';
import SignUpScreen from '../ui/screens/SignUp/SignUpScreen';

import auth from '@react-native-firebase/auth';

import {useAppSelector} from '../store/hooks';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  const [user, setUser] = useState(null);

  const isUserSignedIn = useAppSelector(state => state.auth.isSignedIn);

  useEffect(() => {
    const user = auth().currentUser;
    console.log('bla user', user);
    if (user) {
      setUser(true);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <NavigationContainer>
      {!isUserSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
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
