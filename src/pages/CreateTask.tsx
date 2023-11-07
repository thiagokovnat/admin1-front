import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { CreateTaskRequest } from "../models/Tasks";
import { uploadTask } from "../api/Tasks";
import { Textarea } from "../components/input/textarea";
import { useNavigate, useParams } from "react-router";

export const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setContent(event.target.value);
    }
  };

  const onSend = async () => {
    if (title && content) {
      const createCourseParams: CreateTaskRequest = {
        title: title,
        content: content,
        lecture_id: params.lectureId!,
      };
      uploadTask(createCourseParams).then(() => {
        console.log("Task created");
        navigate("/courses/" + params.courseid);
      });
    }
  };

  return (
    <Layout>
      <h1>Create Task</h1>
      <Input title="Titulo" onChange={onChangeTitle} />
      <Textarea title="Enunciado" onChange={onChangeContent} />
      <Button title="Crear" onClick={onSend} />
    </Layout>
  );
};
