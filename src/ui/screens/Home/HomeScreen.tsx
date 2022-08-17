import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import {logOut} from '../../../store/auth/authSlice';

import {useAppDispatch} from '../../../store/hooks';

const HomeScreen: FC = ({navigation}) => {
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
      <View style={styles.imageContainer}>
        {/* <Text>image</Text> */}
        <Image
          source={require('../../../../assets/vegasLogo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>Minimum stack: 1$ </Text>
          <Text style={[styles.descriptionText, {fontSize: 11}]}>
            Minimum bet: 1$
          </Text>
          <Text
            style={[styles.descriptionText, {fontSize: 11, marginBottom: 9}]}>
            Maximum bet: 500$
          </Text>
          <Text style={styles.descriptionText}>Card decks: 4</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LinearGradient colors={['#FFA500', '#FF7F10']} style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Game')}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    fontFamily: 'SourceCodePro-Regular',
  },
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 1.7,
    height: Dimensions.get('window').height / 4.5,
  },
  descriptionContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  description: {
    backgroundColor: 'rgba(0,0,0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  descriptionText: {
    color: 'white',
    fontFamily: 'SourceCodePro-Bold',
    fontSize: 12,
  },
  buttonContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
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
