import './style.css'
import { createDish } from './components/Dish.js'

// Mock Data
const exhibitionData = {
  title: "A Dish That Holds a Memory",
  description: "Analogue Making, Generative Tools, Shared Stories.<br><br>Inspired by Tadhg Charles’ upcoming exhibition Ley Lines, this workshop brings analogue and digital narratives into dialogue, guiding each participant to create a personal piece that combines drawing, collage and generative art.",
  dishes: [
    {
      title: "Abstract Geometry",
      artist: "Elena Vost",
      medium: "Beetroot, Potato, Pea Puree",
      description: "A reflection on the order we seek in chaos.",
      image: '/dish1.png',
      cutlery: '/cutlery1.png'
    },
    {
      title: "Ethereal Foam",
      artist: "Marc Henton",
      medium: "Edible Foam, Citrus Spheres",
      description: "Represents the fleeting nature of happy memories.",
      image: '/dish2.png',
      cutlery: '/cutlery2.png'
    },
    {
      title: "Forest Floor",
      artist: "Sarah Chen",
      medium: "Roasted Root Vegetables, Moss",
      description: "A tribute to the grounding power of nature.",
      image: '/dish3.png',
      cutlery: '/cutlery5.png' // Rustic Wood
    },
    {
      title: "Ocean's Depth",
      artist: "Kaito Nakamura",
      medium: "Sea Urchin, Scallop, Spirulina",
      description: "Capturing the deep, mysterious expanse of the subconscious.",
      image: '/dish4.png',
      cutlery: '/cutlery4.png' // Matte Black
    },
    {
      title: "Shattered Sweetness",
      artist: "Isabella Rossi",
      medium: "Sugar Glass, Tropical Fruits",
      description: "The beautiful fragility of dreams.",
      image: '/dish5.png',
      cutlery: '/cutlery3.png' // Gold
    }
  ],
  outro: [
    "Each participant will respond to the shared theme: A dish that holds a memory. A food, flavour, or ingredient connected to a moment, a person, or a place. How does this taste express something about who you are?",
    "As the workshop progresses, completed works will be documented and curated into a shared online gallery. Together, these pieces will form a collective archive of remembered dishes and personal narratives.",
    "By treating technology as a tool for expression and connection, participants are invited to explore personal memory across the physical and virtual world."
  ]
};

const app = document.querySelector('.main-content');

// Render Hero
const heroSection = document.createElement('section');
heroSection.className = 'hero';
heroSection.innerHTML = `
  <h1 class="hero-title">${exhibitionData.title}</h1>
  <p class="hero-description">${exhibitionData.description}</p>
`;
app.appendChild(heroSection);

// Render Gallery (Sticky implementation)
const gallerySpacer = document.createElement('div');
gallerySpacer.className = 'gallery-scroll-spacer';

const stickyViewport = document.createElement('div');
stickyViewport.className = 'gallery-sticky-viewport';

const galleryTrack = document.createElement('div');
galleryTrack.className = 'gallery-track';

// Add Table Start (Left Edge)
const tableStart = document.createElement('div');
tableStart.className = 'table-end-cap';

const headChair = document.createElement('div');
headChair.className = 'chair-head';

const startSurface = document.createElement('div');
startSurface.className = 'table-surface-end';

tableStart.appendChild(headChair);
tableStart.appendChild(startSurface);
galleryTrack.appendChild(tableStart);

// Add dishes to Track
exhibitionData.dishes.forEach((dishData, index) => {
  const dishCard = createDish(dishData, index);
  galleryTrack.appendChild(dishCard);
});

// Add Table End (Right Edge)
const tableEnd = document.createElement('div');
tableEnd.className = 'table-end-cap is-right';

const footChair = document.createElement('div');
footChair.className = 'chair-foot';

const endSurface = document.createElement('div');
endSurface.className = 'table-surface-end';

tableEnd.appendChild(footChair);
tableEnd.appendChild(endSurface);
galleryTrack.appendChild(tableEnd);

stickyViewport.appendChild(galleryTrack);
gallerySpacer.appendChild(stickyViewport);
app.appendChild(gallerySpacer);

// Scroll Animation Logic
let targetScroll = 0;
let currentScroll = 0;
const ease = 0.075; // Lower = smoother/slower catchup

// Mouse Parallax Logic
let mouseTarget = { x: 0, y: 0 };
let mouseCurrent = { x: 0, y: 0 };
const mouseEase = 0.1;

window.addEventListener('mousemove', (e) => {
  // Normalize mouse position -1 to 1 based on window center
  mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
});

function animateScroll() {
  // Simple Linear Interpolation (Lerp)
  currentScroll += (targetScroll - currentScroll) * ease;

  // Lerp Mouse
  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * mouseEase;
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * mouseEase;

  // Apply transform to track
  galleryTrack.style.transform = `translateX(${-currentScroll}px)`;

  // Apply Parallax to Dish Info
  const dishCards = document.querySelectorAll('.dish-card');
  const viewportCenter = window.innerWidth / 2;

  dishCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distFromCenter = cardCenter - viewportCenter;

    // Parallax Offset (Horizontal scroll effect)
    // As card moves left, text moves slightly slower/faster
    const parallaxX = distFromCenter * 0.05;

    // Opacity Logic: Fade out as it leaves center
    // Visible zone: +/- 90% of viewport width (Increased to nearly full screen)
    const fadeDistance = window.innerWidth * 0.9;
    let opacity = 1 - (Math.abs(distFromCenter) / fadeDistance);
    if (opacity < 0) opacity = 0;
    if (opacity > 1) opacity = 1;

    // Find the info content box
    const infoContent = card.querySelector('.dish-info-content');
    if (infoContent) {
      // Rotation: Increased Intensity (12 -> 25)
      // Opacity: Applied calculated value
      infoContent.style.transform = `
        translateX(${parallaxX}px) 
        rotateY(${mouseCurrent.x * 25}deg) 
        rotateX(${-mouseCurrent.y * 25}deg)
      `;
      infoContent.style.opacity = opacity;
    }
  });

  requestAnimationFrame(animateScroll);
}

// Start Animation Loop
requestAnimationFrame(animateScroll);

// Scroll Listener
window.addEventListener('scroll', () => {
  const spacerTop = gallerySpacer.offsetTop;
  const spacerHeight = gallerySpacer.offsetHeight;
  const viewportHeight = window.innerHeight;

  // Distance available to scroll within the spacer to complete the horizontal content
  const scrollDist = spacerHeight - viewportHeight;

  // Current scroll position relative to the spacer
  let scrollTop = window.scrollY - spacerTop;

  // Clamp values
  if (scrollTop < 0) scrollTop = 0;
  if (scrollTop > scrollDist) scrollTop = scrollDist;

  // Calculate horizontal progress (0 to 1)
  const progress = scrollTop / scrollDist;

  // Calculate target horizontal translation
  const trackWidth = galleryTrack.scrollWidth;
  const maxTranslate = trackWidth - window.innerWidth;

  targetScroll = progress * maxTranslate;
});

// Navbar Scroll Effect (Shrink on scroll)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Render Outro
const outroSection = document.createElement('section');
outroSection.className = 'outro';
outroSection.id = 'about';
outroSection.innerHTML = `
  <div class="outro-content">
    ${exhibitionData.outro.map(text => `<p>${text}</p>`).join('')}
  </div>
`;
app.appendChild(outroSection);

