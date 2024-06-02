import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);

  const { id, username, body, created_at: createdAt } = message;

  const timestamp = new Date(createdAt).toLocaleTimeString();

  const isCurrentUser = currentUser.username === username;

  function handleDeleteClick() {
    fetch(`http://127.0.0.1:4000/messages/${id}`, {
      method: "DELETE",
    }).then(() => {
      onMessageDelete(id);
    });
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li>
      <span className="user">{username}</span>
      <span className="time">{timestamp}</span>
      {isEditing ? (
        <EditMessage
          id={id}
          body={body}
          onUpdateMessage={handleUpdateMessage}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <p>{body}</p>
      )}
      {isCurrentUser && !isEditing && (
        <div className="actions">
          <button onClick={handleEditClick}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button onClick={handleDeleteClick}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </div>
      )}
    </li>
  );
}

export default Message;
