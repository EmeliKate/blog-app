import styles from "./Blog.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from 'axios';
import {setPosts} from "../../features/posts/postsSlice";
import {useSelector, useDispatch} from "react-redux";

const Blog = () => {

    const {posts} = useSelector((store) => store.posts)
    const {postsSorted} = useSelector((store) => store.posts)
    const [postsLoading, setPostsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsShownPost, setCommentsShownPost] = useState(null)
    const dispatch = useDispatch()

    const addPosts = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        dispatch(setPosts(res.data))
    }

    const addComments = async (postId) => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments")
        setComments(res.data);
    }

    useEffect(() => {
        setPostsLoading(true)
        const timer = setTimeout(() => {
            addPosts()
            setPostsLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    },[])

    useEffect(() => {
        addComments(commentsShownPost)
    },[commentsShownPost])

    // Maximum update depth exceeded. This can happen when a
    // component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
    // React limits the number of nested updates to prevent infinite loops:
    // error - dispatch(setPosts(sortedPosts)) - why
    useEffect(() => {
        if (postsSorted && posts.length > 0) {

            console.log("posts sorted")

            const sortedPosts = [...posts].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
            dispatch(setPosts(sortedPosts))

            console.log(posts)
        }
    }, [postsSorted])
    const toggleComments = (currentPostID) => {
        if (currentPostID == commentsShownPost) {
            setCommentsShownPost(null)
        } else {
            setCommentsShownPost(currentPostID)
        }
    }

    return(
        <ListGroup className={styles.blog}>
            {postsLoading ? (
                <h1>Posts loading...</h1>) :
                (posts.map((post) =>
                        <ListGroupItem
                            key={post.id}
                        >
                            <h2>
                                {post.title}
                            </h2>
                            <div>
                                {post.body}
                            </div>
                            <Button>
                                <Image src="../../assets/icons/avatar.png" />
                            </Button>
                            <Button onClick={() => toggleComments(post.id)}>
                                Комментарии
                            </Button>
                            {commentsShownPost == post.id && (
                                comments.map((comment) =>
                                    <ListGroup>
                                        <ListGroupItem
                                            key={comment.id}
                                        >
                                            <h4>
                                                {comment.email}
                                            </h4>
                                            <div>
                                                {comment.body}
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                )
                            )}
                        </ListGroupItem>
                    )
                )
            }
        </ListGroup>
    )
}

export default Blog