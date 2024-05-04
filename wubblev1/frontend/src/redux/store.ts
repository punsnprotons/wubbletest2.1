import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { restApi } from '../api/rest';
import userReducer from '../redux/slices/user/userSlice'
import genreReducer from '../redux/slices/genre/genreSlice'
import lyricReducer from '../redux/slices/lyric/lyricSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const userPersistedReducer = persistReducer(persistConfig, userReducer)
const genrePersistedReducer = persistReducer(persistConfig, genreReducer)
const lyricPersistedReducer = persistReducer(persistConfig, lyricReducer)

export const store = configureStore({
    reducer: {
        // user: userReducer,
        user: userPersistedReducer,
        genre: genrePersistedReducer,
        lyric: lyricPersistedReducer,
        [restApi.reducerPath]: restApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat([restApi.middleware])
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const persistor = persistStore(store)