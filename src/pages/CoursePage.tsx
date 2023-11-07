import { useParams } from "react-router";
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

export const CoursePage = () => {
  const params = useParams();
  const [lectures, setLectures] = useState<
    {
      title: string;
      video: File | null;
      id: string | null;
      videoId: string | null;
      order: number;
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
      allVideos.map(async (lecture, index) => {
        return addVideoToCourse({
          id: lecture.videoId,
          course_id: Number(params.id),
          title: lecture.title,
          order: lecture.order,
        });
      })
    );
  };

  useEffect(() => {
    getLectures();
  }, []);

  return (
    <Layout>
      <h1>Course {params.id}</h1>
      <Button title="Agregar Video" onClick={onAddLecture} />
      <table>
        <tr>
          <th>Orden</th>
          <th>Título</th>
          <th>Archivo</th>
        </tr>
        {lectures.map((lecture, index) => {
          if (lecture.id) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Input
                    value={lecture.title}
                    title=""
                    onChange={(e) => {
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
              </tr>
            );
          }
          return (
            <tr>
              <td>{index + 1}</td>
              <td>
                <Input
                  value={lecture.title}
                  title=""
                  onChange={(e) => {
                    onAddTitle(e.target.value, index);
                  }}
                />
              </td>
              <td>
                <Input
                  title=""
                  type="file"
                  onChange={(event) => onAddVideo(event.target.files!, index)}
                  accept="video/*"
                />
              </td>
            </tr>
          );
        })}
      </table>
      <Button title="Guardar Todo" onClick={onSave} />
    </Layout>
  );
};
