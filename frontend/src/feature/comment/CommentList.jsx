import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [nextComment, setNextComment] = useState(comment);

  function handleDeleteButtonClick() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/${comment.id}`)
      .then((res) => {
        toast("댓글이 삭제 되었습니다.", { type: "success" });
      })
      .catch((err) => {
        toast("댓글 삭제 중 문제가 발생하였습니다.", { type: "error" });
      })
      .finally(() => {
        setIsProcessing(false);
        setDeleteModalShow(false);
      });
  }

  function handleUpdateButtonClick() {
    // TODO : 댓글 수정 코드 . . .
  }

  return (
    <div className="border m-3">
      <div className="d-flex justify-content-between m-3">
        <div>{comment.authorNickName}</div>
        <div>{comment.timesAgo}</div>
      </div>
      <div>{comment.comment}</div>
      <div>
        <Button
          disabled={isProcessing}
          onClick={() => setDeleteModalShow(true)}
        >
          삭제
        </Button>
        <Button disabled={isProcessing} onClick={() => setEditModalShow(true)}>
          수정
        </Button>
      </div>

      {/* 댓글 삭제 모달*/}
      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>댓글을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => setDeleteModalShow(false)}
          >
            취소
          </Button>
          <Button
            disabled={isProcessing}
            variant="danger"
            onClick={handleDeleteButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            삭제
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 댓글 수정 모달*/}
      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId={"commentTextarea" + comment.id}>
            <FormLabel>수정할 댓글</FormLabel>
            <FormControl
              as="textarea"
              rows={5}
              value={nextComment}
              onChange={(e) => setNextComment(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setNextComment(comment.comment);
              setEditModalShow(false);
            }}
          >
            취소
          </Button>
          <Button variant="danger" onClick={handleUpdateButtonClick}>
            {isProcessing && <Spinner size="sm" />}
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
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
