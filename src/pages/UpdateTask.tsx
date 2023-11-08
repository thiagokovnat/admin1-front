import { useEffect, useState, CSSProperties } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { CreateTaskRequest } from "../models/Tasks";
import { updateTask, getTask } from "../api/Tasks";
import { useNavigate, useParams } from "react-router";
import { Textarea } from "../components/input/Textarea";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const getTaskData = async () => {
    try {
      const task = await getTask(params.taskId!);
      setTitle(task.data.title);
      setContent(task.data.content);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const onSend = async () => {
    if (title && content) {
      const createCourseParams: CreateTaskRequest = {
        title: title,
        content: content,
        lecture_id: params.lectureId!,
      };
      await updateTask(createCourseParams, params.taskId!);
      console.log("SE ACTUALIZO LA TAREA");
      navigate("/courses/" + params.courseId);
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <ClipLoader
          color={"#FFFFFF"}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <h1>Actualizar Tarea</h1>
          <Input title="Título" onChange={onChangeTitle} value={title} />
          <Textarea
            title="Enunciado"
            onChange={onChangeContent}
            value={content}
          />
          <Button title="Actualizar" onClick={onSend} />
        </>
      )}
    </Layout>
  );
};
