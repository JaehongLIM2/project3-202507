import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { VscTrash } from "react-icons/vsc";
import { TiPencil } from "react-icons/ti";
import { FaUserAstronaut, FaUserSecret } from "react-icons/fa";
import { RxClock } from "react-icons/rx";

export function CommentItem({ comment, isProcessing, setIsProcessing }) {
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [nextComment, setNextComment] = useState(comment.comment);
  const { hasAccess } = useContext(AuthenticationContext);

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
    setIsProcessing(true);
    axios
      .put(`/api/comment`, {
        id: comment.id,
        comment: nextComment,
      })
      .then((res) => {
        toast.success("댓글이 수정되었습니다.");
      })
      .catch((err) => {
        toast.error("댓글 수정 중 문제가 발생하였습니다.");
      })
      .finally(() => {
        setIsProcessing(false);
        setEditModalShow(false);
      });
  }

  return (
    <>
      <Card className="my-3">
        <CardHeader className="d-flex justify-content-between">
          <div className="fw-bold">
            <FaUserAstronaut /> 작성자 : {comment.authorNickName}
          </div>
          <small>
            <RxClock /> {comment.timesAgo}
          </small>
        </CardHeader>
        <CardBody>
          <div style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</div>
        </CardBody>

        {hasAccess(comment.authorEmail) && (
          <div className="d-flex justify-content-end">
            <Button
              className="m-1"
              size="sm"
              variant="outline-danger"
              disabled={isProcessing}
              onClick={() => setDeleteModalShow(true)}
            >
              {isProcessing ? (
                <>
                  <Spinner size="sm" />
                  삭제 중...
                </>
              ) : (
                <VscTrash />
              )}
            </Button>
            <Button
              className="m-1"
              size="sm"
              variant="outline-primary"
              disabled={isProcessing}
              onClick={() => setEditModalShow(true)}
            >
              {isProcessing ? (
                <>
                  <Spinner size="sm" />
                  수정 중...
                </>
              ) : (
                <TiPencil />
              )}
            </Button>
          </div>
        )}
      </Card>

      {/* 댓글 삭제 모달*/}
      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>댓글 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>댓글을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            className="m-1"
            variant="outline-dark"
            onClick={() => setDeleteModalShow(false)}
          >
            취소
          </Button>
          <Button
            className="m-1"
            disabled={isProcessing}
            variant="danger"
            onClick={handleDeleteButtonClick}
          >
            {isProcessing ? (
              <>
                <Spinner size="sm" />
                삭제 중...
              </>
            ) : (
              <VscTrash />
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {hasAccess(comment.authorEmail) && (
        <>
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
                className="m-1"
                variant="outline-dark"
                onClick={() => {
                  setNextComment(comment.comment);
                  setEditModalShow(false);
                }}
              >
                <VscTrash />
              </Button>
              <Button
                className="m-1"
                variant="primary"
                onClick={handleUpdateButtonClick}
              >
                {isProcessing ? (
                  <>
                    <Spinner size="sm" />
                    수정 중...
                  </>
                ) : (
                  <TiPencil />
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
