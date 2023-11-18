import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { createCourse } from "../api/Lectures";
import { useNavigate } from "react-router";

export const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigator = useNavigate();

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onAddImage = (files: FileList | null) => {
    if (files && files.length == 1) {
      setImage(files[0]);
    }
  };

  const onSend = async () => {
    if (title) {
      await createCourse(title/*, image*/);
      navigator("/courses");
    }
  };

  return (
    <Layout>
      <h1>Crear Curso</h1>
      <Input title="Título" onChange={onChangeTitle} />
      <Input title="Portada" type="file"
                  onChange={(event: any) =>
                    onAddImage(event.target.files)
                  }
                  accept="image/*" />
      <Button title="Crear" onClick={onSend} />
    </Layout>
  );
};
