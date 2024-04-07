const History = ({ history }) => {
  return (
    <div className="w-[50%] h-full border border-gray-300 dark:border-gray-700 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">History</h2>
      {history.map((message, index) => (
        <div className="chat chat-start" key={`message-${index}`}>
          <div className="chat-bubble bg-transparent border border-gray-300 dark:border-gray-700 text-lg text-gray-900 dark:text-gray-100">
            {message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
