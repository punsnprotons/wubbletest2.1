import { restApi, basePath } from '../rest'
import { setUser, logout } from '../../redux/slices/user/userSlice';

export const authRestApi = restApi.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/auth/sign-up`,
                method: 'POST',
                body: payload,
            }),
        }),
        signIn: builder.mutation({
            invalidatesTags: ['genreList', 'lyricList'],
            query: (payload) => ({
                url: `/api/auth/login`,
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data.userData))
                    localStorage.setItem('wubble-auth-token', data.tokens.access_token)
                    localStorage.setItem('wubble-refresh-token', data.tokens.refresh_token)
                } catch (error) { }
            },
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `/api/auth/logout`,
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        dispatch(logout())
                        localStorage.removeItem('wubble-auth-token')
                        localStorage.removeItem('wubble-refresh-token')
                    }
                } catch (error) { }
            },
        }),
        verifySession: builder.query({
            query: () => ({
                url: `${basePath}/auth/session`,
                method: 'GET'
            }),
        }),
        getMe: builder.mutation({
            query: () => ({
                url: '/api/auth/me',
                method: 'GET'
            }),
        }),
        verifyEmail: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/verifyEmail`,
                method: 'POST',
                body: payload
            }),
        }),
        verifyPhoneNumber: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/verifyPhoneNumber`,
                method: 'POST',
                body: payload
            }),
        }),
        requestResetPassword: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/auth/request-reset-password`,
                method: 'POST',
                body: payload
            }),
        }),
        getResetPasswordData: builder.query({
            query: (payload) => ({
                url: `${basePath}/auth/request-reset-password/${payload}`,
                method: 'GET',
                params: payload
            }),
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: `${basePath}/auth/reset-password`,
                method: 'POST',
                body: payload
            }),
        })
    })
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useVerifySessionQuery,
    useVerifyEmailMutation,
    useVerifyPhoneNumberMutation,
    useGetMeMutation,
    useRequestResetPasswordMutation,
    useGetResetPasswordDataQuery,
    useResetPasswordMutation
} = authRestApi