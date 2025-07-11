import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function MemberLogout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    toast("로그아웃 되었습니다.", { type: "success" });
    navigate("/");
  }, []);

  return <Spinner />;
}
