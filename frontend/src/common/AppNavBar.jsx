import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";
import { FaUserAstronaut, FaUserSecret } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GiAstronautHelmet } from "react-icons/gi";

export function AppNavBar() {
  const { user, isAdmin } = useContext(AuthenticationContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    // console.log("search form submit");
    navigate("/?q=" + keyword);
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <GiAstronautHelmet className="me-2" />
            PRJ3
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                HOME
              </Nav.Link>
              {user !== null && (
                <Nav.Link as={NavLink} to="/board/add">
                  새 글
                </Nav.Link>
              )}
            </Nav>

            <Nav className="order-lg-3">
              {user === null && (
                <Nav.Link as={NavLink} to="/signup">
                  회원가입
                </Nav.Link>
              )}
              {isAdmin() && (
                <Nav.Link as={NavLink} to="/member/list">
                  회원목록
                </Nav.Link>
              )}
              {user === null && (
                <Nav.Link as={NavLink} to="/login">
                  로그인
                </Nav.Link>
              )}

              {user !== null && (
                <Nav.Link as={NavLink} to="/logout">
                  로그아웃
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to={`/member?email=${user.email}`}>
                  <FaUserAstronaut /> {user.nickName}
                </Nav.Link>
              )}
            </Nav>

            <Form
              inline="true"
              onSubmit={handleSearchFormSubmit}
              className="order-lg-2 mx-lg-auto"
            >
              <InputGroup>
                <FormControl
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button type="submit">
                  <FiSearch />
                </Button>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
