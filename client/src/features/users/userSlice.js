import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Api from '../../app/api';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (url, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        thunkAPI.dispatch(setUsers([]))
        const response = await Api.get('/v1/users' + (url || ''), {
          params: {
            page: state.user.currentPage,
            pageSize: state.user.pageSize
          }
        })
        return response.data
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response ? err.response.data : err.message)
      }
    }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentPage: 1,
    pageSize: 10,
    hideNext: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.hideNext = action.payload.length === 0;
    }
  }
});

export const {setUsers, setPage, setPageSize} = userSlice.actions;

export const selectUsers = state => state.user.users;
export const selectPageData = state => ({
  page: state.user.currentPage,
  pageSize: state.user.pageSize,
  hideNext: state.user.hideNext
});

export default userSlice.reducer;
