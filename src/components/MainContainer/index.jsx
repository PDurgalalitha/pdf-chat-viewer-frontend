import { useState, useRef } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import ChatWindow from "../ChatWindow";
import PdfViewer from "../PdfViewer/index.jsx";
import styles from "./index.module.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from "../Loader/index.jsx";
import NoData from "../NoData/index.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const MainContainer = () => {
  const fileInputRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  // Upload PDF and get URL from backend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file?.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}upload`,
        formData
      );
      setPdfUrl(res?.data?.pdfUrl);
      setMessages([{ role: "system", text: "PDF uploaded successfully!" }]);
    } catch (err) {
      console.error(err);
      alert("unable to upload the file. please try again later");
    } finally {
      setLoading(false);
    }
  };

  // Ask question to backend

  return loading ? (
    <Loader isLarge={true} />
  ) : (
    <div className={styles.container}>
      <p className={styles.header}>PDF Chat Assistant</p>

      {/* Upload Section */}
      <div
        className={styles.uploadSection}
        onClick={() => fileInputRef?.current?.click()}
      >
        <CloudUploadIcon className={styles.subheader} />
        <span className={styles.subheader}>upload file </span>
        <span>{fileName ? fileName : ""}</span>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className={styles.file}
        />
      </div>

      {pdfUrl ? (
        <div className={styles.pdfChatContainer}>
          <PdfViewer pdfUrl={pdfUrl} />
          <ChatWindow setMessages={setMessages} messages={messages} />
        </div>
      ) : (
        <>
          <p className={styles.content}>upload a pdf file</p>
          <NoData />
        </>
      )}
    </div>
  );
};

export default MainContainer;
