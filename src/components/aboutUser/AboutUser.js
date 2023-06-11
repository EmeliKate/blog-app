import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import {setPosts} from "../../features/posts/postsSlice";
import {useEffect, useState} from "react";
import {setUserId} from "../../features/users/usersSlice";
import {useSelector} from "react-redux";

const AboutUser = () => {

    const [postsLoading, setPostsLoading] = useState(false);
    const {userId} = useSelector((store) => store.users)
    const {posts} = useSelector((store) => store.posts)
    const [userInfo, setUserInfo] = useState({})
    const addInfo = async () => {
        console.log(userId)
        if (userId > 0) {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + userId)
            setUserInfo(res.data)
            console.log(res.data)
        }
    }

    useEffect(() => {
        setPostsLoading(true)
        const timer = setTimeout(() => {
            addInfo()
            setPostsLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    },[])

    const userPosts = [...posts].filter((post) => post.userId == userId)

    return (
        <div>
            <Button variant="dark">
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
            {userPosts.map((post) =>
            <ListGroup>
                <ListGroupItem
                    key={post.id}
                >
                    <h2>
                        {post.title}
                    </h2>
                    <div>
                        {post.body}
                    </div>
                </ListGroupItem>
            </ListGroup>
            )}
        </div>
    )
}

export default AboutUser