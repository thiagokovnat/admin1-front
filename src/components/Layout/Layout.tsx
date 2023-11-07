import { PropsWithChildren } from "react";
import fiubaLogo from "/Logo-fiuba_big.png";
import "./Layout.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface Props extends PropsWithChildren {}

export const Layout = (props: Props) => {
  const { loggedIn, logout } = useAuth();
  return (
    <div className="Layout__Background">
      <div className="Layout__Navigator">
        <img src={fiubaLogo} alt="fiuba_logo" className="Layout__Logo" />
        {loggedIn ? (
          <>
            <Link to={"/"}>Home</Link>
            <div className="Layout__Separator" />
            <Link to={"/courses"}>Mis Cursos</Link>
            <div
              style={{
                right: "40px",
                display: "flex",
                fontWeight: "bold",
                position: "absolute",
              }}
              onClick={logout}
            >
              Cerrar Sesión
            </div>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <div className="Layout__Separator" />
            <Link to={"/signup"}>Registrarse</Link>
          </>
        )}
      </div>
      {props.children}
    </div>
  );
};
