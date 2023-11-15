import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { CreateTaskRequest } from "../models/Tasks";
import { updateTask, getTask, getResolutions } from "../api/Tasks";
import { useNavigate, useParams } from "react-router";
import { Textarea } from "../components/input/Textarea";
import "./CoursePage.scss";

export const UpdateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [seeResolutions, setSeeResolutions] = useState(false);
  const [resolutions, setResolutions] = useState([]);

  useEffect(() => {
    setSeeResolutions(false);
  }, []);

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

  const getResolutionsF = async () => {
    try {
      const resolutions = await getResolutions(params.taskId!);
      setResolutions(resolutions);
    } catch (error) {}
  };

  useEffect(() => {
    getTaskData();
    getResolutionsF();
  }, []);

  const onSend = async () => {
    if (title && content) {
      const createCourseParams: CreateTaskRequest = {
        title: title,
        content: content,
        lecture_id: params.lectureId!,
      };
      await updateTask(createCourseParams, params.taskId!);
      navigate("/courses/" + params.courseId);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (seeResolutions) {
    return (
      <Layout>
        <h1>Resoluciones</h1>
        <table>
          <tr>
            <th>Orden</th>
            <th>Id Alumno</th>
            <th>Resolucion</th>
          </tr>
          {resolutions.map((resolution, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{resolution.user_id}</td>
                <td>{resolution.resolution}</td>
              </tr>
            );
          })}
        </table>
        <Button title="Volver" onClick={() => setSeeResolutions(false)} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <>
          <h1>Actualizar Tarea</h1>
          <Input title="Título" onChange={onChangeTitle} value={title} />
          <Textarea
            title="Enunciado"
            onChange={onChangeContent}
            value={content}
          />
          <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
            <Button title="Actualizar" onClick={onSend} />
            <Button
              title="Resoluciones"
              onClick={() => setSeeResolutions(true)}
            />
          </div>
        </>
      </Layout>
    );
  }
};
