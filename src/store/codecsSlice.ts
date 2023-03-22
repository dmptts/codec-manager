import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ICodec } from '../types/codec';

const codecsAdapter = createEntityAdapter<ICodec>();

const codecsSlice = createSlice({
  name: 'codecs',
  initialState: codecsAdapter.getInitialState(),
  reducers: {},
});

export default codecsSlice.reducer;
