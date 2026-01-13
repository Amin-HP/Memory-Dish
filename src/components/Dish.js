export const createDish = (data, index) => {
  const dish = document.createElement('article');
  dish.className = 'dish-card';

  dish.innerHTML = `
    <div class="place-setting">
      <div class="chair-top-left"></div>
      <div class="chair-top-right"></div>
      <div class="chair-bottom-left"></div>
      <div class="chair-bottom-right"></div>
      <div class="table-surface"></div>
      <div class="cutlery-set" style="background-image: url('${data.cutlery}');"></div>
      <div class="dish-center">
        <div class="dish-plate" style="background-image: url('${data.image}');"></div>
      </div>
    </div>
    
    <div class="dish-info">
      <div class="dish-info-content">
        <div class="artist-name">${data.artist || 'Unknown Artist'}</div>
        <h3 class="dish-title">${data.title}</h3>
        <div class="dish-medium">${data.medium || 'Mixed Media'}</div>
        <p class="dish-description">${data.description}</p>
      </div>
    </div>
  `;

  return dish;
};
