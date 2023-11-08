import { useParams } from "react-router"
import { Layout } from "../components/Layout/Layout"
import { useEffect, useState } from "react";
import { LectureByCourse } from "../models/Lectures";
import { getLecturesByCourseId } from "../api/Lectures";
import "./ViewCourse.scss"

export const ViewCourse = () => {
    const {id} = useParams()
    const [lectures, setLectures] = useState<LectureByCourse[]>([]);
    const [selectedLecture, setSelectedLecture] = useState<LectureByCourse | null>(null);

    useEffect(() => {
        getLecturesByCourseId(Number(id)).then((actualLectures) => {
            actualLectures.length > 0 && setSelectedLecture(actualLectures[0])
            setLectures(actualLectures.sort((a, b) => a.order - b.order))
        });
    }, [id])

    const renderSelectedLecture = () => {
        if(!selectedLecture) return null;

        return (
            <>
                <video controls  src={`https://staging-acp-api.onrender.com/lectures/video/${selectedLecture.id}`}/>
                <h2>{selectedLecture.title}</h2>
            </>
        )
    }

    return (
        <Layout>
            <h1>Curso {id}</h1>
            <div className="ViewCourse__Container">
                <div className="ViewCourse__VideoContainer">
                    {renderSelectedLecture()}
                </div>
                <div className="ViewCourse__LecturesContainer">
                    {
                        lectures.map((lecture) => (
                            <div className="ViewCourse__LectureElement" onClick={() => setSelectedLecture(lecture)}>
                                <h3 className="ViewCourse__LectureElement__Title">{lecture.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}