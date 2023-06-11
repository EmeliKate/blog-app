import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    postsSorted: false,
    postsSortFindOptionOn: true,
    postsSearchText: ""
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
        },
        setPostsSearchText(state, action){
            state.postsSearchText = action.payload
        }
    }
})

export const {setPosts, togglePostsSorted, togglePostsSortFindOptionOn, setPostsSearchText} = postsSlice.actions
export default postsSlice.reducer

