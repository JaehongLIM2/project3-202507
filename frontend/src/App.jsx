import { BrowserRouter, Route, Routes, useParams } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { BoardAdd } from "./feature/board/BoardAdd.jsx";
import { BoardList } from "./feature/board/BoardList.jsx";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BoardDetail() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardList />} />
          <Route path="board/add" element={<BoardAdd />} />
          <Route path="board/:id" element={<BoardDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
