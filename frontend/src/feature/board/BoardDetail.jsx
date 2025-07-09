import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function BoardDetail() {
  const { id } = useParams();
  useEffect(() => {
    // axios 로 해당 게시물 가져오기
    axios
      .get(`/api/board/${id}`)
      .then((res) => {
        console.log("잘됨");
      })
      .catch((err) => {
        console.log("안됨");
        toast("해당 게시물이 없습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상");
      });
  }, []);

  return <h1>게시물 보기</h1>;
}