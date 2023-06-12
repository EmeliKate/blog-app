import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    postsSortedByUser: false
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload
        },
        setPostsSortedByUser(state, action) {
            state.postsSortedByUser = action.payload
        }
    }
})

export const {setUserId, setPostsSortedByUser} = usersSlice.actions
export default usersSlice.reducer
