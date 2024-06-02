import React, { useState } from "react";

function EditMessage({ id, body, onUpdateMessage }) {
  const [messageBody, setMessageBody] = useState(body);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch(`http://127.0.0.1:4000/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: messageBody,
      }),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to update message");
        }
        return r.json();
      })
      .then((updatedMessage) => {
        onUpdateMessage(updatedMessage);
        setIsSubmitting(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsSubmitting(false);
      });
  }

  return (
    <form className="edit-message" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default EditMessage;
