import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import fiubaLogo from "../../assets/fiuba.svg";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./login.scss";
import { useAuth } from "../../auth/AuthContext";
import { loginService } from "../../api/Auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessageUsername, setErrorMessageUsername] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);

  const { login } = useAuth();

  const checkFields = (): boolean => {
    let ok = true;
    if (username === "") {
      setErrorMessageUsername("El nombre de usuario es requerido");
      ok = false;
    } else {
      setErrorMessageUsername("");
    }
    if (password === "") {
      setErrorMessagePassword("La contraseña es requerida");
      ok = false;
    } else {
      setErrorMessagePassword("");
    }
    return ok;
  };

  const onLogin = async () => {
    setWrongCredentials(false);
    if (!checkFields()) {
      return;
    }
    loginService({ username: username, password: password })
      .then((response) => {
        login(response.data.access_token, response.data.token_type);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        setWrongCredentials(true);
      });
  };

  return (
    <Layout>
      <div className="Login__Container">
        <img src={fiubaLogo} />
        <div className="Login__Container" style={{ width: "40%" }}>
          <Input
            style={{ width: "100%" }}
            title="Nombre de usuario"
            errorMessage={errorMessageUsername}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            style={{ width: "100%" }}
            title="Contraseña"
            type="password"
            errorMessage={errorMessagePassword}
            onChange={(event) => setPassword(event.target.value)}
          />
          {wrongCredentials && (
            <div className="Login__TextError">
              Nombre de usuario o contraseña incorrecta
            </div>
          )}
          <Button
            style={{
              width: "100%",
              marginTop: errorMessagePassword === "" ? "30px" : "0px",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingLeft: "0px",
              paddingRight: "0px",
            }}
            title="Login"
            onClick={() => onLogin()}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
