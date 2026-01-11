export const createCard = (emoji, isFlipped = false) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (isFlipped) card.classList.add('flipped');

    card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${emoji}</div>
    </div>
  `;

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    return card;
};
