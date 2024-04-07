import { useState } from "react";

const MOCK_BIO = `Pouya is 22 years old and has down syndrome. He's recently had a stroke and have lost most of his motor skills.
He's loves to talk and interact with people. He currently can't speak but he is fully conscious and can understand his surroundings.
`;

const ProfilePage = () => {
  const [bio, setBio] = useState(MOCK_BIO);

  return (
    <div className="h-full mt-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4">Pouya's Profile</h1>
      <textarea
        className="textarea textarea-bordered bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 mb-4 min-h-[50%]"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></textarea>

      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-sm text-gray-300 dark:text-gray-100"
      />
    </div>
  );
};

export default ProfilePage;
