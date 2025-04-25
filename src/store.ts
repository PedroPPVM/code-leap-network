import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

type UserState = {
  name: string;
};

const initialState: UserState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    createUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { createUserName } = userSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<Dispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
