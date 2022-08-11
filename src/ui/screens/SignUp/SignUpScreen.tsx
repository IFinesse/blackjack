import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAppDispatch} from '../../../store/hooks';
import auth from '@react-native-firebase/auth';

import {NavigationProp} from '@react-navigation/native';

import {signUp} from '../../../store/auth/authSlice';

interface Props {
  navigation: NavigationProp<any, any>;
}

const SignUpScreen: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();
  // const deck = {
  //   suits: ['♥', '♠', '♣', '♦'],
  //   courts: ['J', 'Q', 'K', 'A'],
  //   [Symbol.iterator]: function* () {
  //     for (let suit of this.suits) {
  //       for (let i = 2; i <= 10; i++) yield suit + i;
  //       for (let c of this.courts) yield suit + c;
  //     }
  //   },
  // };

  const onSignUpHandler = () => {
    // useEffect(() => {
    //   return () => {
    //     setError(null);
    //     setEmail('');
    //     setPassword('');
    //   };
    // });

    if (email && password) {
      console.log('bla email', email, password);

      dispatch(signUp({email, password}));
    }
  };

  // console.log('blalalalal', [...deck], 'U+1F0AE');

  return (
    <SafeAreaView style={style.container}>
      {/* <Text>Sign Up</Text> */}
      <Input
        value={email}
        onChange={text => setEmail(text)}
        placeholder="enter email"
      />
      <Input
        value={password}
        onChange={text => setPassword(text)}
        placeholder="enter password"
      />
      <Button onPress={onSignUpHandler} text="Sign Up" />
      <Button onPress={() => navigation.navigate('Login')} text="go to login" />
      {error && <Text>{error}</Text>}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
