import React, {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {logOut} from '../../../store/auth/authSlice';

import {useAppDispatch} from '../../../store/hooks';

function startGame() {
  const game = {};
  game['randomDeck'] = [...deck].sort((a, b) => 0.5 - Math.random());
}

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
    <View style={styles.container}>
      {/* <Text>Home</Text> */}
      <View style={styles.header}>
        <Text>icon</Text>
        <TouchableOpacity onPress={onLogOut}>
          <Text>log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text>dealer cards: </Text>
        <Text>{dealerCards[0]} X</Text>
        <Text>your cards: </Text>
        <Text>{playerCards}</Text>
        <Text>the winner:</Text>
        {/* <Text>{calculateWinner(dealerCards, playerCards)}</Text> */}
      </View>
    </View>
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
    flex: 8,
    backgroundColor: '#ffd',
  },
});

export default GameScreen;
