import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import fiubaLogo from "../../assets/fiuba.svg";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import "./Login.scss";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [errorMessageConfirmPassword, setErrorMessageConfirmPassword] =
    useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

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

  const onSignUp = () => {
    if (!checkFields()) {
      return;
    }
    setIsRegistered(true);
    console.log(email, password, confirmPassword);
  };
  return (
    <Layout>
      {!isRegistered ? (
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
            <Input
              style={{ width: "100%" }}
              title="Confirm Password"
              errorMessage={errorMessageConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Button
              style={{
                width: "100%",
                marginTop: errorMessageConfirmPassword === "" ? "30px" : "0px",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
              title="Register"
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
