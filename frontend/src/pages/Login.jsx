import "../styles.css";
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
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {email, password} = formData;

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
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("Button submitted");

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const onSubmitButtonClick = (e) => {

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const onKeyPressed = (e) => {
    if (e.key === "Enter") {
      // console.log("Enter was pressed");
      onSubmitButtonClick();
    }
  };

  const onRegisterLinkClick = (e) => {
    e.preventDefault();
    navigate("/register");
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
      <div className="centered">
        <Paper elevation="2" style={paperStyle}>
          <Grid align="center">
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
              onKeyPress={onKeyPressed}
              fullWidth
            />
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
                Login
              </Button>
            </div>
            <Typography>
              <a href="" onClick={onRegisterLinkClick}>
                Not having an account? Register
              </a>
            </Typography>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default Login;
