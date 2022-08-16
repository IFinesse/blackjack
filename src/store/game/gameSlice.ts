import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import type {RootState} from '../../store';
// import auth from '@react-native-firebase/auth';

// Define a type for the slice state
interface AuthState {
  cashAmount: number;
  betAmount: number;
  randomDeck: any;
  dealerCards: string[];
  playerCards: string[];
  loading: boolean;
  error: any;
}

// interface AuthType {
//   email: string;
//   password: string;
// }

// Define the initial state using that type
const initialState: AuthState = {
  cashAmount: 0,
  betAmount: 0,
  randomDeck: [],
  dealerCards: [],
  playerCards: [],
  loading: false,
  error: null,
};

export const getRandomDeck = createAsyncThunk(
  'game/getRandomDeck',
  async () => {
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
    hitForPlayer: state => {
      state.playerCards.push(state.randomDeck.pop());
    },
    hitForDealer: state => {
      state.dealerCards.push(state.randomDeck.pop());
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

// export const {signIn, signOut} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default gameSlice.reducer;
