import { useState, useEffect } from "react";
import { openai } from "../utils/OpenAI";

const Predictor = ({ message, onSuggestionSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    if (!message.trim()) {
      setSuggestions([]);
      return;
    }

    // Clear the existing timeout if the function is called again before the timeout is completed
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 500); // Adjust the delay as needed
    setDebounceTimeout(newTimeout);

    // Cleanup timeout on component unmount
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [message]);

  const fetchSuggestions = async () => {
    try {
      const prompt = determinePrompt(message);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: prompt,
      });

      console.log("Response:", response);

      const newSuggestions = response.choices.map(
        (choice) => choice.message.content
      );
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const determinePrompt = (message) => {
    // Check if the last character is a space to decide between word or sentence suggestions
    if (message.endsWith(" ")) {
      // For sentence suggestions
      // The prompt is designed to encourage the model to generate sentence completions
      // based on the context provided by the user's input.
      return [
        {
          role: "system",
          content:
            "You are a helpful assistant. Provide a sentence completion suggestion based on the input. Only return the suggestion, no other text. If you can't think of anything, just say 'Please tell me more.'. Remember that person who is talking to you is a human who has recently suffered a stroke. They have lost most of their motor skills and can't speak. They are fully conscious and can understand their surroundings. Please be patient with them.",
        },
        { role: "user", content: message.trim() },
      ];
    } else {
      // For word suggestions
      // The prompt is designed to encourage the model to generate word completions
      // based on the partial word provided by the user's input.
      return [
        {
          role: "system",
          content:
            "You are a helpful assistant. Provide a word completion suggestion based on the input. Only return the suggestion, no other text -- do not ask the user for more input. Remember that person who is talking to you is a human who has recently suffered a stroke. They have lost most of their motor skills and can't speak. They are fully conscious and can understand their surroundings. Please be patient with them.",
        },
        { role: "user", content: message },
      ];
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      {suggestions.length > 0 &&
        suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionSelect(suggestion)}
            disabled={!suggestion || suggestion === "Please tell me more."}
            className="cursor-pointer text-lg hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-left w-full disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
    </div>
  );
};

export default Predictor;
