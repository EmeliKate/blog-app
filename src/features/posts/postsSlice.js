import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    postsSorted: false
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload
        },
        togglePostsSorted(state) {
            state.postsSorted = !state.postsSorted
        }
    }
})

export const {setPosts, togglePostsSorted} = postsSlice.actions
export default postsSlice.reducer

