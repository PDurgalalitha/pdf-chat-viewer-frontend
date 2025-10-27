import { useRef, useState, useEffect } from "react";
import PdfViewer from "./components/MainContainer/index";
import ChatWindow from "./components/ChatWindow/index";
import { uploadPdf, askQuestion } from "./services/api";

function App() {
  return <PdfViewer />;
}

export default App;
