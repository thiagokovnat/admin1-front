import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../auth/AuthContext";

const HomePage: React.FC = () => {
  const { loggedIn } = useAuth();

  return (
    <Layout>
      {loggedIn ? (
        <h1>Home</h1>
      ) : (
        <h1>Inicia sesion para comenzar tu nuevo viaje educativo!</h1>
      )}
    </Layout>
  );
};

export default HomePage;
