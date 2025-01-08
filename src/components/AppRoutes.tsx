import { Routes, Route } from "react-router-dom";

import Main from "@/pages/Main";
import Top from "@/pages/Top100";
import Search from "@/pages/Search";
import Favorites from "@/pages/Favorites";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Main />} />{" "}
      <Route path="/main" element={<Main />} />
      <Route path="/top100" element={<Top />} />
      <Route path="/search" element={<Search />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}
