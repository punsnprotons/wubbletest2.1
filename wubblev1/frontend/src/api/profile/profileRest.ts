import { restApi, basePath } from '../rest'
import { setUser, logout } from '../../redux/slices/user/userSlice';

export const profileRestApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `${basePath}/profile`,
        method: 'GET',
      }),
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `${basePath}/profile`,
        method: 'POST',
        body: payload,
      }),
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setUser(data.userData))
      //     localStorage.setItem('wubble-auth-token', data.tokens.access_token)
      //     localStorage.setItem('wubble-refresh-token', data.tokens.refresh_token)
      //   } catch (error) { }
      // },
    })
  })
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation
} = profileRestApi