import { Lecture } from "../../models/Lectures"
import fiubaLogo from '/Logo-fiuba_big.png'
import "./CourseView.scss"

interface Props{
    lecture: Lecture;
    onClick?: () => void;
}

export const CourseView = ({lecture, onClick}: Props) => {

    return (
        <div className="CourseView__Container" onClick={onClick}> 
            <p>{lecture.title}</p>
            <img src={fiubaLogo} alt="" className="CourseView__BackgroundImage"/>
        </div>)
}