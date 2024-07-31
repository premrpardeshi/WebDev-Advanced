import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Receiver from "./components/Receiver";
import Sender from "./components/Sender";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sender" element={<Sender></Sender>}></Route>
          <Route path="/receiver" element={<Receiver></Receiver>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
