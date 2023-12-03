import { Routes, Route } from "react-router-dom";
import Main from "@/page/Main";
import Layout from "@/page/Layout";
import MyPage from "@/page/MyPage";
import Chat from "@/page/ChatPage";
import OpenChat from "@/page/OpenChat";
import Search from "@/page/Search";
import NotFound from "@page/NotFound";
import Login from "@page/Login";
import Test from "@page/Test";
import MakeRoom from "@components/Chat/MakeRoom";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/openChat" element={<OpenChat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/makeroom" element={<MakeRoom />} />
        <Route path="/test" element={<Test />} />
        {["/me", "/record", "/addRecord", "/profile"].map((path) => (
          <Route key={path} path={path} element={<MyPage />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
