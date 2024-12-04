import React, { useState } from "react";
import { fileToBase64 } from "@/utils/fileHelpers";
import { refreshAccessToken } from "@/app/utils/authHelpers";
import { WebSocketMessage } from "@/types/WebSocketMessage";

interface PostFormProps {
  onPostSubmit: (message: WebSocketMessage) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Message cannot be empty.");
      return;
    }

    const accessToken = await refreshAccessToken();
    if (!accessToken) return;

    let mediaBase64 = null;
    if (file) {
      mediaBase64 = await fileToBase64(file);
    }

    const messageData: WebSocketMessage = {
      type: "new_post",
      action: "create",
      content: message,
      media: mediaBase64 || undefined,
      access_token: accessToken,
    };

    onPostSubmit(messageData);

    setMessage("");
    setFile(null);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a post..."
        style={styles.textarea}
      />
      <div style={styles.fileInputWrapper}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={styles.fileInput}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Post
      </button>
    </form>
  );
};

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#dad7cd", // light background color
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    transition: "all 0.3s ease",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #a3b18a",
    marginBottom: "15px",
    fontSize: "1rem",
    resize: "vertical",
    color: "#3a5a40",
    backgroundColor: "#f1f1f1",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  fileInputWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
    width: "100%",
  },
  fileInput: {
    fontSize: "1rem",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #a3b18a",
    color: "#344e41",
  },
  submitButton: {
    backgroundColor: "#588157", // green button
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    maxWidth: "200px",
    transition: "background-color 0.3s ease",
  },
};

export default PostForm;
