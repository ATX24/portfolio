// Typing animation for the titles
const titles = ['Dhilan Shah', 'Segui il tuo corso et lascia dir les genti', 'NASA SEES', 'BalkanID', 'Applied Research Labs'];
const titleElement = document.querySelector('h1');
let titleIndex = 0;
let charIndex = 0;
let deleteMode = false;
let timeoutId = null;

function typeTitle() {
  const currentTitle = titles[titleIndex];
  if (deleteMode) {
    titleElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleteMode = false;
      titleIndex++;
      if (titleIndex === titles.length) {
        titleIndex = 0;
      }
    }
  } else {
    titleElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentTitle.length) {
      deleteMode = true;
      timeoutId = setTimeout(typeTitle, 1000);
    }
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(typeTitle, 150);
}

typeTitle();




