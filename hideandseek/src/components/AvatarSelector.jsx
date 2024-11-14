import React from 'react';

const AvatarSelector = ({ avatars, onAvatarSelect }) => {
  return (
    <div>
      <h3>Select Your Avatar</h3>
      {avatars.map((avatar, index) => (
        <button key={index} onClick={() => onAvatarSelect(avatar)}>
          <img src={avatar.imageUrl} alt={`Avatar ${index}`} style={{ width: '50px' }} />
        </button>
      ))}
    </div>
  );
};

export default AvatarSelector;
