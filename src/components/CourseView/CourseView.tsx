import { Lecture } from "../../models/Lectures"
import fiubaLogo from '/Logo-fiuba_big.png'
import "./CourseView.scss"
import { useNavigate } from "react-router";

interface Props{
    lecture: Lecture;
}

export const CourseView = ({lecture}: Props) => {
    const navigate = useNavigate();
    const onCourseSelect = () => {
        navigate("/courses/" + lecture.id)
    }

    return (
        <div className="CourseView__Container" onClick={onCourseSelect}> 
            <p>{lecture.title}</p>
            <img src={fiubaLogo} alt="" className="CourseView__BackgroundImage"/>
        </div>)
}