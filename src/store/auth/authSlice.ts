import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import type {RootState} from '../../store';
import auth from '@react-native-firebase/auth';

// Define a type for the slice state
interface AuthState {
  isSignedIn: boolean;
  loading: boolean;
  error: any;
}

interface AuthType {
  email: string;
  password: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  isSignedIn: false,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: AuthType) => {
    const {email, password} = data;
    console.log('bla thunk', email);

    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => console.log('bla resp', resp))
      .catch(err => console.log('bla err', err.json()));

    // .then(response => response);
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data: AuthType) => {
    const {email, password} = data;
    console.log('bla thunk', email);

    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp => console.log('bla resp', resp))
      .catch(err => console.log('bla err', err.json()));

    // .then(response => response);
  },
);

export const logOut = createAsyncThunk('auth/logOut', async () => {
  return auth()
    .signOut()
    .then(resp => console.log('bla resp', resp))
    .catch(err => console.log('bla err', err.json()));

  // .then(response => response);
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
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
    builder.addCase(signIn.pending, state => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, state => {
      state.loading = false;
      state.isSignedIn = true;
    });
    builder.addCase(signIn.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signUp.pending, state => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, state => {
      state.loading = false;
      state.isSignedIn = true;
    });
    builder.addCase(signUp.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.loading = false;
      state.isSignedIn = false;
    });
  },
});

// export const {signIn, signOut} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
