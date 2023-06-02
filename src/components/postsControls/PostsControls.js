import {Button} from 'react-bootstrap';
import styles from "./PostsControls.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {useSelector} from "react-redux";

const PostsControls = ({onSort, onFind}) => {

    const {postsSortFindOptionOn} = useSelector((store) => store.posts)

    return (
        <div>
            <Button disabled={!postsSortFindOptionOn} variant={postsSortFindOptionOn ? "primary" : "secondary"} onClick={onSort}>
                Отсортировать
            </Button>
            <Button disabled={!postsSortFindOptionOn} variant={postsSortFindOptionOn ? "primary" : "secondary"} onClick={onFind}>
                Поиск
            </Button>
        </div>
    )
}

export default PostsControls