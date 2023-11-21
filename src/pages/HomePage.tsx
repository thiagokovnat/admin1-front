import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../auth/AuthContext";
import "./Home.scss";

const HomePage: React.FC = () => {
  const { loggedIn } = useAuth();

  return (
    <Layout>
      {loggedIn ? (
        <>
          <h1>Inicio</h1>
          <div className="Home__BannerContainer">
            <div className="Home__Gradient"></div>
            <div className="Home__Continue">
              <h1>Popular</h1>
              <h3>React 101</h3>
            </div>
          </div>
          <div className="Home__Carousel">
            <h1>Mas Populares</h1>
            <div className="Home__CarouselList">
              {
                [...Array(5)].map((_, index) => (
                  <div className="Home__CarouselItem">
                    <div className="Home__GradientItem">
                      <h3 className="Home__ItemTitle">{`React 10${index + 1}`}</h3>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </>
      ) : (
        <h1>Inicia sesión para comenzar tu nuevo viaje educativo!</h1>
      )}
    </Layout>
  );
};

export default HomePage;
