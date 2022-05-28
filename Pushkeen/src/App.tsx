import { Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import UserProfilePage from "./pages/UserProfilePage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/user/:id" element={<UserProfilePage />} />
      <Route path="/post/:id" element={<PostPage />} />
    </Routes>
  );
}

export default App;
