import './style.css'
import './components/card.css'
import { createCard } from './components/Card.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <h1 class="title">Dish Memory</h1>
      <p class="subtitle">A delightful memory experience</p>
    </header>
    <main class="game-board" id="game-board">
      
    </main>
  </div>
`

const gameBoard = document.getElementById('game-board');
const dishes = ['🍕', '🍔', '🍣', '🍝', '🍦', '🍩'];

// Create grid styling dynamically or in CSS (adding to CSS in next step would be better, but inline for now is robust)
gameBoard.style.display = 'grid';
gameBoard.style.gridTemplateColumns = 'repeat(auto-fit, minmax(100px, 1fr))';
gameBoard.style.gap = '1rem';
gameBoard.style.justifyItems = 'center';
gameBoard.style.padding = '2rem 0';

dishes.forEach(dish => {
  gameBoard.appendChild(createCard(dish));
});

