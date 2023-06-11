import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload
        }
    }
})

export const {setUserId} = usersSlice.actions
export default usersSlice.reducer
