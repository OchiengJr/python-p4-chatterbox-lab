import React from "react";
import Message from "./Message";

function MessageList({ messages, currentUser, onMessageDelete, onUpdateMessage }) {
  return (
    <div className="list">
      <ul>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUser={currentUser}
            onMessageDelete={onMessageDelete}
            onUpdateMessage={onUpdateMessage}
          />
        ))}
      </ul>
      {messages.length === 0 && <p>No messages found.</p>}
    </div>
  );
}

export default MessageList;
