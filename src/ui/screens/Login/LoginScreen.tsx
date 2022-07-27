import React, {FC, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import Input from '../../components/Input';

const LoginScreen: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
      <SafeAreaView style={style.container}>
        <Input value={email} onChange={setEmail}/>
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
