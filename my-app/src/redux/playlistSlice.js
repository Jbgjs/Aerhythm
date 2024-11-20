import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    songs: [],
  },
  reducers: {
    addVideoToPlaylist: (state, action) => {
      state.songs.push(action.payload);
    },
    clearPlaylist: (state) => {
      state.songs = [];
    },
  },
});

export const { addVideoToPlaylist, clearPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;