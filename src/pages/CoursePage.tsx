import { useNavigate, useParams } from "react-router";
import { Layout } from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import {
  addVideoToCourse,
  getLecturesByCourseId,
  uploadVideo,
} from "../api/Lectures";
import "./CoursePage.scss";
import { deleteTask } from "../api/Tasks";

export const CoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState<
    {
      title: string;
      video: File | null;
      id: string | null;
      videoId: string | null;
      order: number;
      taskId: string | null;
    }[]
  >([]);

  const getLectures = async () => {
    try {
      const lectures = await getLecturesByCourseId(Number(params.id));
      console.log(lectures);
      lectures.sort((a, b) => a.order - b.order);
      setLectures(
        lectures.map((lecture) => ({
          title: lecture.title,
          video: null,
          id: lecture.id,
          videoId: lecture.id,
          order: lecture.order,
          taskId: lecture.task_id,
        }))
      );
    } catch (error) {}
  };

  const onAddVideo = (files: FileList, lectureNumber: number) => {
    if (files.length > 0 && lectureNumber < lectures.length) {
      const newLectures = lectures.map((lecture, index) => {
        if (index === lectureNumber) {
          return {
            ...lecture,
            video: files[0],
          };
        } else {
          return lecture;
        }
      });
      setLectures(newLectures);
    }
  };

  const onAddTitle = (title: string, lectureNumber: number) => {
    if (lectureNumber < lectures.length) {
      const newLectures = lectures.map((lecture, index) => {
        if (index === lectureNumber) {
          return {
            ...lecture,
            title,
          };
        } else {
          return lecture;
        }
      });
      setLectures(newLectures);
    }
  };

  const onAddLecture = () => {
    setLectures((prevLectures) => [
      ...prevLectures,
      {
        title: "",
        video: null,
        id: null,
        videoId: null,
        order: prevLectures.length + 1,
        taskId: null,
      },
    ]);
  };

  const onSave = async () => {
    const allVideos = await Promise.all(
      lectures
        .filter((each) => !each.id)
        .map(async (lecture) => {
          const videoId = await uploadVideo(lecture.video!);
          return { ...lecture, videoId };
        })
    );

    await Promise.all(
      allVideos.map(async (lecture) => {
        return addVideoToCourse({
          id: lecture.videoId,
          course_id: Number(params.id),
          title: lecture.title,
          order: lecture.order,
        });
      })
    );

    navigate("/courses");
  };

  useEffect(() => {
    getLectures();
  }, []);

  const onCreateTask = (lectureId: string) => {
    navigate("/tasks/new/" + params.id + "/" + lectureId);
  };

  const onUpdateTask = (lectureId: string, taskId: string) => {
    navigate("/tasks/" + params.id + "/" + lectureId + "/" + taskId);
  };

  const onDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      getLectures();
    } catch (error) {}
  };

  return (
    <Layout>
      <h2>Curso {params.id}</h2>
      <Button title="Agregar Video" onClick={onAddLecture} />
      <table>
        <tr>
          <th>Orden</th>
          <th>Título</th>
          <th>Archivo</th>
          <th>Tarea</th>
        </tr>
        {lectures.map((lecture, index) => {
          if (lecture.id) {
            return (
              <tr key={lecture.id}>
                <td>{index + 1}</td>
                <td>
                  <Input
                    value={lecture.title}
                    title=""
                    onChange={(e: any) => {
                      onAddTitle(e.target.value, index);
                    }}
                  />
                </td>
                <td>
                  <video
                    className="CoursePage__VideoTable"
                    controls
                    src={`https://staging-acp-api.onrender.com/lectures/video/${lecture.videoId}`}
                  />
                </td>
                <td>
                  {!lecture.taskId ? (
                    <Button
                      style={{
                        margin: "auto",
                        backgroundColor: "rgba(255,255,255,0.7)",
                      }}
                      title="Crear Tarea"
                      onClick={() => onCreateTask(lecture.id!)}
                    />
                  ) : (
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        margin: "auto",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        style={{
                          marginRight: 10,
                          backgroundColor: "rgba(255,255,255,0.7)",
                        }}
                        title="Ver Tarea"
                        onClick={() =>
                          onUpdateTask(lecture.id!, lecture.taskId!)
                        }
                      />
                      <Button
                        style={{
                          backgroundColor: "rgba(255,0,0,0.7)",
                          color: "white",
                        }}
                        title="Borrar Tarea"
                        onClick={() => onDeleteTask(lecture.taskId!)}
                      />
                    </div>
                  )}
                </td>
              </tr>
            );
          }
          return (
            <tr key={lecture.id}>
              <td>{index + 1}</td>
              <td>
                <Input
                  value={lecture.title}
                  title=""
                  onChange={(e: any) => {
                    onAddTitle(e.target.value, index);
                  }}
                />
              </td>
              <td>
                <Input
                  title=""
                  type="file"
                  onChange={(event: any) =>
                    onAddVideo(event.target.files!, index)
                  }
                  accept="video/*"
                />
              </td>
              <td>
                <h4>Agrega un video para asociarle una tarea!</h4>
              </td>
            </tr>
          );
        })}
      </table>
      <Button title="Guardar Todo" onClick={onSave} />
    </Layout>
  );
};
