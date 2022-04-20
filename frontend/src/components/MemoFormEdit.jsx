import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMemo } from "../features/memo/memoSlice";
import { Box, TextField, Button } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';

function MemoFormEdit({id, markdown, onEditButtonClicked}) {
  const [markdownText, setMarkdownText] = useState(markdown);

  const dispatch = useDispatch();

  const onMemoSubmission = (e) => {
    e.preventDefault();
    // console.log("Submitted");

    
    setMarkdownText("");
  };

  useEffect(() => {
    // console.log(markdown)
  },[markdownText])

  const onSaveButtonClicked = () => {
    dispatch(updateMemo({id: id, markdown: markdownText }));
    // console.log("dispatched with id of " + id + " and markdown t4ext of " + markdownText)
    onEditButtonClicked();
  }

  return (
    <section className="form">
      {/* <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Memo</label>
                <input type="text" name="markdownText" id="markdownText" value={markdownText} onChange={(e) => setMarkdownText(e.target.value)}/>
            </div> */}
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          multiline
          id="markdownText"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
        />
      </Box>

      <div className="form-group">
        <Button
          onClick={onSaveButtonClicked}
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
        >
          Save
        </Button>
      </div>

      {/* </form> */}
    </section>
  );
}

export default MemoFormEdit;
