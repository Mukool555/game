import React from 'react';

const AvatarSelector = ({ avatars, onAvatarSelect }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen min-h-screen flex flex-col justify-center items-center bg-[url('/assets/gameBg.jpg')] bg-cover bg-center">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-center text-black mb-4">Select Your Avatar</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          {avatars.map((avatar, index) => (
            <button 
              key={index} 
              onClick={() => onAvatarSelect(avatar)}
              className="p-2 border-2 border-gray-300 rounded-lg cursor-pointer bg-white transition-transform hover:scale-110 hover:border-blue-500 hover:shadow-lg"
            >
              <img src={avatar.imageUrl} alt={`Avatar ${index}`} className="w-[50px]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;
