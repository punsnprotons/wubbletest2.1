import { restApi, basePath } from '../rest'

export const contactRestApi = restApi.injectEndpoints({
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/contact/send-email`,
                method: 'POST',
                body: payload,
            }),
        }),
    })
})

export const {
    useSendEmailMutation,
} = contactRestApi