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
import LinearGradient from 'react-native-linear-gradient';
import {logOut} from '../../../store/auth/authSlice';
import {NavigationProp} from '@react-navigation/native';

import {useAppDispatch} from '../../../store/hooks';

interface Props {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: FC<Props> = ({navigation}) => {
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
          <Image
            source={require('../../../../assets/cup.png')}
            resizeMode="cover"
            style={styles.icon}
          />
          <Text style={styles.text}>Achievements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.headerItemContainer}>
          <Image
            source={require('../../../../assets/profile.png')}
            resizeMode="cover"
            style={styles.icon}
          />
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
      <ImageBackground
        source={require('../../../../assets/wood1.jpeg')}
        resizeMode="center"
        style={styles.amountContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.amount}>
          {/* <Text style={styles.amountText}>$100000</Text> */}
          <Image
            source={require('../../../../assets/chip2.png')}
            style={styles.chipLogo}
          />
          <Text style={styles.amountText}>$1000000</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.plusContainer}>
          <LinearGradient
            colors={['#FF7F10', '#FFD700', '#FF7F10']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.plus}>
            <Text style={{fontSize: 19, padding: 0}}>+</Text>
          </LinearGradient>
          <View style={styles.plusNotification}>
            <Text
              style={{
                color: 'white',
                fontSize: 9,
                fontFamily: 'SourceCodePro-Bold',
                position: 'relative',
                // left: 1,
                top: -1,
              }}>
              1
            </Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
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
    fontFamily: 'SourceCodePro-SemiBold',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#000',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
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
    paddingHorizontal: 50,
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  amount: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#000',
  },
  amountContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  amountText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
    paddingHorizontal: 25,
    paddingVertical: 3,
  },
  chipLogo: {
    width: 24,
    height: 24,
    position: 'absolute',
    zIndex: 5,
    left: -15,
    top: -1,
  },
  plusContainer: {
    marginLeft: 6,
  },
  plus: {
    width: 24,
    height: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusNotification: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    left: 18,
    top: -6,
  },
});

export default HomeScreen;
