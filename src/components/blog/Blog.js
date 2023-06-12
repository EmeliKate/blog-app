import styles from "./Blog.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from 'axios';
import {setPosts} from "../../features/posts/postsSlice";
import {setUserId, setPostsSortedByUser} from "../../features/users/usersSlice";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const Blog = () => {

    const {posts} = useSelector((store) => store.posts)
    const [allPosts, setAllPosts] = useState([])
    const {postsSorted} = useSelector((store) => store.posts)
    const {postsSearchText} = useSelector((store) => store.posts)
    const {postsSortedByUser} = useSelector((store) => store.users)
    const {userId} = useSelector((store) => store.users)
    const [postsLoading, setPostsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsShownPost, setCommentsShownPost] = useState(null)
    const dispatch = useDispatch()

    const addPosts = async () => {
        console.log("addPosts")
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setAllPosts(res.data)

        if (!postsSortedByUser) {
            dispatch(setPosts(res.data))
        }
    }

    useEffect(() => {
        setPostsLoading(true)
        const timer = setTimeout(() => {
            addPosts()
            setPostsLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    },[])

    const addComments = async (postId) => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments")
        setComments(res.data);
    }

    const toggleComments = (currentPostID) => {
        if (currentPostID == commentsShownPost) {
            setCommentsShownPost(null)
        } else {
            setCommentsShownPost(currentPostID)
        }
    }

    useEffect(() => {
        addComments(commentsShownPost)
    },[commentsShownPost])


    useEffect(() => {
        if (postsSorted && posts.length > 0) {

            console.log("posts sorted")

            const sortedPosts = [...posts].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
            dispatch(setPosts(sortedPosts))

            console.log(posts)
        }
    }, [postsSorted])

    useEffect(() => {
        if (postsSearchText == "") {
            addPosts()
        } else {
            const foundPosts = allPosts.filter((post) => post.title.includes(postsSearchText))
            dispatch(setPosts(foundPosts))
        }
    }, [postsSearchText])

    useEffect(() => {
        if (postsSortedByUser) {
            const userPosts = posts.filter((post) => post.userId == userId)
            dispatch(setPosts(userPosts))
        }
    }, [postsSortedByUser, userId])

    const handleUserClick = (post) => {
        dispatch(setPostsSortedByUser(true))
        dispatch(setUserId(post.userId))
        console.log("user click " + post.userId)
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
                            <Link to={"/users/:" + post.id + "/posts"}>
                                <Image src = "../../assets/icons/avatar.png" onClick={() => handleUserClick(post)} />
                            </Link>
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