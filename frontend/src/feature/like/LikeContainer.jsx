import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from "axios";
import { useState } from "react";

export function LikeContainer({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);

  function handleHeartClick() {
    setIsProcessing(true);
    axios
      .put("/api/like", { boardId: boardId })
      .then(() => {})
      .catch((error) => {})
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <div className="d-flex gap-2 h2">
      <div onClick={handleHeartClick}>
        <GoHeart />
        <GoHeartFill />
      </div>
      <div>9</div>
    </div>
  );
}
