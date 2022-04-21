import "../styles.css"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MemoForm from "../components/MemoForm";
import MemoItem from "../components/MemoItem";
import Spinner from "../components/Spinner";
import { getMemos, reset } from "../features/memo/memoSlice";
import { Button, ButtonGroup} from "@material-ui/core";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { memos, isLoading, isError, message } = useSelector(
    (state) => state.memos
  );

  useEffect(() => {
    if (isError) {
      // console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getMemos());

    //do something when component unmounts
    return () => {
      // dsispatch(reset());
    };
  } , [user,navigate, isError,dispatch]);
  // }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="centeredVertical">
        <div>
        <h1>Welcome, {user && user.name}!</h1>
        <div></div>
        <h2>Here's your memos Dashboard</h2>


      <MemoForm />

      <div className="content">
        <section>
          {memos.length > 0 ? (
            <div className="memosContainer">
              {memos.map((memo) => (
                <MemoItem key={memo._id} memo={memo} />
              ))}
            </div>
          ) : (
            <h3>You have not made any memos.</h3>
          )}
        </section>
      </div>

      </div>
      </div>
    </>
  );
};

export default Dashboard;
