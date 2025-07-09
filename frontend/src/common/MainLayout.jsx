import { Link, Outlet } from "react-router";

export function MainLayout() {
  return (
    <div>
      <div>
        navbar
        <Link to="/">HOME</Link>
        <Link to="/board/add">글쓰기</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}