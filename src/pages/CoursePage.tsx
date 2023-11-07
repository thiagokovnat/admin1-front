import { useParams,useNavigate } from "react-router"
import { Layout } from "../components/Layout/Layout"
import { Button } from "../components/button/Button";


export const CoursePage = () => {
    const params = useParams();
    
    const navigate = useNavigate();
    
    const onCreateTask = () => {
        navigate('/tasks/new')
    }

    return (
        <Layout>
            <h1>Course {params.id}</h1>
            <video src={`https://staging-acp-api.onrender.com/lectures/id/${params.id}`} controls >

            </video>
            <Button title="Create task" onClick={onCreateTask}/>
        </Layout>
    )
}