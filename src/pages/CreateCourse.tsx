import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { CreateLectureRequest } from "../models/Lectures";
import { uploadLecture } from "../api/Lectures";

export const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState<File>();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideo(event.target.files[0]);
    }
  };

  const onSend = async () => {
    if (title && video) {
      const createCourseParams: CreateLectureRequest = {
        title: title,
        file: video,
      };

      await uploadLecture(createCourseParams);
    }
  };

  return (
    <Layout>
      <h1>Crear Curso</h1>
      <Input title="Titulo" onChange={onChangeTitle} />
      <Input
        title="Video"
        onChange={onChangeVideo}
        type="file"
        accept="video/*"
      />
      <Button title="Crear" onClick={onSend} />
    </Layout>
  );
};
