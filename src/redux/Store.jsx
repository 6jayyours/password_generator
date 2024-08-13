import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { passReducer } from './passwordSlice'; // Ensure the path is correct

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  password: passReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),
});


export const persistor = persistStore(store);

export default store;
