import { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";
import { createCourse } from "../api/Lectures";

export const CreateCourse = () => {
  const [title, setTitle] = useState("");

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSend = async () => {
    if (title) {
      await createCourse(title);
    }
  };

  return (
    <Layout>
      <h1>Create Course</h1>
      <Input title="Título" onChange={onChangeTitle} />
      <Button title="Crear" onClick={onSend} />
    </Layout>
  );
};
