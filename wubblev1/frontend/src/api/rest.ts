// import axiosInstance from './axios/instance'
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError, } from '@reduxjs/toolkit/query/react'
const API_URL = process.env.REACT_APP_EXPRESS_API

if (!API_URL) {
    throw new Error(
        `The environment variable REACT_APP_EXPRESS_API is missing and it's required to access your store`
    )
}

export const customFetchQuery = fetchBaseQuery({
    baseUrl: API_URL,
    // baseUrl: 'https://api.wubble.ai:3000',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('wubble-auth-token')
        //const token = (getState() as RootState).auth.auth.access_token

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

// const axiosBaseQuery =
//     ({ baseUrl } = { baseUrl: '' }) =>
//         async ({ url, method, data, params, headers }: any) => {
//             console.log('testing axios...')
//             try {
//                 const result = await axiosInstance({
//                     url: baseUrl + url,
//                     method,
//                     data,
//                     params,
//                     headers,
//                 })
//                 return { data: result.data }
//             } catch (axiosError) {
//                 const err: any = axiosError
//                 return {
//                     error: {
//                         status: err.response?.status,
//                         data: err.response?.data || err.message,
//                     },
//                 }
//             }
//         }

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // extraOptions = {
    //     rejectUnauthorized: false, // Customize this based on your needs
    //     // Add any other custom options here
    // };
    // console.log('extraOptions:', extraOptions)
    // console.log('args:', args)
    // console.log('api:', api)
    // // let result = await customFetchQuery(args, api, extraOptions);
    let result = await customFetchQuery(args, api, extraOptions);
    if (result.error) {
        if ((result.error?.data as any).error === 'Token error' || (result.error?.data as any).error === 'Not Allowed') {
            //api.dispatch(logout());
            localStorage.removeItem('wubble-auth-token')
            window.location.href = "/"
        }
    }

    return result
}

export const basePath = '/api/app-template'

export const restApi = createApi({
    reducerPath: 'restApi',
    baseQuery: customFetchBase,
    // baseQuery: axiosBaseQuery({
    //     baseUrl: API_URL
    // }),
    tagTypes: [
        'eventList',
        'genreList',
        'lyricList',
    ],
    endpoints: (builder) => ({})
})