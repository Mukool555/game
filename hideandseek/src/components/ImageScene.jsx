import React, { useState } from 'react';

const ImageScene = ({ sceneImage, onClickHide, selectedAvatar }) => {
  const [isFading, setIsFading] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState(null);

  const handleSceneClick = (e) => {
    if (isFading) return; // Prevent multiple clicks during the fade-out animation

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setAvatarPosition({ x, y });
    setIsFading(true);

    // Call the parent function after the fade-out animation ends
    setTimeout(() => {
      setIsFading(false);
      onClickHide({ x, y });
    }, 1000); // Adjust timeout duration to match CSS animation
  };

  return (
    <div
      style={{
        position: 'relative',
        cursor: `url(${selectedAvatar}), auto`, // Set the avatar as the cursor
      }}
      onClick={handleSceneClick}
    >
      <img
        src={sceneImage}
        alt="Game Scene"
        style={{ width: '100%', display: 'block' }}
      />
      {avatarPosition && (
        <>
          <img
            src={selectedAvatar}
            alt="Avatar"
            style={{
              position: 'absolute',
              top: `${avatarPosition.y}px`,
              left: `${avatarPosition.x}px`,
              width: '50px', // Adjust size as needed
              transition: 'opacity 1s ease-out',
              opacity: isFading ? 0 : 1,
            }}
          />
          {/* Marker for hiding position */}
          <div
            style={{
              position: 'absolute',
              top: `${avatarPosition.y - 5}px`, // Adjust for marker size
              left: `${avatarPosition.x - 5}px`,
              width: '10px',
              height: '10px',
              backgroundColor: 'blue',
              borderRadius: '50%',
              border: '2px solid white',
              pointerEvents: 'none', // Prevent interference with clicks
            }}
          />
        </>
      )}
    </div>
  );
};

export default ImageScene;
