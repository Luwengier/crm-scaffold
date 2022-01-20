import { configureStore } from '@reduxjs/toolkit'
import { pokemonApi } from '../slices/pokemonApiSlice'
import consultationsReducer from '../slices/consultationsSlice'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    consultations: consultationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  // preloadedState: {
  //   counter: 0,
  // },
})

