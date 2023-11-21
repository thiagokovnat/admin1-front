import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { createCourse, updateCoverCourse } from "../api/Course";
import { useNavigate } from "react-router";

export const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const navigator = useNavigate();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onAddCover = (files: FileList | null) => {
    if (files && files.length == 1) {
      setCover(files[0]);
    }
  };

  const onSend = async () => {
    if (title) {
      const course = await createCourse(title);
      if (cover) {
        await updateCoverCourse(course.id, cover);
      }
      navigator("/courses");
    }
  };

  return (
    <Layout>
      <h1>Crear Curso</h1>
      <Input title="Título" onChange={onChangeTitle} />
      <Input title="Portada" type="file"
                  onChange={(event: any) =>
                    onAddCover(event.target.files)
                  }
                  accept="image/*" />
      <Button title="Crear" onClick={onSend} />
    </Layout>
  );
};
