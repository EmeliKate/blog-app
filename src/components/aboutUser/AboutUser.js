import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {setPosts} from "../../features/posts/postsSlice";
import {useEffect, useState} from "react";
import {setUserId, setPostsSortedByUser} from "../../features/users/usersSlice";
import {useDispatch, useSelector} from "react-redux";
import Blog from "../blog/Blog"

const AboutUser = () => {

    const [postsLoading, setPostsLoading] = useState(false);
    const {userId} = useSelector((store) => store.users)
    const {posts} = useSelector((store) => store.posts)
    const [userInfo, setUserInfo] = useState({})
    const dispatch = useDispatch()
    const addInfo = async () => {
        console.log(userId)
        if (userId > 0) {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + userId)
            setUserInfo(res.data)
            console.log(res.data)
        }
    }

    //if userid is not changed - posts are not sorted by user

    useEffect(() => {
        setPostsLoading(true)
        const timer = setTimeout(() => {
            addInfo()
            setPostsLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    },[])

    return (
        <div>
            <Button variant="dark" onClick={() => dispatch(setPostsSortedByUser(false))}>
                <Link to="/">Назад</Link>
            </Button>
            <h1>
                {userInfo.name}
            </h1>
            <h2>
                {userInfo.username}
            </h2>
            <h2>
                {userInfo.email}
            </h2>

            <h1>
                Посты автора
            </h1>
            {/*{userPosts.map((post) =>*/}
            {/*<ListGroup>*/}
            {/*    <ListGroupItem*/}
            {/*        key={post.id}*/}
            {/*    >*/}
            {/*        <h2>*/}
            {/*            {post.title}*/}
            {/*        </h2>*/}
            {/*        <div>*/}
            {/*            {post.body}*/}
            {/*        </div>*/}
            {/*    </ListGroupItem>*/}
            {/*</ListGroup>*/}
            {/*)}*/}
            <Blog />
        </div>
    )
}

export default AboutUser