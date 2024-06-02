import React from "react";
import {
  loginRegisterButtonClassName,
  LoginInputStyle,
  LoginRegisterLabelStyle,
  signUpActionButtonClassName,
  loginFormClassName,
  loginRegisterFormClassName,
  loginIconClassName,
  loginRegisterClassName,
  registerContainerClassName,
  registerIconClassName,
  RegisiterInputStyle,
  registerColumnClassName,
  registerFormClassName,
  optionContainerClassName,
  choiceGroupClassName,
} from "./login-register-style";
import {
  ActionButton,
  ChoiceGroup,
  DatePicker,
  DefaultButton,
  IChoiceGroupOption,
  Label,
  TextField,
} from "@fluentui/react";
import { loginUser, registerUser } from "../../services/auth-service";
import { FONT_FAMILY } from "../../constants";
import User from "../../models/user";
import { useNavigate } from "react-router-dom";

export const LoginRegisterComponent = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");

  const [loginError, setLoginError] = React.useState<string>("");
  const [usernameError, setUsernameError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<string>("");
  const [firstNameError, setFirstNameError] = React.useState<string>("");

  const resetStates = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
  };

  const onChangeUsername = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setUsername(newValue || "");
    },
    []
  );

  const onChangePassword = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setPassword(newValue || "");
    },
    []
  );

  const onChangeConfirmPassword = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setConfirmPassword(newValue || "");
    },
    []
  );

  const onChangeFirstName = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      setFirstName(newValue || "");
    },
    []
  );

  const validateRegisterInputs = () => {
    // check if the inputs are empty and if they have the required length
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long!");
      return false;
    }
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long!");
      return false;
    }
    if (confirmPassword.length < 3) {
      setConfirmPasswordError("Password must be at least 3 characters long!");
      return false;
    }
    if (firstName.length < 3) {
      setFirstNameError("First name must be at least 3 characters long!");
      return false;
    }
    return true;
  };

  const sendToRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    } else if (!validateRegisterInputs()) {
      alert("Invalid inputs!");
      return;
    }
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    let user: User = {
      username: username,
      password: password,
      first_name: firstName,
    };
    registerUser(user);
  };

  const sendToLogin = () => {
    loginUser(username, password)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.user.username!);
        setLoginError("");

        navigate("/user");
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error);
      });
  };

  const setEmptyErrorStates = () => {
    setLoginError("");
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
  };

  return (
    <>
      {!isRegister ? (
        <div className={loginRegisterClassName}>
          <img
            src="/Pngtree-mental-health-problems_flat_illustration_6855451.png"
            alt="Panic Help illustration"
            className={loginIconClassName}
          />
          <div className={loginFormClassName}>
            <p className={loginRegisterFormClassName}>Welcome!</p>
            <div>
              <Label htmlFor="usernameField" styles={LoginRegisterLabelStyle}>
                Username
              </Label>
              <TextField
                id="usernameField"
                name="email"
                styles={LoginInputStyle}
                value={username}
                onChange={onChangeUsername}
                required
                errorMessage={loginError}
              />
            </div>
            <div>
              <Label htmlFor="paswordField" styles={LoginRegisterLabelStyle}>
                Password
              </Label>
              <TextField
                id="paswordField"
                type="password"
                canRevealPassword
                revealPasswordAriaLabel="Show password"
                styles={LoginInputStyle}
                value={password}
                onChange={onChangePassword}
                required
                errorMessage={loginError}
              />
            </div>
            <DefaultButton
              text="Sign In"
              className={loginRegisterButtonClassName}
              onClick={() => sendToLogin()}
            />
            <p>
              Don't have an account?{" "}
              <ActionButton
                className={signUpActionButtonClassName}
                onClick={() => {
                  setEmptyErrorStates();
                  setIsRegister(true);
                  resetStates();
                }}
              >
                Sign up
              </ActionButton>
            </p>
          </div>
        </div>
      ) : (
        <div className={registerContainerClassName}>
          <p className={loginRegisterFormClassName}>Join our community</p>
          <div className={registerFormClassName}>
            <div className={registerColumnClassName}>
              <div>
                <Label htmlFor="usernameField" styles={LoginRegisterLabelStyle}>
                  Username
                </Label>
                <TextField
                  id="usernameField"
                  name="username"
                  styles={RegisiterInputStyle}
                  value={username}
                  onChange={onChangeUsername}
                  required
                  errorMessage={usernameError}
                />
              </div>
              <div>
                <Label htmlFor="passwordField" styles={LoginRegisterLabelStyle}>
                  Password
                </Label>
                <TextField
                  id="passwordField"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={RegisiterInputStyle}
                  value={password}
                  onChange={onChangePassword}
                  required
                  errorMessage={passwordError}
                />
              </div>
              <div>
                <Label
                  htmlFor="confirmPasswordField"
                  styles={LoginRegisterLabelStyle}
                >
                  Confirm Password
                </Label>
                <TextField
                  id="confirmPasswordField"
                  type="password"
                  canRevealPassword
                  revealPasswordAriaLabel="Show password"
                  styles={RegisiterInputStyle}
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  required
                  errorMessage={confirmPasswordError}
                />
              </div>
            </div>
            <div className={registerColumnClassName}>
              <div>
                <Label
                  htmlFor="firstNameField"
                  styles={LoginRegisterLabelStyle}
                >
                  First Name
                </Label>
                <TextField
                  id="firstNameField"
                  name="firstName"
                  styles={RegisiterInputStyle}
                  value={firstName}
                  onChange={onChangeFirstName}
                  required
                  errorMessage={firstNameError}
                />
              </div>
            </div>
          </div>
          <DefaultButton
            text="Sign Up"
            className={loginRegisterButtonClassName}
            onClick={sendToRegister}
          />
          <p>
            Already have an account?{" "}
            <ActionButton
              className={signUpActionButtonClassName}
              onClick={() => {
                setEmptyErrorStates();
                setIsRegister(false);
                resetStates();
              }}
            >
              Login
            </ActionButton>
          </p>
          <img
            src="/33891894_2210_w048_n005_383b_p1_383-removebg-preview.png"
            alt="Welcome to Therapease"
            className={registerIconClassName}
          />
        </div>
      )}
    </>
  );
};
