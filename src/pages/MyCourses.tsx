import { useNavigate } from "react-router"
import { Layout } from "../components/Layout/Layout"
import { Button } from "../components/button/Button"
import { useEffect, useState } from "react"
import { Lecture } from "../models/Lectures"
import { getLectures } from "../api/Lectures"
import { CourseView } from "../components/CourseView/CourseView"


export const MyCourses = () => {
    const [lectures, setLectures] = useState<Lecture[]>([])
    const navigate = useNavigate();

    const onCreateCourse = () => {
        navigate('/courses/new')
    }

    useEffect(() => {
        getLectures().then(setLectures)
    }, [])

    return (
        <Layout>
            <h1>My Courses</h1>
            <div style={{display: 'flex', flexDirection: 'row', gap: 20, marginBottom: 50}}>
                {
                    lectures.map(lecture => (
                        <CourseView lecture={lecture}/>
                    ))
                }
            </div>
            <Button title="Create Course" onClick={onCreateCourse}/>
        </Layout>
    )
}