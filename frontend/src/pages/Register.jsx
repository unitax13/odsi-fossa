import "../styles.css";
import React from "react";
import Header from "../components/Header";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import EntropyCounter from "../components/EntropyCounter";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
      // console.log("navigated because user already logged in");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onSubmitButtonClick = (e) => {
    // console.log("Button clicked");

    //check pass length
    if (password.length < 4) {
      toast.error("Password should have at least 4 characters");
    } else if (password.length > 32) {
      toast.error("Password should have up to 32 characters");
    } else if (email.length > 48) {
      toast.error("Email should have up to 48 characters");
    } else {
      let thereWasError = false;
      const re =
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      try {
        if (!re.test(email)) {
          toast.error("Please enter valid e-mail address");
          thereWasError = true;
        }
      } catch (e) {
        toast.error("Please enter valid e-mail address");
        thereWasError = true;
      }
      if (!thereWasError) {
        if (password !== password2) {
          toast.error("Passwords do not match");
        } else {
          const userData = {
            name,
            email,
            password,
          };

          dispatch(register(userData));
        }
      }
    }
  };

  const onLoginLinkClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const onKeyPressed = (e) => {
    if (e.key === "Enter") {
      // console.log("Enter was pressed");
      onSubmitButtonClick();
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Zarejestruj się, miły człowieku</h1>
      </section>

      <section className="form">
        <div className="centered">
          <Paper elevation="2" style={paperStyle}>
            <Grid align="center">
              <TextField
                label="Name"
                placeholder="Enter name"
                id="name"
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
              <TextField
                label="E-mail"
                placeholder="Enter e-mail"
                id="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
              />
              <TextField
                label="Password"
                placeholder="Enter password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                fullWidth
              />
              <TextField
                label="Confirm password"
                placeholder="Confirm password"
                id="password2"
                type="password"
                value={password2}
                onChange={handlePassword2Change}
                onKeyPress={onKeyPressed}
                fullWidth
              />
              <EntropyCounter password={password}></EntropyCounter>
              <div className="loginButton">
                <Button
                  className="loginButton"
                  type="submit"
                  color="primary"
                  variant="contained"
                  onSubmit={onSubmit}
                  onClick={onSubmitButtonClick}
                  fullWidth
                >
                  Register
                </Button>
              </div>
              <Typography>
                <div></div>
                <a href="" onClick={onLoginLinkClick}>
                  Already having an account? Log in.
                </a>
              </Typography>
            </Grid>
          </Paper>
        </div>
      </section>
    </>
  );
};

export default Register;
