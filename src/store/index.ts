import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from './slices/api';
import authReducer from './slices/authSlice';


export const store = configureStore({
reducer: {
[api.reducerPath]: api.reducer,
auth: authReducer
},
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(api.middleware)
});


setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;