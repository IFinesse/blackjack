import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';

import {logOut} from '../../../store/auth/authSlice';

import {useAppDispatch} from '../../../store/hooks';

const HomeScreen: FC = ({}) => {
  const dispatch = useAppDispatch();

  // const [winner, setWinner] = useState('');
  const onLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {}, []);

  return (
    <ImageBackground
      source={require('../../../../assets/vegas.png')}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar hidden={true} />
      {/* <Text>Home</Text> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.headerItemContainer}>
          <Text style={styles.text}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogOut} style={styles.headerItemContainer}>
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>LAS VEGAS CASINO</Text>
      </View>
      <View style={styles.image}>
        <Text>image</Text>
      </View>
      <View style={styles.description}>
        <Text>min stack: </Text>
        <Text>min bet</Text>
        <Text>image</Text>
        <Text>image</Text>
      </View>
      <View style={styles.playButton}>
        <TouchableOpacity onPress={() => {}}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.amount}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.amountText}>$100000</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 13,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerItemContainer: {
    padding: 6,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
  title: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 23,
    color: '#FFF',
    fontWeight: '500',
  },
  image: {
    flex: 5,
  },
  description: {
    flex: 3,
  },
  playButton: {
    flex: 3,
  },
  amount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
  },
});

export default HomeScreen;
