import React, {FC, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import {useAppDispatch} from '../../../store/hooks';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {NavigationProp} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {signIn} from '../../../store/auth/authSlice';

interface Props {
  navigation: NavigationProp<any, any>;
}

const LoginScreen: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const deck = {
    suits: ['♥', '♠', '♣', '♦'],
    courts: ['J', 'Q', 'K', 'A'],
    [Symbol.iterator]: function* () {
      for (let suit of this.suits) {
        for (let i = 2; i <= 10; i++) yield suit + i;
        for (let c of this.courts) yield suit + c;
      }
    },
  };

  const onLoginHandler = () => {
    // useEffect(() => {
    //   return () => {
    //     setError(null);
    //     setEmail('');
    //     setPassword('');
    //   };
    // });

    if (email && password) {
      console.log('bla email', email, password);

      dispatch(signIn({email, password}));

      // auth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(response => {
      //     // console.log('User account created & signed in!', response);
      //     // setError(null);
      //     // navigation.navigate('Home');
      //   })
      //   .catch(error => {
      //     setError(error.code);
      //     // if (error.code === 'auth/email-already-in-use') {
      //     //   console.log('That email address is already in use!');
      //     // }

      //     // if (error.code === 'auth/invalid-email') {
      //     //   console.log('That email address is invalid!');
      //     // }

      //     console.error(error);
      //   });
    }
  };

  // console.log('blalalalal', [...deck], 'U+1F0AE');

  return (
    <SafeAreaView style={style.container}>
      {/* <Text>0x1f604</Text> */}
      <Input value={email} onChange={setEmail} placeholder="enter email" />
      <Input
        value={password}
        onChange={setPassword}
        placeholder="enter password"
      />
      <Button onPress={onLoginHandler} text="Login" />
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

export default LoginScreen;
