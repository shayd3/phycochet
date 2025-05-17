import { Game } from './game/Game';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const game = new Game('gameCanvas');
    game.init();
    console.log('Game initialized successfully');
  } catch (error) {
    console.error('Failed to initialize game:', error);
  }
});
