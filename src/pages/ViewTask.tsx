import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { useEffect, useMemo, useState } from "react";
import { createResolution, getTask } from "../api/Tasks";
import { Input } from "../components/input/Input";
import { Button } from "../components/button/Button";

export const ViewTask = () => {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [resolution, setResolution] = useState("");
  const navigate = useNavigate();

  const sendResolution = async () => {
    await createResolution(id!, resolution);
    navigate("/");
  };

  useEffect(() => {
    getTask(id).then((task) => {
      setTask(task.data);
    });
  }, []);

  return (
    <Layout>
      <h1>{task && task.title}</h1>
      <h2>Enunciado</h2>
      <h3>{task && task.content}</h3>
      <Input
        title="Resolucion"
        type="longtext"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setResolution(e.target.value)
        }
      />
      <Button title="Enviar" onClick={sendResolution} />
    </Layout>
  );
};
