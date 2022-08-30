import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import type {RootState} from '../../store';
// import auth from '@react-native-firebase/auth';

// Define a type for the slice state
interface GameState {
  cashAmount: number;
  betAmount: number;
  amountToBet: number;
  randomDeck: any;
  dealerCards: string[];
  playerCards: string[];
  loading: boolean;
  resultDescription: string;
  error: any;
}

// interface AuthType {
//   email: string;
//   password: string;
// }

// Define the initial state using that type
const initialState: GameState = {
  cashAmount: 300,
  betAmount: 0,
  amountToBet: 0,
  randomDeck: [],
  dealerCards: [],
  playerCards: [],
  loading: false,
  resultDescription: '',
  error: null,
};

export const getRandomDeck = createAsyncThunk(
  'game/getRandomDeck',
  async () => {
    console.log('bla getRandomDeck');

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

    const randomDeck = [...deck].sort((a, b) => 0.5 - Math.random());
    return randomDeck;
  },
);

export const gameSlice = createSlice({
  name: 'game',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    dealCardsForPlayer: state => {
      state.playerCards = [state.randomDeck.pop(), state.randomDeck.pop()];
    },
    dealCardsForDealer: state => {
      state.dealerCards = [state.randomDeck.pop(), state.randomDeck.pop()];
    },
    setAmountToBet: (state, action: PayloadAction<number>) => {
      if (action.payload <= state.cashAmount) {
        state.amountToBet = action.payload;
      }
    },
    hitForPlayer: state => {
      state.playerCards.push(state.randomDeck.pop());
    },
    hitForDealer: state => {
      state.dealerCards.push(state.randomDeck.pop());
    },
    finishGame: state => {
      const winner = calculateWinner(state.dealerCards, state.playerCards);
      state.resultDescription = winner[1];
      switch (winner[0]) {
        case 'dealer':
          state.cashAmount -= state.amountToBet;
          break;
        case 'player':
          winner[1] === 'You have blackjack!'
            ? (state.cashAmount += state.amountToBet * 1.5)
            : (state.cashAmount += state.amountToBet);
          break;
        case 'push':
          break;
        default:
          break;
      }
      state.amountToBet = 0;
    },
    // signIn: state => {
    //   state.isSignedIn = true;
    // },
    // signOut: state => {
    //   state.isSignedIn = false;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addCase(getRandomDeck.pending, state => {
      state.loading = true;
    });
    builder.addCase(getRandomDeck.fulfilled, (state, action: any) => {
      state.loading = false;
      state.randomDeck = action.payload;
    });
    builder.addCase(getRandomDeck.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  dealCardsForPlayer,
  dealCardsForDealer,
  setAmountToBet,
  hitForPlayer,
  hitForDealer,
  finishGame,
} = gameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default gameSlice.reducer;

function calculateWinner(dealerCards, playerCards) {
  if (checkSum(playerCards) > 21) return ['dealer', 'You busted'];
  if (checkSum(playerCards) === 21 && playerCards.length === 2)
    return ['player', 'You have blackjack!'];
  if (checkSum(dealerCards) > 21) return ['player', 'Dealer busted'];
  if (checkSum(dealerCards) === 21 && dealerCards.length === 2)
    return ['dealer', 'Dealer has blackjack'];
  if (checkSum(playerCards) < checkSum(dealerCards))
    return ['dealer', 'Dealer has the best score'];
  if (checkSum(playerCards) > checkSum(dealerCards))
    return ['player', 'You have the best score'];
  if (checkSum(playerCards) === checkSum(dealerCards)) return ['push', 'Push'];
  return ['error', 'something went wrong'];
}

export const checkSum = (cards: any) => {
  let sum = 0;
  let copy = [...cards];

  let newCards = copy.filter(card => card[1] !== 'A');

  // console.log('bla cards', cards);

  if (!cards.length) return 0;
  cards.forEach(card => {
    if (card[1] === 'A') {
      newCards.push(card);
    }
  });

  // console.log('bla cecksum', cards, newCards);
  newCards.forEach(card => {
    // console.log('bla card', card, card[1]);

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
      case '1':
      case 'J':
      case 'Q':
      case 'K':
        sum += 10;
        break;
      case 'A':
        sum + 11 > 21 ? (sum += 1) : (sum += 11);
        break;
      default:
        break;
    }
  });
  return sum;
};
