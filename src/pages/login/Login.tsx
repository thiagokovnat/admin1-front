import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import fiubaLogo from "../../assets/fiuba.svg";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./Login.scss";
import { useAuth } from "../../auth/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");

  const { login } = useAuth();

  const checkFields = (): boolean => {
    let ok = true;
    if (email === "") {
      setErrorMessageEmail("Email is required");
      ok = false;
    } else {
      setErrorMessageEmail("");
    }
    if (password === "") {
      setErrorMessagePassword("Password is required");
      ok = false;
    } else {
      setErrorMessagePassword("");
    }
    return ok;
  };

  const onLogin = () => {
    if (!checkFields()) {
      return;
    }
    login();
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="Login__Container">
        <img src={fiubaLogo} />
        <div className="Login__Container" style={{ width: "40%" }}>
          <Input
            style={{ width: "100%" }}
            title="Email"
            errorMessage={errorMessageEmail}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            style={{ width: "100%" }}
            title="Password"
            errorMessage={errorMessagePassword}
            onChange={(event) => setPassword(event.target.value)}
          />
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
