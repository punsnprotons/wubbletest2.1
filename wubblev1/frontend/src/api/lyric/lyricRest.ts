import { restApi, basePath } from '../rest'

export const lyricRestApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    getLyricList: builder.query({
      providesTags: ['lyricList'],
      query: () => ({
        url: `${basePath}/rytr/lyric-list`,
        method: 'GET',
      }),
    }),
    generateLyric: builder.mutation({
      query: (payload) => ({
        url: `${basePath}/rytr/ryte`,
        method: 'POST',
        body: payload,
      }),
    }),
    getTone: builder.query({
      query: () => ({
        url: `${basePath}/rytr/tone-list`,
        method: 'GET',
      }),
    }),
    saveLyric: builder.mutation({
      query: (payload) => ({
        url: `${basePath}/rytr/save`,
        method: 'POST',
        body: payload,
      }),
    }),
    deleteLyric: builder.mutation({
      invalidatesTags: ['lyricList'],
      query: (payload) => ({
        url: `${basePath}/rytr/delete`,
        method: 'POST',
        body: payload,
      }),
    }),
    editLyric: builder.mutation({
      invalidatesTags: ['lyricList'],
      query: (payload) => ({
        url: `${basePath}/rytr/edit`,
        method: 'POST',
        body: payload,
      }),
    }),
  })
})

export const {
  useGenerateLyricMutation,
  useGetToneQuery,
  useSaveLyricMutation,
  useGetLyricListQuery,
  useDeleteLyricMutation,
  useEditLyricMutation,
} = lyricRestApi