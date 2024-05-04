import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store';

export interface LyricState {
  lyric: any[],
  lyricInput: { prompt: string, tone: any },
  savedLyric: any[]
}

const initialState: LyricState = {
  lyric: [],
  savedLyric: [],
  lyricInput: { prompt: '', tone: null },
}

export const lyricSlice = createSlice({
  initialState,
  name: 'lyric',
  reducers: {
    setLyricInput: (state, { payload }) => {
      state.lyricInput = {
        prompt: payload.prompt,
        tone: payload.tone
      }
    },
    setLyric: (state, { payload }) => {
      // set state here
      const lyricCount = state.lyric.length + 1
      const generatedLyric = {
        ryte: payload.lyrics,
        name: `songname-lyrics-${lyricCount}`,
        generationTime: payload.generationTime
      }
      state.lyric = [...state.lyric, generatedLyric]
    },
    setSavedLyric: (state, { payload }) => {
      console.log('state:', state)
      console.log('payload:', payload)
      // set state here
      state.savedLyric = [...payload]
    },
    removeLyric: (state, { payload }) => {
      console.log('state:', state)
      console.log('payload:', payload)
      // remove selected state here
      const newState = state.lyric.filter(item => item.ryte !== payload.ryte)
      state.lyric = [...newState]
    },
    clearLyric: (state) => {
      state.lyric = []
    }
  }
})

export const getLyricState = (state: RootState) => state.lyric;

export default lyricSlice.reducer;

export const { setLyricInput, setLyric, setSavedLyric, removeLyric, clearLyric } = lyricSlice.actions