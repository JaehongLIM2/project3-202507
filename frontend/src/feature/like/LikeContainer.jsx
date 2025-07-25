import { GoHeart, GoHeartFill } from "react-icons/go";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function LikeContainer({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [likeInfo, setLikeInfo] = useState(null);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/like/board/${boardId}`)
        .then((res) => {
          setLikeInfo(res.data);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [isProcessing]);

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

  if (!likeInfo) {
    return <Spinner />;
  }

  return (
    <div className="d-flex gap-2 h2">
      {user === null ? (
        <div>
          <OverlayTrigger
            placement="top"
            trigger={["hover", "focus"]}
            overlay={<Tooltip id="tooltip1">로그인 하세요.</Tooltip>}
          >
            <GoHeart />
          </OverlayTrigger>
        </div>
      ) : isProcessing ? (
        <div>
          <Spinner animation="grow" />
        </div>
      ) : (
        <div onClick={handleHeartClick}>
          {likeInfo.liked ? <GoHeartFill /> : <GoHeart />}
        </div>
      )}
      <div>{likeInfo.count}</div>
    </div>
  );
}
