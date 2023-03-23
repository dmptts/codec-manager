import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config';
import { ICodec } from '../types/codec';

export const codecApi = createApi({
  reducerPath: 'codecsListApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCodecList: builder.query<ICodec[], string | null>({
      query: (page = '') => `codecs?_limit=10${page && `&_page=${page}`}`,
    }),
    getCodec: builder.query<ICodec, number>({
      query: (id) => `codecs/${id}`,
    }),
  }),
});

export const { useGetCodecListQuery } = codecApi;
