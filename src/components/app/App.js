import styles from "./App.module.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../header/Header";
import AboutMe from "../aboutMe/AboutMe";
import Blog from "../blog/Blog";
import {Route, Routes} from "react-router-dom"

function App() {
  return <div className={styles.app}>
      <Header />
      <Routes>
          <Route path="/aboutMe" element={<AboutMe/>}/>
          <Route path="/" element={<Blog />}/>
          {/*<Route path="/users/:id/posts" element={<AboutUser />}/>*/}
      </Routes>
  </div>
}

export default App;
