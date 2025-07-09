import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { BoardAdd } from "./feature/board/BoardAdd.jsx";
import { BoardList } from "./feature/board/BoardList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BoardList />} />
          <Route path="board/add" element={<BoardAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
