import React, { useState, useEffect } from 'react';

const SeekerBoard = ({ sceneImage, hiderAvatar }) => {
  const queryParams = new URLSearchParams(window.location.search);
  const targetX = parseInt(queryParams.get('x'), 10);
  const targetY = parseInt(queryParams.get('y'), 10);
  const [attemptsLeft, setAttemptsLeft] = useState(20);
  const [clickCount, setClickCount] = useState(0); // Track number of clicks
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(30); // 30-second timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showHiderAvatar, setShowHiderAvatar] = useState(false); // State to show the avatar after 5 clicks

  useEffect(() => {
    if (timerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setMessage("Time's up! Game Over!");
      setTimerRunning(false);
    }
  }, [timerRunning, timer]);

  const handleSceneClick = (e) => {
    if (attemptsLeft <= 0 || message) return; // Prevent further clicks after game is over

    if (!timerRunning) {
      setTimerRunning(true); // Start the timer when the first click happens
    }

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance between click and target
    const distance = Math.sqrt(Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2));

    console.log('Click coordinates:', { x, y });
    console.log('Distance to target:', distance);

    // Show marker at click position
    setMarkerPosition({ x, y });

    // Increment click count
    setClickCount(clickCount + 1);

    // Check if distance is within 50 pixels for a successful find
    if (distance <= 40) {
      setMessage('You found the hidden location!');
      setTimerRunning(false);
    } else {
      setAttemptsLeft(attemptsLeft - 1);
      if (attemptsLeft - 1 === 0) {
        setMessage('Game Over! You did not find the hidden location.');
        setTimerRunning(false);
      }
    }

    // After 5 clicks, show the hider's avatar for 2 seconds
    if (clickCount + 1 === 5) {
      setShowHiderAvatar(true);
      // Hide the avatar after 2 seconds
      setTimeout(() => {
        setShowHiderAvatar(false);
      }, 1000); // Avatar will disappear after 2 seconds
    }
  };

  return (
    <div>
      <h3>Find the Hidden Avatar</h3>
      <p>Attempts left: {attemptsLeft}</p>
      <p>Time left: {timer} seconds</p> {/* Display remaining time */}
      <div style={{ position: 'relative' }}>
        <img
          src={sceneImage}
          alt="Game Scene"
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={handleSceneClick}
        />
        {markerPosition && (
          <div
            style={{
              position: 'absolute',
              top: `${markerPosition.y - 5}px`, // Adjust for marker size
              left: `${markerPosition.x - 5}px`,
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
              pointerEvents: 'none', // Prevent interfering with click events
            }}
          />
        )}

        {/* After 5 clicks, show the hider's avatar for 2 seconds */}
        {showHiderAvatar && (
          <div
            style={{
              position: 'absolute',
              top: `${targetY - 50}px`, // Adjust the position for visibility
              left: `${targetX - 50}px`, // Adjust the position for visibility
              width: '100px', // Adjust the size of the avatar
              height: '100px',
              borderRadius: '50%',
              backgroundImage: `url(${hiderAvatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '2px solid white',
            }}
          />
        )}
      </div>
      {message && (
        <div>
          <p className="popup-text text-black">{message}</p>
        </div>
      )}
    </div>
  );
};

export default SeekerBoard;
