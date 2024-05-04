import { restApi, basePath } from '../rest'

export const genreRestApi = restApi.injectEndpoints({
    endpoints: (builder) => ({
        getGenreList: builder.query({
            providesTags: ['genreList'],
            query: () => ({
                url: `${basePath}/replicate/genre-list`,
                method: 'GET'
            }),
        }),
        generateGenre: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/replicate/generate`,
                method: 'POST',
                body: payload,
            })
        }),
        saveGenre: builder.mutation({
            invalidatesTags: ['genreList'],
            query: (payload) => ({
                url: `${basePath}/replicate/save`,
                method: 'POST',
                body: payload,
            }),
        }),
        getGenreUrl: builder.query({
            // providesTags: [''],
            query: (ossFileName) => ({
                url: `${basePath}/replicate/genre-url/${ossFileName}`,
                method: 'GET'
            }),
        }),
        deleteUnsaveGenreFile: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/replicate/delete/unsave-file`,
                method: 'POST',
                body: payload,
            }),
        }),
        deleteGenre: builder.mutation({
            invalidatesTags: ['genreList'],
            query: (payload) => ({
                url: `${basePath}/replicate/delete`,
                method: 'POST',
                body: payload,
            }),
        }),
        editGenre: builder.mutation({
            invalidatesTags: ['genreList'],
            query: (payload) => ({
                url: `${basePath}/replicate/edit`,
                method: 'POST',
                body: payload,
            }),
        }),
    })
})

export const {
    useGenerateGenreMutation,
    useSaveGenreMutation,
    useDeleteUnsaveGenreFileMutation,
    useGetGenreUrlQuery,
    useGetGenreListQuery,
    useDeleteGenreMutation,
    useEditGenreMutation,
} = genreRestApi