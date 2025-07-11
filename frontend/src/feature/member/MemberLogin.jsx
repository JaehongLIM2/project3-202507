import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogInClick() {
    axios
      .post("/api/member/login", { email: email, password: password })
      .then((res) => {
        console.log("good");
      })
      .catch((err) => {
        console.log("bad");
      })
      .finally(() => {
        console.log("always");
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">로그인</h2>
        <FormGroup controlId="email1" className="mb-3">
          <FormLabel>이메일</FormLabel>
          <FormControl
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password1" className="mb-3">
          <FormLabel>비밀번호</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button onClick={handleLogInClick}>로그인</Button>
      </Col>
    </Row>
  );
}
