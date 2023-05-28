// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



// const mailApiHeaders = {
//     'content-type': 'application/json',
//           'X-RapidAPI-Key': '700624cd9emsh12f7a4418d57cc6p178350jsnb3504802c46f',
//           'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
// };

// const createRequest = (url) => ({ url, headers: mailApiHeaders });

// export const mailApi = mailApi({
//     reducerPath: 'mailApi',
//     baseQuery: fetchBaseQuery({ baseUrl: "https://rapidprod-sendgrid-v1.p.rapidapi.com" }),
//     endpoints: (builder) => ({
//       sendMail: builder.query({
//         query: (count) => createRequest(`/mail/send}`),
//       }),
//     }),
//   });
// // const options = {
// //     method: 'GET',
// //     url: 'https://coinranking1.p.rapidapi.com/coins',
// //     params: {
// //       referenceCurrencyUuid: 'yhjMzLPhuIDl',
// //       timePeriod: '24h',
// //       'tiers[0]': '1',
// //       orderBy: 'marketCap',
// //       orderDirection: 'desc',
// //       limit: '50',
// //       offset: '0'
// //     },
// //     headers: {
// //       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
// //       'X-RapidAPI-Key': '700624cd9emsh12f7a4418d57cc6p178350jsnb3504802c46f'
// //     }
// //   };

// export const {
//     useGetCryptosQuery,
//     useGetCryptoDetailsQuery,
//     useGetExchangesQuery,
//     useGetCryptoHistoryQuery,
//   } = cryptoApi;

// //   const options = {
// //     method: 'POST',
// //     url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
// //     headers: {
// //       'content-type': 'application/json',
// //       'X-RapidAPI-Key': '700624cd9emsh12f7a4418d57cc6p178350jsnb3504802c46f',
// //       'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
// //     },
// //     data: {
// //       personalizations: [
// //         {
// //           to: [
// //             {
// //               email: 'john@example.com'
// //             }
// //           ],
// //           subject: 'Hello, World!'
// //         }
// //       ],
// //       from: {
// //         email: 'from_address@example.com'
// //       },
// //       content: [
// //         {
// //           type: 'text/plain',
// //           value: 'Hello, World!'
// //         }
// //       ]
// //     }
// //   };