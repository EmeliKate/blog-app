import styles from "./Blog.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from 'axios';
import {setPosts} from "../../features/posts/postsSlice";
import {useSelector, useDispatch} from "react-redux";

const Blog = () => {

    //const [posts, setPosts] = useState([]);
    const {posts} = useSelector((store) => store.posts)
    const [postsLoading, setPostsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsShownPost, setCommentsShownPost] = useState(null)
    const dispatch = useDispatch()

    const addPosts = async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        //setPosts(res.data);
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

    const toggleComments = (currentPostID) => {
        if (currentPostID == commentsShownPost) {
            setCommentsShownPost(null)
        } else {
            setCommentsShownPost(currentPostID)
        }
    }

    const findPost = () => {

    }

    const sortPosts = () => {

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
                                        <ListGroupItem>
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