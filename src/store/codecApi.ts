import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config';
import { ICodec, ICodecFull } from '../types/codec';
import { IParameterTemplate } from '../types/parameterTemplate';

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
    getCodec: builder.query<ICodecFull, number>({
      query: (id) => `codec/${id}`,
    }),
    getMethodList: builder.query({
      query: () => `methods`,
    }),
    getParameterTemplateList: builder.query<IParameterTemplate[], void>({
      query: () => `parameter-templates`,
    }),
  }),
});

export const {
  useGetCodecListQuery,
  useGetCodecQuery,
  useGetParameterTemplateListQuery,
} = codecApi;
