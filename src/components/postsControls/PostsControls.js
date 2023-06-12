import {Button, CloseButton, Form, Row} from 'react-bootstrap';
import styles from "./PostsControls.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {useDispatch, useSelector} from "react-redux";
import {togglePostsSorted, setPostsSearchText} from "../../features/posts/postsSlice";
const PostsControls = () => {

    const {posts} = useSelector((store) => store.posts)
    const {postsSortFindOptionOn} = useSelector((store) => store.posts)
    const {postsSearchText} = useSelector((store) => store.posts)
    const dispatch = useDispatch()
    const onSort = () => {
        dispatch(togglePostsSorted())
    }

    const onFind = (event, inputText) => {
        event.preventDefault()
        dispatch(setPostsSearchText(inputText))
    }

        return (
        <div>
            <Button disabled={!postsSortFindOptionOn} variant={postsSortFindOptionOn ? "primary" : "secondary"} onClick={onSort}>
                Отсортировать
            </Button>
            <Form.Group
                disabled={!postsSortFindOptionOn}
            >
                <Form.Label>
                    Поиск
                </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="..."
                    id="search-form"
                    value={postsSearchText}
                    onChange={(event) => onFind(event, document.getElementById("search-form").value)}
                />
                <CloseButton
                    onClick={() => dispatch(setPostsSearchText(""))}
                    variant="white"
                >
                </CloseButton>
            </Form.Group>
        </div>
    )
}

export default PostsControls