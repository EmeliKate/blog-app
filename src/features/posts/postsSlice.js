import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    postsSorted: false,
    postsSortFindOptionOn: true
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
        },
        togglePostsSortFindOptionOn(state) {
            state.postsSortFindOptionOn = !state.postsSortFindOptionOn
        }
    }
})

export const {setPosts, togglePostsSorted, togglePostsSortFindOptionOn} = postsSlice.actions
export default postsSlice.reducer

