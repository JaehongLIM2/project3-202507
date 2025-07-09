import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";

export function BoardDetail() {
  const [board, setBoard] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // axios 로 해당 게시물 가져오기
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        console.log("잘됨");
        setBoard(res.data);
      })
      .catch((err) => {
        console.log("안됨");
        toast("해당 게시물이 없습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상");
      });
  }, []);

  function handleDeleteButtonClick() {
    axios
      .delete(`/api/board/${id}`)
      .then((res) => {
        console.log("잘됨");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/");
      })
      .catch((err) => {
        console.log("안됨");
        toast("게시물이 삭제되지 않았습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상");
      });
  }

  // 만약 게시물이 없으면 스피너
  if (!board) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h3 className="mb-4">{board.id}번 게시물</h3>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>제목</FormLabel>
            <FormControl readOnly={true} value={board.title} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="content1">
            <FormLabel>본문</FormLabel>
            <FormControl
              as="textarea"
              row={6}
              readOnly={true}
              value={board.content}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>작성자</FormLabel>
            <FormControl readOnly={true} value={board.author} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>작성일시</FormLabel>
            <FormControl
              type="datetime-local"
              readOnly={true}
              value={board.insertedAt}
            />
          </FormGroup>
        </div>
        <div>
          <Button
            onClick={handleDeleteButtonClick}
            className="me-2"
            variant="outline-danger"
          >
            삭제
          </Button>
          <Button variant="outline-info">수정</Button>
        </div>
      </Col>
    </Row>
  );
}
