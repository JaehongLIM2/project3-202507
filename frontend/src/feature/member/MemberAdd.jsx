import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export function MemberAdd() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [info, setInfo] = useState("");

  function handleSaveClick() {
    // post -> /api/member/add, {email, password, nickname, info}
    axios
      .post("/api/member/add", {
        email: email,
        password: password,
        nickName: nickName,
        info: info,
      })
      .then((res) => {
        console.log("잘됨");
      })
      .catch((err) => {
        console.log("안됨");
      })
      .finally(() => {
        console.log("항상");
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">회원가입</h2>
        <div>
          <FormGroup className="mb-3" controlId="email1">
            <FormLabel>이메일</FormLabel>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password1">
            <FormLabel>암호</FormLabel>
            {/* type 은 password 인데 보이도록 text 로 둠 */}
            <FormControl
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password2">
            {/* TODO: 나중에 적용*/}
            <FormLabel>암호 확인</FormLabel>
            {/* type 은 password 인데 보이도록 text 로 둠 */}
            <FormControl type="text" />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="nickName1">
            <FormLabel>별명</FormLabel>
            <FormControl
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="info1">
            <FormLabel>자기소개</FormLabel>
            <FormControl
              as="textarea"
              row={6}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="mb-3">
          <Button onClick={handleSaveClick}>저장</Button>
        </div>
      </Col>
    </Row>
  );
}
