import React, { useState } from 'react';
import NameInput from './NameInput';
import AvatarSelector from './AvatarSelector';
import ImageScene from './ImageScene';

const GameBoard = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [hidePosition, setHidePosition] = useState(null);
  const sceneImage = '/assets/jungleImage.jpg'; // Replace with your image path

  const avatars = [
    { id: 1, imageUrl: '/assets/boyAvatar.png' }, // Replace with your avatar paths
    { id: 2, imageUrl: '/assets/girlAvatar.png' },
  ];

  const handleNameSubmit = (playerName) => setName(playerName);
  const handleAvatarSelect = (selectedAvatar) => setAvatar(selectedAvatar);
  const handleHide = (position) => {
    setHidePosition(position);
  };

  const generateLink = () => {
    const baseUrl = window.location.href;
    return `${baseUrl}?x=${hidePosition.x}&y=${hidePosition.y}`;
  };

  return (
    <div>
      {!name && <NameInput onNameSubmit={handleNameSubmit} />}
      {name && !avatar && <AvatarSelector avatars={avatars} onAvatarSelect={handleAvatarSelect} />}
      {name && avatar && !hidePosition && (
        <ImageScene sceneImage={sceneImage} onClickHide={handleHide}  selectedAvatar={avatar.imageUrl}/>
      )}
      {hidePosition && (
        <div>
          <p>Your hiding position is set at coordinates:</p>
          <p>X: {hidePosition.x}, Y: {hidePosition.y}</p>
          <p>
            Share this link with your friends to let them find you:
            <br />
            <a href={generateLink()} target="_blank" rel="noopener noreferrer">
              {generateLink()}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
