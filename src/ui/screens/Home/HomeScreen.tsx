import React, {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

import {logOut} from '../../../store/auth/authSlice';

import {useAppDispatch} from '../../../store/hooks';

const HomeScreen: FC = ({}) => {
  console.log('bla');
  const dispatch = useAppDispatch();
  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
      <TouchableOpacity onPress={onLogOut}>
        <Text>log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
