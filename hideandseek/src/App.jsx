import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import SeekerBoard from './components/SeekerBoard';
import JungleScene from './compo/JungleScene';


function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const x = queryParams.get('x');
  const y = queryParams.get('y');
  const sceneImage = '/assets/jungleImage.jpg';

  return (
    <div className="App">
      <h1>Game</h1>
      {x && y ? (
        <SeekerBoard sceneImage={sceneImage} />
      ) : (
        <GameBoard />
      )}
      {/* <JungleScene /> */}
    </div>
  )
}

export default App
