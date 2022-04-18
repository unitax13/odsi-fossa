import "../styles.css";
import { useDispatch } from "react-redux";
import { deleteMemo } from "../features/memo/memoSlice";
import { Button, ButtonGroup, Paper, Grid } from "@material-ui/core";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import MemoFormEdit from "./MemoFormEdit";

function MemoItem({ memo }) {
  const dispatch = useDispatch();

  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("Is edititng = " + isEditing)
  }, [isViewing, isEditing]);

  const paperStyle = {
    padding: 5,
    width: "98%",
    margin: "20px auto",
  };

  const onViewButtonClicked = () => {
    if (isViewing) {
      setIsViewing(false);
    } else {
      setIsViewing(true);
    }
  };

  const onEditButtonClicked = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const myelement = memo.sanitizedHtml;
  // console.log(myelement);

  return (
    <div className="memoContainer">
      <div>
        <div className="memoHeader">
          {new Date(memo.createdAt).toLocaleString("pl-PL")}

          <Button
            onClick={onViewButtonClicked}
            variant="contained"
            color="primary"
            startIcon={<PageviewIcon />}
          >
            View
          </Button>

          <Button
            onClick={() => dispatch(deleteMemo(memo._id))}
            color="secondary"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
          >
            Delete
          </Button>
        </div>

        {isViewing === true ? (
          <Paper elevation={2} style={paperStyle}>
            <div
              id="markdownView"
              className="markdownView"
              dangerouslySetInnerHTML={{ __html: myelement }}
            />
          </Paper>
        ) : (
          ""
        )}

        {isEditing === true ? (
          <MemoFormEdit id={memo._id} text={memo.markdown} onEditButtonClicked={onEditButtonClicked}/>
        ) : (
          <div className="memoText">
            {memo.markdown.length < 40
              ? memo.markdown
              : memo.markdown.substring(0, 40) + "..."}

            <Button
              onClick={onEditButtonClicked}
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemoItem;
