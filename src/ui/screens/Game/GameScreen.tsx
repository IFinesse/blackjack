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
import {getRandomDeck} from '../../../store/game/gameSlice';

import {
  dealCardsForPlayer,
  dealCardsForDealer,
  setAmountToBet,
  hitForPlayer,
  hitForDealer,
  finishGame,
  checkSum,
} from '../../../store/game/gameSlice';

import {useAppDispatch, useAppSelector} from '../../../store/hooks';

import Button from '../../components/Button';

const GameScreen: FC = ({}) => {
  const dispatch = useAppDispatch();

  const dealerCards = useAppSelector(state => state.game.dealerCards);
  const playerCards = useAppSelector(state => state.game.playerCards);
  const cashAmount = useAppSelector(state => state.game.cashAmount);
  const amountToBet = useAppSelector(state => state.game.amountToBet);
  const result = useAppSelector(state => state.game.result);

  const [areCardsDealed, setCardsDealed] = useState(false);
  const [hiddenCard, setHiddenCard] = useState(true);
  const [standPressed, setStandPressed] = useState(false);
  // const [amountToBet, setAmountToBet] = useState<number>(0);

  // const [winner, setWinner] = useState('');
  const onLogOut = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    if (areCardsDealed) {
      console.log('bla checksum player', checkSum(playerCards));
      if (checkSum(playerCards) > 21) {
        dispatch(finishGame());
        setHiddenCard(false);
      }
    }
  }, [playerCards, dispatch, areCardsDealed]);

  useEffect(() => {
    if (areCardsDealed) {
      console.log('bla checksum dealer', checkSum(dealerCards));
      if (checkSum(dealerCards) > 21) {
        dispatch(finishGame());
      } else if (checkSum(dealerCards) < 17) {
        setTimeout(() => {
          standPressed ? dispatch(hitForDealer()) : null;
        }, 1000);
      } else {
        standPressed ? dispatch(finishGame()) : null;
      }
    }
  }, [dealerCards, dispatch, standPressed, areCardsDealed]);

  function onDealHandler() {
    // dispatch(setAmountToBet(amountToBet));
    dispatch(getRandomDeck()).then(() => {
      dispatch(dealCardsForPlayer());
      dispatch(dealCardsForDealer());
    });
    setCardsDealed(true);
  }

  function onHitHandler() {
    dispatch(hitForPlayer());
  }

  function onStandHandler() {
    setHiddenCard(false);
    setStandPressed(true);
    if (checkSum(dealerCards) < 17) dispatch(hitForDealer());
  }

  function onDoubleHandler() {
    dispatch(hitForPlayer());
  }

  console.log('bla cards', dealerCards, playerCards);

  return (
    <LinearGradient
      colors={['#001F00', '#003F00']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.8]}
      style={styles.container}>
      <View style={styles.main}>
        {!areCardsDealed ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 30,
            }}>
            <Text style={styles.amountToBetText}>Bet : ${amountToBet}</Text>
            <View>
              <Pressable style={styles.chip}>
                <Text>1</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <Text>Dealer :</Text>
            {hiddenCard && dealerCards.length ? (
              <Text>
                {dealerCards[1]} X {checkSum([dealerCards[1]])}
              </Text>
            ) : (
              <Text>
                {dealerCards} {checkSum(dealerCards)}
              </Text>
            )}
            <Text>
              Player:
              {playerCards} {checkSum(playerCards)}
            </Text>
          </View>
        )}
        {result && <Text>{result}</Text>}
      </View>
      <ImageBackground
        source={require('../../../../assets/wood1.jpeg')}
        resizeMode="cover"
        style={styles.bottomContainer}>
        <Pressable onPress={() => {}} style={styles.amountContainer}>
          <View style={styles.amount}>
            <Text style={styles.amountText}>{cashAmount}</Text>
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
          <Pressable
            style={styles.chip}
            onPress={() => {
              dispatch(setAmountToBet(1));
            }}>
            <Text>1</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            onPress={() => {
              dispatch(setAmountToBet(5));
            }}>
            <Text>5</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            onPress={() => {
              dispatch(setAmountToBet(10));
            }}>
            <Text>10</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            onPress={() => {
              dispatch(setAmountToBet(25));
            }}>
            <Text>25</Text>
          </Pressable>
          <Pressable
            style={styles.chip}
            onPress={() => {
              dispatch(setAmountToBet(100));
            }}>
            <Text>100</Text>
          </Pressable>
        </View>

        {!areCardsDealed ? (
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
              onPress={() => onDealHandler()}
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
        ) : (
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => onDoubleHandler()}
              text="Double"
              buttonStyle={{
                width: Dimensions.get('window').width / 3.5,
                height: 20,
              }}
            />
            <Button
              onPress={() => onStandHandler()}
              text="Stand"
              buttonStyle={{
                width: Dimensions.get('window').width / 3.5,
                height: 20,
              }}
            />
            <Button
              onPress={() => onHitHandler()}
              text="Hit"
              buttonStyle={{
                width: Dimensions.get('window').width / 3.5,
                height: 20,
              }}
            />
          </View>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffd',
  },
  amountToBetText: {
    color: 'white',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    marginBottom: 10,
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
