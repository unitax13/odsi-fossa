import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMemo, getMemos } from "../features/memo/memoSlice";
import { Box, TextField, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function MemoForm() {
  const [markdownText, setMarkdownText] = useState("");

  const dispatch = useDispatch();

  const onMemoSubmission = (e) => {
    e.preventDefault();
    console.log("Submitted");

    dispatch(createMemo({ markdown: markdownText }));
    dispatch(getMemos);
    setMarkdownText("");
  };

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
          variant="contained"
          color="primary"
          onClick={onMemoSubmission}
          startIcon={<AddIcon />}
        >
          Add Memo
        </Button>
      </div>

      {/* </form> */}
    </section>
  );
}

export default MemoForm;
