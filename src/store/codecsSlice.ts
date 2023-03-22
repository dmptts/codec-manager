import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { fetchCodecList } from '../api/codecs';
import { ICodec } from '../types/codec';

const codecsAdapter = createEntityAdapter<ICodec>();

const codecsSlice = createSlice({
  name: 'codecs',
  initialState: codecsAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCodecList.fulfilled, (state, action) => {
      codecsAdapter.addMany(state, action.payload);
    });
  },
});

export default codecsSlice.reducer;
export const codecsSelectors = codecsAdapter.getSelectors(
  (state: RootState) => state.codecs
);
