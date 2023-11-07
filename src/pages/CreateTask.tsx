import { useState } from "react"
import { Layout } from "../components/Layout/Layout"
import { Input } from "../components/input/Input"
import { Button } from "../components/button/Button"
import { CreateTaskRequest } from "../models/Tasks"
import { uploadTask } from "../api/Tasks"


export const CreateTask = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const onChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setContent(event.target.value);
        }
    }

    const onSend = async () => {

        if(title && content){
            /* const createCourseParams: CreateTaskRequest = {
                title: title,
                content: content,
                // aca, de alguna manera obtener el id de video y de usuario
            }
            await uploadTask(createCourseParams);
            */ 
        }
    }

    return (
        <Layout>
            <h1>Create Task</h1>
            <Input title="Title" onChange={onChangeTitle} />
            <Input title="Content" onChange={onChangeContent}/>
            <Button title="Create" onClick={onSend}/>
        </Layout>
    )
}