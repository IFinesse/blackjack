import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {logOut} from '../../../store/auth/authSlice';

import {useAppDispatch} from '../../../store/hooks';

import Button from '../../components/Button';

const GameScreen: FC = ({}) => {
  const dispatch = useAppDispatch();

  // const [winner, setWinner] = useState('');
  const onLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {}, []);

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

  console.log('bla', [...deck]);

  const randomDeck = [...deck].sort((a, b) => 0.5 - Math.random());

  const dealerCards = [randomDeck.pop(), randomDeck.pop()];
  console.log('blad', dealerCards, randomDeck);

  const playerCards = [randomDeck.pop(), randomDeck.pop()];
  console.log('blad2', playerCards, randomDeck);

  console.log('bla r', randomDeck);

  function calculateWinner(dealerCards, playerCards) {
    let winner = '';
    if (checkSum(dealerCards) > checkSum(playerCards)) {
      winner = 'dealer';
    } else if (checkSum(dealerCards) < checkSum(playerCards)) {
      winner = 'you';
    } else {
      winner = 'push';
    }

    return winner;
  }

  console.log(
    'bla',
    dealerCards,
    playerCards,
    checkSum(dealerCards),

    calculateWinner(dealerCards, playerCards),
  );

  function checkSum(cards: any) {
    let sum = 0;
    cards.forEach(card => {
      console.log('bla card', card, card[1]);

      switch (card[1]) {
        case '2':
          sum += 2;
          break;
        case '3':
          sum += 3;
          break;
        case '4':
          sum += 4;
          break;
        case '5':
          sum += 5;
          break;
        case '6':
          sum += 6;
          break;
        case '7':
          sum += 7;
          break;
        case '8':
          sum += 8;
          break;
        case '9':
          sum += 9;
          break;
        case '10':
        case 'J':
        case 'Q':
        case 'K':
          sum += 10;
          break;
        case 'A':
          sum += 1;
          break;
        default:
          break;
      }
    });
    return sum;
  }

  return (
    <LinearGradient
      colors={['#001F00', '#003F00']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.8]}
      style={styles.container}>
      <View style={styles.main}></View>
      <ImageBackground
        source={require('../../../../assets/wood1.jpeg')}
        resizeMode="cover"
        style={styles.bottomContainer}>
        <Pressable onPress={() => {}} style={styles.amountContainer}>
          <View style={styles.amount}>
            <Text style={styles.amountText}>100000</Text>
          </View>
          <View style={styles.plusContainer}>
            <LinearGradient
              colors={['#FF7F10', '#FFD700', '#FF7F10']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.plus}>
              <Text style={{fontSize: 19, padding: 0}}>+</Text>
            </LinearGradient>
            <View style={styles.plusNotification}>
              <Text style={styles.plusText}>1</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.chipsContainer}>
          <Pressable style={styles.chip}>
            <Text>1</Text>
          </Pressable>
          <Pressable style={styles.chip}>
            <Text>5</Text>
          </Pressable>
          <Pressable style={styles.chip}>
            <Text>10</Text>
          </Pressable>
          <Pressable style={styles.chip}>
            <Text>25</Text>
          </Pressable>
          <Pressable style={styles.chip}>
            <Text>100</Text>
          </Pressable>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => {}}
            text="Max. bet"
            buttonStyle={{
              width: Dimensions.get('window').width / 3.5,
              height: 20,
            }}
          />
          <Button
            onPress={() => {}}
            text="Deal"
            buttonStyle={{
              width: Dimensions.get('window').width / 3.5,
              height: 20,
            }}
          />
          <Button
            onPress={() => {}}
            text="Max. bet1"
            buttonStyle={{
              width: Dimensions.get('window').width / 3.5,
              height: 20,
              position: 'relative',
              top: 100,
            }}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  main: {
    flex: 5,
    // backgroundColor: '#ffd',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
  },
  amount: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#000',
  },
  amountText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
    paddingHorizontal: 25,
    paddingVertical: 3,
  },
  plusContainer: {
    position: 'relative',
    left: 10,
  },
  plus: {
    width: 24,
    height: 24,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: 'white',
    fontSize: 9,
    fontFamily: 'SourceCodePro-Bold',
    position: 'relative',
    // left: 1,
    top: -1,
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
  chipsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: '#000',
  },
  chip: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: 'red',
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  buttonsContainer: {
    width: Dimensions.get('window').width / 1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameScreen;
