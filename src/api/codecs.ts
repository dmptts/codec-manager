import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '.';

export const fetchCodecList = createAsyncThunk('fetchCodecList', async () => {
  try {
    const response = await fetch(`${BASE_URL}/codecs`);

    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `При загрузке списка кодеков произошла ошибка: ${err.message}`
      );
    } else {
      throw new Error(
        'При загрузке списка кодеков произошла неопознанная ошибка'
      );
    }
  }
});
