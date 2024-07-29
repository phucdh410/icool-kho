import { useState } from "react";

//!Define status
// neutral: trạng thái bình thường
// edit: trạng thái bình thường

export const useStateToolbar = () => {
  const [status, setStatus] = useState("neutral");

  const updateStatus = (newState = "neutral") => {
    setStatus(newState);
  };

  return { status, updateStatus };
};
