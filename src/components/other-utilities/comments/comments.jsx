import { useState } from "react";
import "./comments.css";

const comments = [
  {
    id: 1,
    comment: "How are you",
    likes: 3,
    timestamp: "2d",
    replies: [
      {
        id: "REPLY1",
        replay: "I am fine",
        likes: 89,
      },
      {
        id: "REPLY2",
        replay: "I am fine",
        likes: 80,
      },
      {
        id: "REPLY3",
        replay: "I am fine",
        likes: 8,
      },
    ],
  },
];

const Comments = () => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="comments-container">
      {comments.map((commentObj) => (
        <div key={commentObj.id} className="comment-wrapper">
          <div className="comment-main">
            <p className="comment-msg">{commentObj.comment}</p>
            <div className="comment-lower-part">
              <span>{commentObj.timestamp}</span>
              <div className="likes">
                <span
                  className="heartAnimation"
                  onClick={(e) => e.target.classList.toggle("active")}
                ></span>
                <span>{commentObj.likes}</span>
              </div>
              <span>Reply</span>
            </div>

            <div
              className="view-reply"
              onClick={() => setShowReply((pre) => !pre)}
            >
              Replies {commentObj.replies.length}
            </div>
          </div>

          {showReply && (
            <div className="comment-replies">
              {commentObj.replies.map((replay) => (
                <div>
                  <p className="msg">{commentObj.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
