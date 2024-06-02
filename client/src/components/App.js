import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const testUser = { username: "Duane" };

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await fetch("http://127.0.0.1:4000/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAddMessage(newMessage) {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  function handleDeleteMessage(id) {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  }

  function handleUpdateMessage(updatedMessageObj) {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === updatedMessageObj.id ? updatedMessageObj : message
      )
    );
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      {error ? (
        <div>Error: {error}</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <MessageList
            messages={displayedMessages}
            currentUser={testUser}
            onMessageDelete={handleDeleteMessage}
            onUpdateMessage={handleUpdateMessage}
          />
          <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
        </>
      )}
    </main>
  );
}

export default App;
