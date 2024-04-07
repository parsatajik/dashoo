import { useState, useEffect } from "react";
import { useNeurosity } from "../contexts/NeurosityContext";

const Chat = ({ onMessageChange, message }) => {
  const [localMessage, setLocalMessage] = useState("");

  const { neurosity } = useNeurosity();

//   useEffect(() => {
//     if (!neurosity) {
//       return;
//     }

//     neurosity.kinesis("jumpingJacks").subscribe((data) => {
//       console.log("Jumping jacks data:", data);
//     });

//     return () => {
//       neurosity.kinesis("jumpingJacks").unsubscribe();
//     };
//   }, [neurosity]);

  useEffect(() => {
    setLocalMessage(message);
  }, [message]);

  const handleChange = (e) => {
    const newMessage = e.target.value;
    setLocalMessage(newMessage);
    onMessageChange(newMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    // Here you can handle the submission, for example, sending the message
    console.log("Submitted message:", localMessage);
    // Optionally clear the message after sending
    // setLocalMessage("");
  };

  return (
    <div className="relative flex items-center mt-4">
      <input
        type="text"
        className="input input-bordered input-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 text-3xl pl-4 pr-12 min-h-[150px]"
        value={localMessage}
        onChange={handleChange}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 btn text-xl h-[80%] bg-blue-500 hover:bg-blue-600 text-white dark:text-gray-100 dark:bg-blue-700"
      >
        Push
      </button>
    </div>
  );
};

export default Chat;
