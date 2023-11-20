import { useNavigate, useParams } from "react-router"
import { Layout } from "../components/Layout/Layout"
import { useEffect, useState } from "react";
import { LectureByCourse } from "../models/Lectures";
import { getCourseTitleById } from "../api/Course";
import { getLecturesByCourseId } from "../api/Lectures";
import "./ViewCourse.scss"
import { Button } from "../components/button/Button";
import { Comment, MappedComment } from "../models/Comments";
import { createComment, getCommentForLecture } from "../api/Comments";
import { Input } from "../components/input/Input";

export const ViewCourse = () => {
    const {id} = useParams()
    const [courseTitle, setCourseTitle] = useState("")
    const [lectures, setLectures] = useState<LectureByCourse[]>([]);
    const [selectedLecture, setSelectedLecture] = useState<LectureByCourse | null>(null);
    const [comments, setComments] = useState<MappedComment[]>([]);
    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const fetchCourseTitle = async () => {
        try {
          setCourseTitle(await getCourseTitleById(Number(id)));
        } catch (error) {}
    };

    useEffect(() => {
        if(!selectedLecture) return;
       fetchComments();

    }, [selectedLecture])

    useEffect(() => {
        fetchCourseTitle();
        getLecturesByCourseId(Number(id)).then((actualLectures) => {
            actualLectures.length > 0 && setSelectedLecture(actualLectures[0])
            setLectures(actualLectures.sort((a, b) => a.order - b.order))
        });
    }, [id])

    const fetchComments = async () => {
        getCommentForLecture(selectedLecture.id).then((comments) => {
            setComments(comments);
        })
    }

    const onSaveComment = () => {
        const toSave: Partial<Comment> = {
            content: comment,
            parent_id: null
        }

        saveComment(toSave as Comment);
    }

    const saveComment = async (comment: Comment) => {
        await createComment(selectedLecture.id, comment.content, comment.parent_id);
        setComment("");
        fetchComments();
    }

    const renderSelectedLecture = () => {
        if(!selectedLecture) return null;

        return (
            <>
                <video controls  src={`https://staging-acp-api.onrender.com/lectures/video/${selectedLecture.id}`}/>
                <h2>{selectedLecture.title}</h2>
                {selectedLecture.task_id && (
                    <button className="ViewCourse__WhiteButton" title="Ver Tarea" onClick={() => {navigate(`/task/${selectedLecture.task_id}`)}}>
                        Ver Tarea
                    </button>
                )}
                <h2>Comentarios</h2>
                {
                    comments.map(comment => <CommentComponent comment={comment} onSave={saveComment} />)
                }
                <Input title="Comentar" onChange={(e: any) => setComment(e.target.value)} value={comment}/>
                <button className="ViewCourse__SendButton" title="Enviar" onClick={onSaveComment}>
                                Enviar
                </button>
            </>
        )
    }

    return (
        <Layout>
            <h1>{courseTitle}</h1>
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

interface CommentProps {
    comment: MappedComment;
    onSave: (comment: Comment) => Promise<void>;
}

const CommentComponent = ({comment, onSave}: CommentProps) => {
    const [toggleAnswer, setToggleAnswer] = useState(false);
    const [answer, setAnswer] = useState("");

    const onSendComment = () => {
        const toSave: Partial<Comment> = {
            content: answer,
            parent_id: comment.id
        }

        onSave(toSave as Comment);
        setToggleAnswer(false);
    }

    return (
        <>
            <div className="ViewCourse__Comment" style={{border: comment.highlighted ? "1px solid #FFDF00" : undefined}}>       
                <h4 className="ViewCourse__Comment__Title">{comment.author.username}</h4>
                <p className="ViewCourse__Comment__Content">{comment.content}</p> 
                {
                    !toggleAnswer && (
                    <button className="ViewCourse__WhiteButton" title="Responder" onClick={() => setToggleAnswer(true)}>
                        Responder
                    </button>

                    )
                }    
            </div>
            {
                comment.answers.map((answer) => (
                    <div className="ViewCourse__Comment" style={{marginLeft: 40, marginTop: 20, marginBottom: 20, border: answer.highlighted ? "1px solid #FFDF00" : undefined}}>       
                        <h4 className="ViewCourse__Comment__Title">{answer.author.username}</h4>
                        <p className="ViewCourse__Comment__Content">{answer.content}</p>          
                    </div>
                ))
            }
            {
                toggleAnswer && (
                    <>
                        <input className="ViewCourse__ReplyInput" type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                        <div style={{display: "flex", flexDirection: "row", gap: 20}}>
                            <button className="ViewCourse__SendButton" title="Enviar" onClick={onSendComment}>
                                Enviar
                            </button>
                            <button className="ViewCourse__CancelButton" title="Enviar" onClick={onSendComment}>
                                Cancelar
                            </button>
                        </div>
                    </>
                )
            }
        </>
    )
}