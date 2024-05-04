import { restApi, basePath } from '../rest'

export const baseRestApi = restApi.injectEndpoints({
    endpoints: (builder) => ({
        getOssUrl: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/getOssUrl`,
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useGetOssUrlMutation,
} = baseRestApi