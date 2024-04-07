import { useState } from "react";
import Chat from "../components/Chat";
import History from "../components/History";
import Alphabet from "../components/Alphabet";
import Predictor from "../components/Predictor";

const MOCK_MESSAGES = [
  "Hello, world!",
  "How are you?",
  "I'm doing great, thanks for asking!",
  "What's your name?",
  "My name is Dashoo!",
];

const CommunicationPage = () => {
  const [history, setHistory] = useState(MOCK_MESSAGES);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageChange = (message) => {
    setCurrentMessage(message);
  };

  const handleSuggestionSelect = (suggestion) => {
    const words = currentMessage.split(" ");
    words.pop(); // Remove the last word (or partial word)
    const newMessage = [...words, suggestion].join(" ") + " ";
    setCurrentMessage(newMessage);
    // Optionally, clear the suggestion list here or fetch new suggestions based on the new message
  };
  return (
    <>
      <div className="flex h-full w-full gap-4">
        <History history={history} />
        <Alphabet />
      </div>
      <Predictor
        message={currentMessage}
        onSuggestionSelect={handleSuggestionSelect}
      />
      <Chat onMessageChange={handleMessageChange} message={currentMessage} />
    </>
  );
};

export default CommunicationPage;
