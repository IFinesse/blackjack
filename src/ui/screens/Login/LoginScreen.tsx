import React, {FC, useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  console.log('blalalalal', [...deck], 'U+1F0AE');

  return (
    <SafeAreaView style={style.container}>
      <Text>0x1f604</Text>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="enter email 0x1F600"
      />
      <Input
        value={password}
        onChange={setPassword}
        placeholder="enter password"
      />
      <Button onPress={() => {}} />
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
