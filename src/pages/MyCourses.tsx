import { useNavigate } from "react-router"
import { Layout } from "../components/Layout/Layout"
import { Button } from "../components/button/Button"


export const MyCourses = () => {

    const navigate = useNavigate();

    const onCreateCourse = () => {
        navigate('/courses/new')
    }

    return (
        <Layout>
            <h1>My Courses</h1>

            <Button title="Create Course" onClick={onCreateCourse}/>
        </Layout>
    )
}