import { useParams } from "react-router";
import { Layout } from "../components/Layout/Layout";

export const CoursePage = () => {
  const params = useParams();

  return (
    <Layout>
      <h1>Curso {params.id}</h1>
      <video
        src={`https://staging-acp-api.onrender.com/lectures/id/${params.id}`}
        controls
      ></video>
    </Layout>
  );
};
