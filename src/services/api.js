import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const askQuestion = (question) => {
  return axios.post(`${API_BASE}/chat`, { question });
};
