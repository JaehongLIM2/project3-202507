import { Button, FormControl, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommentAdd } from "./CommentAdd.jsx";
import { CommentList } from "./CommentList.jsx";

export function CommentContainer({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(0);
  const [commentList, setCommentList] = useState(null);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/board/${boardId}`)
        .then((res) => {
          setCommentList(res.data);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [isProcessing]);

  if (commentList === null) {
    return <Spinner />;
  }

  return (
    <div className="mt-2">
      <h4>댓글 ({commentList.length})</h4>

      <CommentAdd
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
      <CommentList
        commentList={commentList}
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    </div>
  );
}
