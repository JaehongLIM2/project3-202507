import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { CommentItem } from "./CommentItem.jsx";

export function CommentList({ commentList, isProcessing, setIsProcessing }) {
  return (
    <div>
      {commentList.map((comment) => (
        <CommentItem
          setIsProcessing={setIsProcessing}
          isProcessing={isProcessing}
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
}
