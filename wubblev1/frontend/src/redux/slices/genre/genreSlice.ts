import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export interface GenreState {
    genre: any[]
    savedGenre: any[]
    generateInput: { prompt: string, file: any }
}

const initialState: GenreState = {
    genre: [],
    savedGenre: [],
    generateInput: { prompt: '', file: null },
}

export const genreSlice = createSlice({
    initialState,
    name: 'genre',
    reducers: {
        setGenerateInput: (state, { payload }) => {
            state.generateInput = {
                prompt: payload.prompt,
                file: payload.file
            }
        },
        setGenre: (state, { payload }) => {
            // set state here
            const generatedGenre = {
                ossFileName: payload.result,
                name: payload.name,
                generationTime: payload.generationTime
            }
            state.genre = [...state.genre, generatedGenre]
        },
        setSavedGenre: (state, { payload }) => {
            console.log('state:', state)
            console.log('payload:', payload)
            // set state here

            state.savedGenre = [...payload]
        },
        removeGenre: (state, { payload }) => {
            console.log('state:', state)
            console.log('payload:', payload)
            // remove selected state here
            const newState = state.genre.filter(item => item.ossFileName !== payload.ossFileName)

            state.genre = [...newState]
        },
        clearGenre: (state) => {
            state.genre = []
        },
    }
})

export const getGenreState = (state: RootState) => state.genre;

export default genreSlice.reducer;

export const {
    setGenre,
    setSavedGenre,
    removeGenre,
    setGenerateInput,
    clearGenre,
} = genreSlice.actions;