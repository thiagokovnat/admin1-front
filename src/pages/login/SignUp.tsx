import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import fiubaLogo from "../../assets/fiuba.svg";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./login.scss";
import { signupService } from "../../api/Auth";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [errorMessageUsername, setErrorMessageUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<boolean>(false);

  const checkFields = (): boolean => {
    let ok = true;
    if (username === "") {
      setErrorMessageUsername("Username is required");
      ok = false;
    } else {
      setErrorMessageUsername("");
    }
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
    if (confirmPassword === "") {
      setErrorMessageConfirmPassword("Confirm Password is required");
      ok = false;
    } else {
      setErrorMessageConfirmPassword("");
    }
    if (
      password !== confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setErrorMessageConfirmPassword("Passwords don't match");
      ok = false;
    }
    return ok;
  };

  const onSignUp = async () => {
    if (!checkFields()) {
      return;
    }
    signupService({
      username: username,
      email: email,
      password: password,
    })
      .then((response) => {
        setIsRegistered(true);
        console.log(response);
      })
      .catch((error) => {
        setSignupError(true);
        console.log(error);
      });
  };
  return (
    <Layout>
      {!isRegistered ? (
        <div className="Login__Container">
          <img src={fiubaLogo} />
          <div className="Login__Container" style={{ width: "40%" }}>
            <Input
              style={{ width: "100%" }}
              title="Username"
              errorMessage={errorMessageUsername}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              style={{ width: "100%" }}
              title="Email"
              errorMessage={errorMessageEmail}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              style={{ width: "100%" }}
              title="Contraseña"
              type="password"
              errorMessage={errorMessagePassword}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Input
              style={{ width: "100%" }}
              title="Confirmar Contraseña"
              type="password"
              errorMessage={errorMessageConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {signupError && (
              <div className="Login__TextError">
                Error al registrarse, intente nuevamente
              </div>
            )}
            <Button
              style={{
                width: "100%",
                marginTop: errorMessageConfirmPassword === "" ? "30px" : "0px",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
              title="Registrar"
              onClick={() => onSignUp()}
            />
          </div>
        </div>
      ) : (
        <h1>Te has registrado con exito, Felicitaciones!</h1>
      )}
    </Layout>
  );
};

export default SignUp;
