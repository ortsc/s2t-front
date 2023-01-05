import { Routes, Route } from "react-router-dom";

import Home from "../Home";
import Whitepaper from "../Whitepaper";
import Community from "../Community";
import Whitelist from "../Whitelist";
import NotFound from "../NotFound";
import JoinWhitelist from "../JoinWhitelist";
import Success from "../Success";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/whitepaper" element={<Whitepaper />}></Route>
      <Route path="/community" element={<Community />}></Route>
      <Route path="/whitelist" element={<Whitelist />}></Route>
      <Route path="/success" element={<Success />}></Route>
      <Route path="/join-whitelist" element={<JoinWhitelist />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Main;
