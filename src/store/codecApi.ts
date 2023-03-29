import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config';
import { ICodec } from '../types/codec';

export const codecApi = createApi({
  reducerPath: 'codecsListApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCodecList: builder.query<
      ICodec[],
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = null, pageSize = null }) =>
        `codecs${pageSize ? `?_limit=${pageSize}` : ''}?${
          pageIndex ? `&_page=${pageIndex}` : ''
        }`,
    }),
    getCodec: builder.query({
      query: (id) => `codecs/${id}`,
    }),
  }),
});

export const { useGetCodecListQuery, useGetCodecQuery } = codecApi;
