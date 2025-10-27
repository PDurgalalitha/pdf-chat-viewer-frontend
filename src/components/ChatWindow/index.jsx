import { useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { askQuestion } from "../../services/api";
const ChatWindow = ({ setMessages, messages }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };
  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    try {
      setLoading(true);
      setMessages((prev) => [...prev, { role: "user", text: question }]);
      const res = await askQuestion(question);

      const { answer, citations } = res?.data;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer, citations },
      ]);

      setQuestion("");
    } catch (err) {
      console.error(err);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.chatSection}>
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg?.role === "user"
                ? `${styles.message} ${styles.user}`
                : `${styles.message} ${styles.assistant}`
            }
          >
            <span className={msg?.role === "user" ? styles.text : ""}>
              <strong>{msg?.role === "user" ? "You:" : "Assistant:"}</strong>{" "}
              {msg.text}
            </span>
            {msg.citations && (
              <div className={styles.citations}>
                {msg?.citations.map((c, j) => (
                  <button
                    key={j}
                    className={styles.citationBtn}
                    onClick={() => {
                      const element = document.getElementById(
                        `page_${c?.page}`
                      );
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    Page {c?.page}: {c?.preview}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Ask about the PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <SendIcon
          onClick={handleAsk}
          disabled={loading}
          className={styles.send}
        />
        {/* <button onClick={handleAsk} disabled={loading}>
          {loading ? "..." : "Ask"}
        </button> */}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Chat request failed. Please try again later.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ChatWindow;

