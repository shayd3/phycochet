import { Game } from './game/Game';


// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    const game = new Game('gameCanvas');
    game.start();
    console.log('Game initialized successfully');
  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
});
