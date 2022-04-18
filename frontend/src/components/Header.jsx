import "../styles.css";
import fossa from "../images/fossa4.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Button } from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
//register
import PersonAddIcon from "@material-ui/icons/PersonAdd";
//logout
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//login
import PersonIcon from "@material-ui/icons/Person";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLoginButtonClick = () => {
    navigate("/login");
  };

  const onRegisterButtonClick = () => {
    navigate("/register");
  };

  const onLogoutButtonClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onLogoClick = () => {
    navigate("/");
  };

  const onDashboardButtonClicked = () => {
    navigate("/dashboard");
  };

  return (
    <header className="grayheader">
      <img src={fossa} alt="logo" className="logo" onClick={onLogoClick} />
      <div className="headerColumn">
        <div className="mainName">
          <div className="title">
            <h1>Fossa-memomaker</h1>
          </div>
          <div className="buttonsLine">
            <Button
              onClick={onDashboardButtonClicked}
              variant="contained"
              color="primary"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>

            {user ? (
              <Button
                onClick={onLogoutButtonClick}
                variant="contained"
                color="primary"
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            ) : (
              <>
                {" "}
                <Button
                  onClick={onLoginButtonClick}
                  variant="contained"
                  color="primary"
                  startIcon={<PersonIcon />}
                >
                  Login
                </Button>
                <Button
                  onClick={onRegisterButtonClick}
                  variant="contained"
                  color="primary"
                  startIcon={<PersonAddIcon />}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
