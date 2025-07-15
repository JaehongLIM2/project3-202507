import { Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function CommentAdd({ boardId }) {
  const [comment, setComment] = useState("");

  function handleCommentSaveClick() {
    axios
      .post("/api/comment", { boardId: boardId, comment: comment })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {});
  }

  return (
    <div>
      <FormControl
        as="textarea"
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button onClick={handleCommentSaveClick}>댓글 저장</Button>
    </div>
  );
}
