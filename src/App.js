import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <BrowserRouter basename="/CSCI490">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
