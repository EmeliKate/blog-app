import {Nav, NavDropdown, Navbar, Image, Button} from 'react-bootstrap';
import data from "../../assets/text/aboutMeData.json"
import styles from "./Header.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import PostsControls from "../postsControls/PostsControls";

const Header = () => {
    const snowContactData = () => {
        let contactData = []
        for (let i = 0; i < data.contacts.length; i++) {
            contactData.push(data.contacts[i].id + " ")
        }
        return contactData
    }

    return (
        <Navbar
            collapseOnSelect expand="lg"
            bg="dark"
            variant="dark"
            className={styles.header}
        >
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Menu">
                        <Nav.Link>
                            <Link to="/">Список постов</Link>
                            <Link to="/aboutMe">Обо мне</Link>
                        </Nav.Link>
                    </NavDropdown>
                </Nav>
            <Navbar.Brand>
               <Image src="../../assets/icons/avatar.png"/>
                <h1>
                    {data.name}
                </h1>
                <h3>
                    {snowContactData()}
                </h3>
            </Navbar.Brand>
            </Navbar.Collapse>
            <PostsControls />
        </Navbar>
    )
}

export default Header;