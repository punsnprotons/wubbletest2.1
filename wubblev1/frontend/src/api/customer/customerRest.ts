import { restApi, basePath } from '../rest'

export const customerRestApi = restApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomer: builder.query({
      query: () => ({
        url: `${basePath}/customer/list`,
        method: 'GET',
      }),
    })
  })
})

export const {
  useGetCustomerQuery,
} = customerRestApi