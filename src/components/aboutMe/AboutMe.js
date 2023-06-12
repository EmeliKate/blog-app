import styles from "./AboutMe.module.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import data from "../../assets/text/aboutMeData.json"

const AboutMe = () => {
    return (
        <div>
            <h5>
                {data.aboutText}
            </h5>
        </div>
    )
}

export default AboutMe